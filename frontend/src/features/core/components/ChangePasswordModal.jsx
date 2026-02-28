import React, { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2, AlertCircle,ShieldCheck } from "lucide-react";
import useCommon from "../../auth/hooks/useCommon";

const ChangePasswordModal = ({ onClose }) => {
  const { handleChangePassword, isLoading } = useCommon();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  // Django-style Validation Logic
  const validatePassword = (pw) => {
    const minLen = 8;
    const hasDigit = /\d/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pw);

    return {
      length: pw.length >= minLen,
      digit: hasDigit,
      upper: hasUpper,
      special: hasSpecial,
      match:
        formData.newPassword === formData.confirmPassword &&
        formData.confirmPassword !== "",
    };
  };

  const validation = validatePassword(formData.newPassword);
  const isFormValid =
    formData.currentPassword.length > 0 &&
    validation.length &&
    validation.digit &&
    validation.upper &&
    validation.special &&
    validation.match;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Mock API Call

    await handleChangePassword(formData,onClose,setStatus);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Change Password
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in duration-500">
              <div className="relative flex items-center justify-center">
                {/* Outer spinning ring */}
                <div className="w-16 h-16 border-4 border-indigo-100 dark:border-gray-700 border-t-indigo-600 rounded-full animate-spin"></div>
                {/* Inner pulsing icon */}
                <ShieldCheck className="w-6 h-6 text-indigo-600 absolute animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Updating password...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Securing your account, please wait.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  required
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  required
                  type="password"
                  placeholder="Enter new password"
                  className={`w-full px-4 py-2 rounded-lg border ${formData.newPassword && !validation.length ? "border-red-500" : "border-gray-300 dark:border-gray-600"} dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none`}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                />
                <div className="mt-2 space-y-1">
                  <p
                    className={`text-xs flex items-center gap-1 ${validation.length ? "text-green-600" : "text-gray-500"}`}
                  >
                    {validation.length ? "✓" : "•"} Must be at least 8
                    characters
                  </p>
                  <p
                    className={`text-xs flex items-center gap-1 ${validation.upper ? "text-green-600" : "text-gray-500"}`}
                  >
                    {validation.upper ? "✓" : "•"} Include an uppercase letter
                  </p>
                  <p
                    className={`text-xs flex items-center gap-1 ${validation.special ? "text-green-600" : "text-gray-500"}`}
                  >
                    {validation.special ? "✓" : "•"} Include a special character
                  </p>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  required
                  type="password"
                  placeholder="Re-enter new password"
                  className={`w-full px-4 py-2 rounded-lg border ${formData.confirmPassword && !validation.match ? "border-red-500" : "border-gray-300 dark:border-gray-600"} dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none`}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {formData.confirmPassword && !validation.match && (
                  <p className="text-red-500 text-xs mt-1">
                    New passwords do not match
                  </p>
                )}
              </div>

              {/* Error Alert */}
              {status === "error" && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={!isFormValid || status === "loading"}
                  className="flex-1 px-4 py-2 bg-indigo-600 disabled:bg-gray-400 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  {status === "loading" && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  Update Password
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
