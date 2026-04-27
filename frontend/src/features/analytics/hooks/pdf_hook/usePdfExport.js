// src/hooks/usePdfExport.js

import { useState, useCallback } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

/**
 * usePdfExport
 * ------------
 * Fixes:
 *  ✅ Live page layout never breaks — style mutations wrapped in try/finally
 *  ✅ Tall sections auto-split across multiple PDF pages
 *  ✅ Correct pixel ratio so charts aren't blurry or clipped
 *  ✅ Recharts resize wait is per-section, not global
 *  ✅ Section label pushed to next page if it would be orphaned
 */
export default function usePdfExport({
  title = "Analytics Report",
  filename = "report",
  sections = [],
}) {
  const [exporting, setExporting] = useState(false);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // A4 constants (mm)
  const PAGE_W = 210;
  const PAGE_H = 297;
  const MARGIN = 12;
  const USABLE_W = PAGE_W - MARGIN * 2;
  const EXPORT_PX_WIDTH = 1080; // fixed capture width — keeps charts consistent

  const captureNode = async (node) => {
    // Snapshot original inline styles
    const snap = {
      width: node.style.width,
      maxWidth: node.style.maxWidth,
      minWidth: node.style.minWidth,
      overflow: node.style.overflow,
      background: node.style.background,
      boxSizing: node.style.boxSizing,
    };

    try {
      // Force fixed capture width so Recharts renders at full size
      node.style.width = `${EXPORT_PX_WIDTH}px`;
      node.style.maxWidth = `${EXPORT_PX_WIDTH}px`;
      node.style.minWidth = `${EXPORT_PX_WIDTH}px`;
      node.style.overflow = "visible";
      node.style.background = "#1e1e1e";
      node.style.boxSizing = "border-box";

      // Wait for Recharts to respond to the resize
      await wait(450);

      const dataUrl = await toPng(node, {
        cacheBust: true,
        // pixelRatio 1.5 gives sharp output without over-inflating image size
        pixelRatio: 1.5,
        backgroundColor: "#1e1e1e",
        width: EXPORT_PX_WIDTH,
        // Let html-to-image measure the actual rendered height
        height: node.scrollHeight,
        style: {
          // Ensure no scrollbar clips the capture
          overflow: "visible",
        },
      });

      return dataUrl;
    } finally {
      // Always restore — even if toPng throws
      node.style.width = snap.width;
      node.style.maxWidth = snap.maxWidth;
      node.style.minWidth = snap.minWidth;
      node.style.overflow = snap.overflow;
      node.style.background = snap.background;
      node.style.boxSizing = snap.boxSizing;
    }
  };

  /**
   * Adds an image to the PDF, splitting across pages if it's taller
   * than one page. Returns the final yPosition after placing the image.
   */
  const addImageWithPageBreaks = (pdf, dataUrl, imgW, imgH, yStart) => {
    const usablePageH = PAGE_H - MARGIN * 2;

    if (imgH <= usablePageH - yStart + MARGIN) {
      // Fits on current page
      pdf.addImage(dataUrl, "PNG", MARGIN, yStart, imgW, imgH);
      return yStart + imgH;
    }

    // Image is taller than remaining space — slice it across pages
    // We use a canvas to crop slices of the source image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const sourceImg = new Image();
    sourceImg.src = dataUrl;

    // px per mm ratio (image natural px / rendered mm)
    const pxPerMm = sourceImg.naturalWidth / imgW;

    let yMm = yStart;
    let srcYPx = 0;
    let isFirstSlice = true;

    while (srcYPx < sourceImg.naturalHeight) {
      const availableMm = isFirstSlice
        ? PAGE_H - MARGIN - yMm
        : usablePageH;

      const sliceHeightPx = Math.floor(availableMm * pxPerMm);
      const actualSlicePx = Math.min(
        sliceHeightPx,
        sourceImg.naturalHeight - srcYPx
      );

      canvas.width = sourceImg.naturalWidth;
      canvas.height = actualSlicePx;
      ctx.drawImage(
        sourceImg,
        0, srcYPx,
        sourceImg.naturalWidth, actualSlicePx,
        0, 0,
        sourceImg.naturalWidth, actualSlicePx
      );

      const sliceData = canvas.toDataURL("image/png");
      const sliceHeightMm = actualSlicePx / pxPerMm;

      pdf.addImage(sliceData, "PNG", MARGIN, yMm, imgW, sliceHeightMm);

      srcYPx += actualSlicePx;
      yMm += sliceHeightMm;

      if (srcYPx < sourceImg.naturalHeight) {
        pdf.addPage();
        yMm = MARGIN;
        isFirstSlice = false;
      }
    }

    return yMm;
  };

  const exportPdf = useCallback(async () => {
    try {
      setExporting(true);

      const pdf = new jsPDF("p", "mm", "a4");
      let y = MARGIN;

      // ── Header ──────────────────────────────────────────────
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(30, 30, 30);
      pdf.text(title, MARGIN, y);
      y += 8;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, MARGIN, y);
      y += 14;

      // ── Sections ────────────────────────────────────────────
      for (const section of sections) {
        if (!section?.ref?.current) continue;

        const node = section.ref.current;

        // Capture
        const dataUrl = await captureNode(node);

        // Measure rendered image
        await new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.src = dataUrl;
        });

        const tempImg = new Image();
        tempImg.src = dataUrl;
        const naturalW = tempImg.naturalWidth || EXPORT_PX_WIDTH * 1.5;
        const naturalH = tempImg.naturalHeight || 400;

        const imgW = USABLE_W;
        const imgH = (naturalH / naturalW) * imgW;

        // Section label — start new page if label + some content won't fit
        if (section.label) {
          const labelHeight = 10;
          if (y + labelHeight + 30 > PAGE_H - MARGIN) {
            pdf.addPage();
            y = MARGIN;
          }
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(11);
          pdf.setTextColor(50, 50, 50);
          pdf.text(section.label, MARGIN, y);
          y += 7;
        }

        // Place image (with page-break splitting for tall sections)
        y = addImageWithPageBreaks(pdf, dataUrl, imgW, imgH, y);
        y += 10; // gap between sections
      }

      pdf.save(`${filename}_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  }, [title, filename, sections]);

  return { exportPdf, exporting };
}