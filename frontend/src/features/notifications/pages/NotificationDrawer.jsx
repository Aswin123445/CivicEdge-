import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Bell, X } from "lucide-react";
import NotificationItem from "../components/NotificationItem";
import EmptyState from "../components/EmptyState";
import useNotificationList from "../hooks/notificationListHook";
import useNotificationReadQueue from "../hooks/useNotificationReadQueue";

export default function NotificationDrawer({ open, onClose, role }) {
  const containerRef = useRef(null);
  const hasInitialized = useRef(false);
  const {
    notificationList,
    lastItemRef,
    markAsReadLocal,
    resetNotifications,
    markAllAsRead,
  } = useNotificationList(containerRef);
  const { addToQueue, flushQueue } = useNotificationReadQueue();
  const ref = useRef(null);

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      flushQueue();
      onClose();
    }
  };

  useEffect(() => {
    if (open && !hasInitialized.current) {
      resetNotifications();
      hasInitialized.current = true;
    }

    if (!open) {
      hasInitialized.current = false;
    }
  }, [open]);
  const handleClose = () => {
    flushQueue();
    onClose();
  };

  const hasUnread = useMemo(
    () => notificationList.some((n) => n.is_unread),
    [notificationList],
  );

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP - Fixed transparency by using black/40 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* DRAWER PANEL */}
          <motion.div
            ref={ref}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
              fixed right-0 top-0 h-full  z-[101]
              flex flex-col
              bg-gradient-to-b from-[#0a192f] to-[#10234a]
              border-l border-white/10
              shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.5)]
              text-white
            ${role === "admin" ? "bg-gradient-to-b from-[#1e1e1e] to-[#181818]" : ""}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <Bell size={20} />
                </div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Notifications
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {hasUnread && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium px-2 py-1 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/60"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3"
            >
              {notificationList?.length > 0 ? (
                notificationList.map((notif, index) => {
                  const isLast = notificationList.length === index + 1;

                  return (
                    <NotificationItem
                      key={notif.id}
                      notif={notif}
                      index={index}
                      onClose={onClose}
                      containerRef={containerRef}
                      addToQueue={addToQueue}
                      markAsReadLocal={markAsReadLocal}
                      ref={isLast ? lastItemRef : null}
                    />
                  );
                })
              ) : (
                <EmptyState />
              )}
            </div>

  
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("mobile-menu-root"),
  );
}
