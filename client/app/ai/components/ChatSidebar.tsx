"use client";

import { type ConversationPreview } from "./types";
import { Plus, Trash2 } from "lucide-react";

interface ChatSidebarProps {
  conversations: ConversationPreview[];
  currentConversationId: string;
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: () => void;
  onDeleteConversation: (conversationId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ChatSidebar = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
  isOpen,
  onClose,
}: ChatSidebarProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-72 bg-[#0E0E0E] border-r border-white/10 transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <p className="text-xs font-medium uppercase text-white/60 tracking-[0.2em]">
              IslaGrid
            </p>
            <h2 className="text-lg font-semibold text-white">IslaBot AI</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-white/50 hover:text-white"
            aria-label="Close sidebar"
          >
            X
          </button>
        </div>

        <div className="px-5 py-4">
          <button
            type="button"
            onClick={onCreateConversation}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FC7019] px-3 py-2 text-sm font-semibold text-black transition hover:bg-white"
          >
            <Plus className="h-4 w-4" />
            New Conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <ul className="space-y-2">
            {conversations.map((conversation) => {
              const isActive = conversation.id === currentConversationId;

              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => onSelectConversation(conversation.id)}
                    className={`group flex w-full items-start justify-between rounded-xl px-4 py-3 text-left transition ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {conversation.title}
                        </span>
                        {conversation.pinned && (
                          <span className="rounded-full bg-[#FC7019]/20 px-2 text-[10px] font-semibold uppercase tracking-wide text-[#FC7019]">
                            Pinned
                          </span>
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs opacity-70">
                        {conversation.lastMessage}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-wider text-white/50">
                        {conversation.updatedAt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteConversation(conversation.id);
                      }}
                      className={`rounded-full p-1 text-white/40 transition hover:text-[#FC7019] ${
                        isActive ? "hover:bg-black/10" : "hover:bg-black/30"
                      }`}
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
