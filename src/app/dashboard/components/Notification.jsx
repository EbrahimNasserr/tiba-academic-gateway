"use client";

import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Notification({ notification, setNotification }) {
  if (!notification) return null;

  return (
    <div
      className={`fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg ${
        notification.type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {notification.type === "success" ? (
        <CheckCircle2 className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      {notification.message}
      <button
        onClick={() => setNotification(null)}
        className="ml-2 hover:opacity-80"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
