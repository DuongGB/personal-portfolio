import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import {
  Bot,
  Brain,
  ChevronDown,
  CornerDownLeft,
  Loader2,
  Sparkles,
  X,
  AlertTriangle,
  HelpCircle,
  Code2,
  Briefcase,
  Mail,
  Compass,
} from "lucide-react";
import { sendMessage, demoResponse, type ChatMessage } from "@/services/geminiService";

// ── Quick-action suggestion chips with Lucide icons ───────────────────────────
interface Suggestion {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SUGGESTIONS_EN: Suggestion[] = [
  { text: "Tell me about your projects", icon: Compass },
  { text: "What are Duong's AI skills?", icon: Brain },
  { text: "Show me backend tech stack", icon: Code2 },
  { text: "Duong's work experience", icon: Briefcase },
  { text: "How to contact Duong?", icon: Mail },
];

const SUGGESTIONS_VI: Suggestion[] = [
  { text: "Các dự án nổi bật của Dương", icon: Compass },
  { text: "Kỹ năng AI của Dương là gì?", icon: Brain },
  { text: "Dương thành thạo backend stack nào?", icon: Code2 },
  { text: "Kinh nghiệm làm việc của Dương", icon: Briefcase },
  { text: "Làm sao để liên hệ với Dương?", icon: Mail },
];

// ── Typing indicator (Isolated Micro-Component for Performance) ───────────────
const TypingIndicator = React.memo(() => {
  return (
    <div className="flex items-end gap-2">
      <div className="rounded-2xl rounded-bl-sm border border-zinc-200/50 bg-zinc-100/50 px-4 py-3 dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-1.2">
          <span className="ai-dot h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400" style={{ animationDelay: "0ms" }} />
          <span className="ai-dot h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400" style={{ animationDelay: "160ms" }} />
          <span className="ai-dot h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400" style={{ animationDelay: "320ms" }} />
        </div>
      </div>
    </div>
  );
});
TypingIndicator.displayName = "TypingIndicator";

// ── Simple markdown-to-JSX renderer ───────────────────────────────────────────
function parseMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];
  const lines = text.split("\n");

  return lines.flatMap((line, lineIdx) => {
    const elements: React.ReactNode[] = [];
    let isBullet = false;
    let cleanLine = line;

    if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
      isBullet = true;
      cleanLine = line.trim().substring(2);
    } else {
      const numMatch = line.trim().match(/^(\d+\.\s)(.*)/);
      if (numMatch) {
        isBullet = true;
        cleanLine = numMatch[1] + numMatch[2];
      }
    }

    const parts = cleanLine.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    const parsedParts = parts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={`${lineIdx}-${partIdx}`} className="font-extrabold text-zinc-950 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={`${lineIdx}-${partIdx}`} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }

      const words = part.split(/(\s+)/);
      return words.map((word, wordIdx) => {
        if (word.startsWith("http://") || word.startsWith("https://")) {
          return (
            <a
              key={`${lineIdx}-${partIdx}-${wordIdx}`}
              href={word.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-teal-700 underline underline-offset-2 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
            >
              {word.trim()}
            </a>
          );
        }
        return word;
      });
    });

    if (isBullet) {
      elements.push(
        <div key={`bullet-${lineIdx}`} className="flex gap-2 pl-1.5 my-1 text-left w-full items-start break-words overflow-hidden">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" />
          <div className="flex-1 text-[13.5px] leading-[1.6] text-zinc-800 dark:text-zinc-200 break-words whitespace-pre-wrap">{parsedParts}</div>
        </div>
      );
    } else {
      if (line.trim() === "") {
        elements.push(<div key={`empty-${lineIdx}`} className="h-2" />);
      } else {
        elements.push(
          <div key={`line-${lineIdx}`} className="text-left w-full min-h-[20px] text-[13.5px] leading-[1.6] text-zinc-800 dark:text-zinc-200 break-words whitespace-pre-wrap">
            {parsedParts}
          </div>
        );
      }
    }

    return elements;
  });
}

