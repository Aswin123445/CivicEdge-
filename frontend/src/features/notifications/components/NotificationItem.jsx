import React, { forwardRef, memo } from "react";
import { motion } from "framer-motion";
import { formatDate } from "../../../utils/datenormalize";
import { useNavigate } from "react-router-dom";
import { useMarkAsReadOnView } from "../hooks/useMarkAsReadOnView";

const NotificationItem = forwardRef((props, ref) => {
  const {
    notif = {},
    index = 0,
    onClick,
    onClose,
    containerRef,
    addToQueue,
    markAsReadLocal,
  } = props;
  const navigate = useNavigate();

  const {
    id = "",
    title = "No title",
    message = "",
    created_at = "",
    is_unread = false,
    redirect_url = null,
  } = notif || {};

  const date = formatDate(created_at);

  const itemRef = useMarkAsReadOnView({
    id,
    isUnread: is_unread,
    addToQueue,
    markAsReadLocal,
    containerRef,
  });

  // 🔥 Combine pagination ref + visibility ref safely
  const combinedRef = (node) => {
    if (itemRef?.current !== undefined) {
      itemRef.current = node;
    }

    if (ref) {
      ref(node);
    }
  };

  return (
    <motion.div
      ref={combinedRef}
      key={id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => {
        if (onClick) onClick(notif);
      }}
      className={`
        relative p-4 rounded-2xl cursor-pointer transition-all duration-200
        ${
          is_unread
            ? "bg-blue-500/10 border border-blue-400/20"
            : "bg-white/5 border border-transparent hover:bg-white/10"
        }
      `}
    >
      <div
        onClick={(e) => {
          e.stopPropagation(); 

          if (redirect_url) {
            navigate(redirect_url);
            onClose();
          }
        }}
        className="flex justify-between items-start gap-2"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {is_unread && (
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            )}

            <h4
              className={`text-sm truncate ${
                is_unread ? "font-bold text-white" : "text-white/80"
              }`}
            >
              {title}
            </h4>
          </div>

          {message && (
            <p className="text-xs text-white/60 mt-1 line-clamp-2">
              {message}
            </p>
          )}

          {created_at && (
            <span className="text-[10px] text-white/40 mt-2 block">
              {date}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default memo(NotificationItem);