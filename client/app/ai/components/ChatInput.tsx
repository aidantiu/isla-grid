"use client";

import { useEffect, useRef } from "react";
import { Globe, Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
}

const ChatInput = ({
  value,
  onChange,
  onSend,
  isLoading,
  webSearchEnabled,
  onToggleWebSearch,
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-white/10 bg-black/60 px-3 py-4 backdrop-blur-md md:px-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-3xl bg-white/5 p-4">
        <div className="flex items-start gap-3">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about scholarships, application requirements, timelines..."
            className="flex-1 resize-none rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white shadow-inner focus:border-[#FC7019] focus:outline-none"
            rows={1}
            maxLength={1200}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={onSend}
            disabled={isLoading || value.trim().length === 0}
            className={`flex h-12 w-12 items-center justify-center rounded-full text-black transition ${
              isLoading || value.trim().length === 0
                ? "bg-white/30 text-black/40"
                : "bg-[#FC7019] hover:bg-white"
            }`}
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center justify-between text-xs text-white/60">
          <button
            type="button"
            onClick={onToggleWebSearch}
            className={`flex items-center gap-2 rounded-full border px-3 py-1 transition ${
              webSearchEnabled
                ? "border-[#FC7019] bg-[#FC7019]/20 text-[#FC7019]"
                : "border-white/20 hover:border-[#FC7019] hover:text-white"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            Web search {webSearchEnabled ? "enabled" : "disabled"}
          </button>
          <p className="text-right text-[11px] uppercase tracking-[0.2em]">
            Shift + Enter to add a line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