// ── Message bubble (No-avatar minimalist modern design) ───────────────────────────
const MessageBubble = React.memo(({ msg }: { msg: ChatMessage }) => {
  const isUser = msg.role === "user";
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm break-words overflow-hidden ${
          isUser
            ? "rounded-tr-sm bg-teal-700 text-white font-medium dark:bg-teal-600"
            : "rounded-tl-sm border border-zinc-200/80 bg-zinc-100/90 text-zinc-850 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:text-zinc-200"
        }`}
      >
        {isUser ? msg.text : parseMarkdown(msg.text)}
      </div>
    </div>
  );
});
MessageBubble.displayName = "MessageBubble";

// ── Main AiChat Widget ─────────────────────────────────────────────────────────
export default function AiChat() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);
  const [hasApiKey] = useState<boolean>(
    Boolean(import.meta.env.VITE_GEMINI_API_KEY)
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = currentLang === "vi" ? SUGGESTIONS_VI : SUGGESTIONS_EN;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Initial greeting (Anti-Emoji)
  useEffect(() => {
    if (isOpen && history.length === 0) {
      const welcomeText = currentLang === "vi"
        ? (hasApiKey
            ? "Xin chào. Tôi là trợ lý AI của Dương, hoạt động bằng Gemini. Bạn có thể hỏi tôi về các dự án, kỹ năng hoặc kinh nghiệm làm việc của cậu ấy."
            : "Xin chào. Tôi là trợ lý AI của Dương ở chế độ demo. Hãy cấu hình VITE_GEMINI_API_KEY để kích hoạt AI trực tuyến. Hiện tại tôi có thể trả lời các thông tin cơ bản về dự án, kỹ năng và kinh nghiệm của Dương.")
        : (hasApiKey
            ? "Hello. I am Duong's AI assistant, powered by Gemini. Ask me anything about his projects, skills, or experience."
            : "Hello. I am Duong's AI assistant running in demo mode. Set VITE_GEMINI_API_KEY for full online AI responses. I can still tell you about Duong's projects, skills, and experience.");

      setHistory([
        {
          role: "model",
          text: welcomeText,
        },
      ]);
    }
  }, [isOpen, history.length, hasApiKey, currentLang]);

  // Reset chat if language changes
  useEffect(() => {
    setHistory([]);
  }, [currentLang]);

  const handleSend = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setInput("");
      setError(null);

      const userMsg: ChatMessage = { role: "user", text: trimmed };
      setHistory((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const reply = await sendMessage(history, trimmed, currentLang);
        setHistory((prev) => [...prev, { role: "model", text: reply }]);
      } catch (err) {
        const rawMsg = err instanceof Error ? err.message : "Something went wrong.";
        const isQuotaExceeded = /quota|rate-limit|limit|exhausted|429/i.test(rawMsg);

        if (isQuotaExceeded) {
          const friendlyMsg = currentLang === "vi"
            ? "Lượt gọi AI miễn phí hiện đã đạt giới hạn trong phút này. Hệ thống tự động chuyển sang chế độ Demo phản hồi nhanh."
            : "The AI service free quota has been exceeded for this minute. Temporarily switching to fast Demo response mode.";
          
          setError(
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-500" strokeWidth={2} />
              <span>{friendlyMsg}</span>
            </span>
          );
          const demoReply = demoResponse(trimmed, currentLang);
          setHistory((prev) => [
            ...prev,
            {
              role: "model",
              text: demoReply,
            },
          ]);
        } else {
          const friendlyMsg = currentLang === "vi"
            ? `Đã xảy ra lỗi kết nối: ${rawMsg}. Vui lòng thử lại.`
            : `Connection error occurred: ${rawMsg}. Please try again.`;

          setError(
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-500" strokeWidth={2} />
              <span>{friendlyMsg}</span>
            </span>
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [history, isLoading, currentLang],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend(input);
    }
  };

  const widget = (
    <>
      {/* ── Chat Panel (Liquid Glass Refraction) ── */}
      {isOpen && (
        <div
          className="ai-chat-panel fixed bottom-6 right-6 z-[200] flex w-[90vw] max-w-[390px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/80 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] ring-1 ring-black/5 backdrop-blur-2xl transition-all duration-300 dark:border-zinc-800/40 dark:bg-zinc-950/80 dark:ring-white/5"
          style={{ height: "min(600px, 82dvh)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200/40 bg-zinc-50/40 px-5 py-4 dark:border-zinc-800/40 dark:bg-zinc-900/40">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-sm">
                <Brain className="h-4.5 w-4.5" strokeWidth={1.8} />
                <span className="absolute -right-0.5 -bottom-0.5 flex h-2 w-2">
                  <span className="ai-status-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              </div>
              <div>
                <p className="text-[13.5px] font-bold text-zinc-900 dark:text-white">
                  {currentLang === "vi" ? "Trợ lý AI" : "AI Assistant"}
                </p>
                <p className="text-[10.5px] font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                  {hasApiKey
                    ? (currentLang === "vi" ? "Gemini Trực Tuyến" : "Gemini Online")
                    : (currentLang === "vi" ? "Chế Độ Ngoại Tuyến" : "Offline Mode")}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-200/50 hover:text-zinc-850 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-250"
            >
              <ChevronDown className="h-4.5 w-4.5" strokeWidth={1.8} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 space-y-4 flex flex-col">
            {history.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions (Horizontal Scroll - Modern App Layout) */}
          {!isLoading && history.length > 0 && (
            <div className="border-t border-zinc-200/30 px-4 py-3 dark:border-zinc-800/30">
              <div className="flex items-center gap-1.5 mb-2 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                <HelpCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
                <span>{currentLang === "vi" ? "Gợi ý câu hỏi" : "Suggested questions"}</span>
              </div>
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                {suggestions.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => void handleSend(chip.text)}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200/60 bg-white/50 px-3 py-1.8 text-xs font-semibold text-zinc-700 transition hover:border-teal-700/40 hover:bg-teal-700/5 hover:text-teal-700 dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-teal-400/40 dark:hover:text-teal-400"
                  >
                    <chip.icon className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" strokeWidth={1.8} />
                    <span>{chip.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-zinc-200/40 p-4 dark:border-zinc-800/40">
            {error && (
              <div className="mb-2 rounded-xl bg-zinc-100/50 p-3 text-[11.5px] font-semibold text-zinc-600 dark:bg-zinc-900/50 dark:text-zinc-400">
                {error}
              </div>
            )}
            <div className="flex items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-2 focus-within:border-teal-700/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-700/5 dark:border-zinc-800/60 dark:bg-zinc-950/40 dark:focus-within:border-teal-400/40 dark:focus-within:bg-zinc-950">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={currentLang === "vi" ? "Hỏi về dự án, kỹ năng của Dương..." : "Ask about Duong's projects, skills..."}
                rows={1}
                disabled={isLoading}
                className="max-h-24 flex-1 resize-none bg-transparent px-2 py-1.5 text-[13px] font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none disabled:opacity-50 dark:text-white dark:placeholder:text-zinc-600"
                style={{ fieldSizing: "content" } as React.CSSProperties}
              />
              <button
                onClick={() => void handleSend(input)}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white transition-all hover:bg-teal-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white dark:text-zinc-900 dark:hover:bg-teal-500"
              >
                {isLoading ? (
                  <Loader2 className="h-4.5 w-4.5 animate-spin" strokeWidth={1.8} />
                ) : (
                  <CornerDownLeft className="h-4.5 w-4.5" strokeWidth={1.8} />
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-600">
              {currentLang === "vi" ? "Nhấn Enter để gửi · Shift+Enter để xuống dòng" : "Press Enter to send · Shift+Enter for new line"}
            </p>
          </div>
        </div>
      )}

      {/* ── Floating Trigger Button (Double-Bezel Luxury Design) ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI chat assistant"
        className={`fixed bottom-6 right-6 z-[200] flex h-14 w-14 items-center justify-center p-1 rounded-2xl bg-zinc-200/30 border border-white/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:bg-zinc-200/50 dark:bg-zinc-800/30 dark:border-zinc-700/20 ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-inner">
          <Bot className="h-6 w-6" strokeWidth={1.8} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center">
            <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
          </span>
        </div>
      </button>
    </>
  );

  return typeof document !== "undefined"
    ? createPortal(widget, document.body)
    : null;
}
