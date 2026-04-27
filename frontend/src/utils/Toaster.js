import { Toaster, toast } from "sonner";

/**
 * Show a customizable toast notification
 */
export function showToast({
  title,
  description,
  icon,
  className,
  duration = 4000,
}) {
  toast(title, {
    description,
    icon,
    duration,
    unstyled: true,
    classNames: {
      toast: className,                 //  background & border
      title: "text-white font-semibold",
      description: "text-white/90",
    },
  });
}

export function successToast(options) {
  showToast({
    ...options,
    className: "toast-success",
  });
}

export function errorToast(options) {
  showToast({
    ...options,
    className: "toast-error",
  });
}

export function infoToast(options) {
  showToast({
    ...options,
    className: "toast-info",
  });
}
