"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ContactMessage } from "@/types/database";

export default function MessagesList({
  messages: initialMessages,
}: {
  messages: ContactMessage[];
}) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [filter, setFilter] = useState<"all" | "unread" | "urgent">("all");

  const filteredMessages = messages.filter((msg) => {
    if (filter === "unread") return !msg.is_read;
    if (filter === "urgent") return msg.priority === "urgent";
    return true;
  });

  const markAsRead = async (id: string) => {
    const supabase = createClient();

    const { error } = await (supabase as any)
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", id);

    if (!error) {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg))
      );
      router.refresh();
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const supabase = createClient();

    const { error } = await (supabase as any)
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (!error) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      router.refresh();
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`border-2 px-4 py-2 text-sm font-bold transition-all ${
            filter === "all"
              ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
              : "border-border-retro bg-panel-retro text-primary hover:bg-primary hover:text-panel-retro"
          }`}
        >
          ALL ({messages.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`border-2 px-4 py-2 text-sm font-bold transition-all ${
            filter === "unread"
              ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
              : "border-border-retro bg-panel-retro text-primary hover:bg-primary hover:text-panel-retro"
          }`}
        >
          UNREAD ({messages.filter((m) => !m.is_read).length})
        </button>
        <button
          onClick={() => setFilter("urgent")}
          className={`border-2 px-4 py-2 text-sm font-bold transition-all ${
            filter === "urgent"
              ? "border-border-retro bg-primary text-panel-retro shadow-retro-btn"
              : "border-border-retro bg-panel-retro text-primary hover:bg-primary hover:text-panel-retro"
          }`}
        >
          URGENT ({messages.filter((m) => m.priority === "urgent").length})
        </button>
      </div>

      {/* Messages */}
      {filteredMessages.length === 0 ? (
        <div className="border-2 border-border-retro bg-panel-retro p-12 text-center shadow-retro">
          <span className="material-symbols-outlined text-6xl text-text-muted mb-4">
            inbox
          </span>
          <p className="text-text-muted">No messages found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`border-2 border-border-retro p-6 shadow-retro ${
                message.is_read ? "bg-panel-retro" : "bg-accent-yellow/10"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-bold text-text-main">
                      {message.name}
                    </h3>
                    {!message.is_read && (
                      <span className="text-xs font-bold text-accent-yellow border border-border-retro px-2 py-1">
                        NEW
                      </span>
                    )}
                    {message.priority === "urgent" && (
                      <span className="text-xs font-bold text-white bg-accent-red px-2 py-1">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted">{message.email}</p>
                  {message.phone && (
                    <p className="text-sm text-text-muted">{message.phone}</p>
                  )}
                  {message.company && (
                    <p className="text-sm text-text-muted">{message.company}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {!message.is_read && (
                    <button
                      onClick={() => markAsRead(message.id)}
                      className="flex items-center space-x-1 border-2 border-border-retro bg-accent-green px-3 py-2 text-white text-xs font-bold hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                    >
                      <span className="material-symbols-outlined text-sm">
                        done
                      </span>
                      <span>MARK READ</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="flex items-center space-x-1 border-2 border-border-retro bg-accent-red px-3 py-2 text-white text-xs font-bold hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                  >
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                    <span>DELETE</span>
                  </button>
                </div>
              </div>

              {message.subject && (
                <div className="mb-3">
                  <p className="text-sm font-bold text-primary">
                    Subject: {message.subject}
                  </p>
                </div>
              )}

              <div className="border-l-4 border-primary bg-bg-retro p-4 mb-3">
                <p className="text-text-main whitespace-pre-line">
                  {message.message}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center space-x-4">
                  <span>
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                  <span>Source: {message.source}</span>
                </div>
                {message.ip_address && <span>IP: {message.ip_address}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
