import { useEffect,useState,useRef } from "react";
import { formatCoords } from "../utils";

export default function useLocationUiHook(onSelect) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [dropdownStyle, setDropdownStyle] = useState(null);

  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
    const DEBOUNCE_DELAY = 500;
    useEffect(() => {
        if (query.trim().length < 3) {
          setResults([]);
          setShowResults(false);
          return;
        }
    
        const controller = new AbortController();
    
        const timer = setTimeout(async () => {
          try {
            const res = await fetch(
              `https://geocode.maps.co/search?q=${encodeURIComponent(
                query
              )}&api_key=699f0b311c5c5188966023jog0f1c54`,
              { signal: controller.signal }
            );
    
            if (!res.ok) {
              throw new Error(`Geocoding failed with status ${res.status}`);
            }
    
            const raw = await res.json();
            const data = Array.isArray(raw) ? raw : [];
    
            const normalized = data.slice(0, 5).map((item) => {
              const fullName = item.display_name ?? "";
              const shortName =
                item.name || fullName.split(",")[0] || "Unknown place";
    
              return {
                id: item.place_id,
                name: shortName.trim(),
                full_name: fullName,
                address: fullName,
                lat: Number(item.lat),
                lng: Number(item.lon),
                bbox: item.boundingbox?.map(Number),
                type: item.type,
                category: item.class,
              };
            });
    
            if (normalized.length === 0 || !inputRef.current) {
              setShowResults(false);
              return;
            }
    
            setResults(normalized);
            setShowResults(true);
    
            /* ✅ IMPORTANT: dropdown positioning */
            const rect = inputRef.current.getBoundingClientRect();
    
            const maxWidth = Math.min(rect.width, window.innerWidth - 24);
            const left = Math.max(
              12,
              rect.left + rect.width / 2 - maxWidth / 2
            );
    
            setDropdownStyle({
              top: rect.bottom + 6,
              left,
              width: maxWidth,
            });
          } catch (err) {
            if (err.name !== "AbortError") {
              console.error("Geocoding error:", err.message);
              setShowResults(false);
            }
          }
        }, DEBOUNCE_DELAY);
    
        return () => {
          clearTimeout(timer);
          controller.abort();
        };
      }, [query]);

  useEffect(() => {
    if (!showResults) return;

    const handleScroll = () => setShowResults(false);
    window.addEventListener("scroll", handleScroll, { once: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showResults]);

  useEffect(() => {
    const handleResize = () => setShowResults(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const handleSelect = (item) => {
    onSelect({ lat: formatCoords(item.lat), lng: formatCoords(item.lng),landmark:item?.full_name }); 
    setQuery(item.name);
    setShowResults(false);
  };
    return {
        DEBOUNCE_DELAY,
        results,
        query,
        setQuery,
        showResults,
        setShowResults,
        inputRef,
        containerRef,
        dropdownStyle,
        handleSelect
    };
}