"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import ChatSidebar from "./components/ChatSidebar";
import ChatHeader from "./components/ChatHeader";
import ChatMessageList from "./components/ChatMessageList";
import ChatInput from "./components/ChatInput";
import type { ChatMessage, ConversationPreview } from "./components/types";

const DEFAULT_ASSISTANT_MESSAGE: ChatMessage = {
  id: "assistant-welcome",
  role: "assistant",
  content:
    "Hello! I am IslaBot, your guide to the IslaGrid Meralco Community Energy Ecosystem. Ask me how your barangay can generate, distribute, and benefit from community-owned renewable power.",
};

const SUGGESTED_PROMPTS = [
  "Summarize how IslaGrid expands the net-metering program for communities.",
  "What data do we need to generate a proposal for a river-based micro hydro plant?",
  "Explain how revenue distribution works with NFC profit cards.",
  "Outline the AI-Driven Energy Design Studio workflow from input to output.",
];

type ConversationState = Record<string, ChatMessage[]>;

const AiPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState("welcome");
  const [conversations, setConversations] = useState<ConversationPreview[]>([
    {
      id: "welcome",
      title: "Fresh Chat",
      lastMessage: "Ask IslaBot how IslaGrid powers communities.",
      updatedAt: "Just now",
      pinned: true,
    },
  ]);
  const [messagesByConversation, setMessagesByConversation] =
    useState<ConversationState>({
      welcome: [DEFAULT_ASSISTANT_MESSAGE],
    });

  const currentMessages = useMemo(() => {
    return messagesByConversation[currentConversationId] ?? [];
  }, [messagesByConversation, currentConversationId]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateConversationPreview = (
    conversationId: string,
    lastMessage: string
  ) => {
    setConversations((previous) => {
      const existing = previous.find(
        (conversation) => conversation.id === conversationId
      );
      const updatedConversation: ConversationPreview = existing
        ? {
            ...existing,
            lastMessage,
            updatedAt: "Just now",
          }
        : {
            id: conversationId,
            title: "New Conversation",
            lastMessage,
            updatedAt: "Just now",
          };

      const withoutCurrent = previous.filter(
        (conversation) => conversation.id !== conversationId
      );
      return [updatedConversation, ...withoutCurrent];
    });
  };

  const handleSelectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleCreateConversation = () => {
    const newId = `conversation-${Date.now()}`;
    const newPreview: ConversationPreview = {
      id: newId,
      title: "Untitled Chat",
      lastMessage: "Start planning your community energy project.",
      updatedAt: "Just now",
    };

    setConversations((previous) => [newPreview, ...previous]);
    setMessagesByConversation((previous) => ({
      ...previous,
      [newId]: [DEFAULT_ASSISTANT_MESSAGE],
    }));
    setCurrentConversationId(newId);
    setMessageInput("");
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleDeleteConversation = (conversationId: string) => {
    const remainingPreviews = conversations.filter(
      (conversation) => conversation.id !== conversationId
    );

    const fallbackConversations =
      remainingPreviews.length > 0
        ? remainingPreviews
        : [
            {
              id: "welcome",
              title: "Fresh Chat",
              lastMessage: "Ask IslaBot how IslaGrid powers communities.",
              updatedAt: "Just now",
              pinned: true,
            },
          ];

    setConversations(fallbackConversations);

    setMessagesByConversation((previous) => {
      const { [conversationId]: _removed, ...rest } = previous;
      let newMessagesByConversation;
      if (Object.keys(rest).length > 0) {
        newMessagesByConversation = rest;
      } else {
        newMessagesByConversation = {
          welcome: [DEFAULT_ASSISTANT_MESSAGE],
        };
      }

      // If the deleted conversation was the current one, set a valid fallback ID
      if (conversationId === currentConversationId) {
        // Find the first fallbackConversations ID that exists in newMessagesByConversation
        const fallbackId =
          fallbackConversations.find((conv) =>
            newMessagesByConversation.hasOwnProperty(conv.id)
          )?.id ??
          Object.keys(newMessagesByConversation)[0] ??
          "welcome";
        setCurrentConversationId(fallbackId);
        setIsLoading(false);
      }

      return newMessagesByConversation;
    });
  };

  // const simulateAssistantReply = (
  //   prompt: string,
  //   useSearch: boolean
  // ): ChatMessage => {
  //   const trimmed = prompt.trim();
  //   const topic = trimmed.length > 0 ? trimmed : "your request";
  //   const snippet = topic.length > 80 ? `${topic.slice(0, 77)}...` : topic;

  //   return {
  //     id: `assistant-${Date.now()}`,
  //     role: "assistant",
  //     usedSearch: useSearch,
  //     content: `Here is what I can share about "${snippet}":\n\n1. Generation — assess solar, hydro, wind, or hybrid potential using the AI-Driven Energy Design Studio.\n2. Distribution — connect community-owned assets to Meralco's grid with smart metering for transparent exports.\n3. Benefit Sharing — route revenues into NFC profit cards so residents experience direct economic uplift.\n\nProvide location, resource data, demand profile, and community stakeholders if you want me to draft a tailored IslaGrid rollout.`,
  //   };
  // };

  const sendPromptToBackend = async (prompt: string): Promise<ChatMessage> => {
    try {
      const userId = "test_user_1";
      const response = await fetch(`/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, prompt }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Chat request failed");
      }

      const data = await response.json();
      const output = data.output;

      // Try to format nicely
      const formattedContent = output.recommendations
        ? `
Here’s your personalized analysis:
      
**Recommendations**
${output.recommendations.map((r: string) => `• ${r}`).join("\n")}

**Best Fit Energy Type:** ${output.bestFitEnergyType}
**Estimated Savings:** ${output.estimatedSavings}
`
        : output.rawText || "No structured response received.";

      return {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: formattedContent,
      };
    } catch (error: any) {
      console.error("Chat request error:", error);
      return {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content:
          " Sorry! Something went wrong while fetching data from the energy consultant service.",
      };
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim().length === 0 || isLoading) {
      return;
    }

    const conversationId = currentConversationId;
    const userMessage: ChatMessage = {
      // REAL ID PLACEHOLDER
      id: "test_user_1",
      role: "user",
      content: messageInput.trim(),
    };

    setMessagesByConversation((previous) => ({
      ...previous,
      [conversationId]: [...(previous[conversationId] ?? []), userMessage],
    }));

    updateConversationPreview(conversationId, messageInput.trim());
    setMessageInput("");
    setIsLoading(true);

    try {
      // 👇 Call your real backend (Gemini-powered)
      const assistantMessage = await sendPromptToBackend(userMessage.content);

      setMessagesByConversation((previous) => ({
        ...previous,
        [conversationId]: [
          ...(previous[conversationId] ?? []),
          assistantMessage,
        ],
      }));

      updateConversationPreview(conversationId, assistantMessage.content);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionPick = (suggestion: string) => {
    setMessageInput(suggestion);
  };

  const handleResetConversation = () => {
    setMessagesByConversation((previous) => ({
      ...previous,
      [currentConversationId]: [DEFAULT_ASSISTANT_MESSAGE],
    }));
    updateConversationPreview(
      currentConversationId,
      "Ask IslaBot how IslaGrid powers communities."
    );
    setMessageInput("");
    setIsLoading(false);
  };

  return (
    <div className="relative flex h-screen bg-linear-to-br from-white via-[#FFF5EB] to-white text-gray-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onCreateConversation={handleCreateConversation}
        onDeleteConversation={handleDeleteConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">
        <ChatHeader
          title="IslaBot AI"
          subtitle="Community Energy Navigation"
          onToggleSidebar={() => setSidebarOpen((previous) => !previous)}
          actions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetConversation}
                className="flex items-center gap-2 rounded-full border border-[#F2D8C3] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600 transition hover:border-[#FC7019] hover:text-[#FC7019]"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <div className="hidden items-center gap-2 rounded-full border border-[#FC7019]/30 bg-[#FFF5EB] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#FC7019] md:flex">
                <Sparkles className="h-3.5 w-3.5" /> IslaGrid Trusted
              </div>
            </div>
          }
        />

        <ChatMessageList
          messages={currentMessages}
          isLoading={isLoading}
          suggestions={SUGGESTED_PROMPTS}
          onSuggestionPick={handleSuggestionPick}
          onCopyMessage={(messageId) => {
            const message = currentMessages.find(
              (item) => item.id === messageId
            );
            if (message) {
              window.navigator.clipboard
                .writeText(message.content)
                .catch(() => {});
            }
          }}
          webSearchEnabled={webSearchEnabled}
        />

        <ChatInput
          value={messageInput}
          onChange={setMessageInput}
          onSend={handleSendMessage}
          isLoading={isLoading}
          webSearchEnabled={webSearchEnabled}
          onToggleWebSearch={() => setWebSearchEnabled((previous) => !previous)}
        />
      </div>
    </div>
  );
};

export default AiPage;
