import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircleQuestion, Send, Square, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";

const suggestions = [
  "What projects has he built?",
  "What's his work experience?",
  "How can I hire him for a project?",
  "Which frameworks does he use?",
];

// Opens the chat from anywhere on the page, optionally with a pre-loaded question.
export function openPortfolioChat(question?: string) {
  window.dispatchEvent(new CustomEvent<string | undefined>("portfolio-chat:open", { detail: question }));
}

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop } = useChat({
    transport,
    onError: (e) => {
      const m = e.message || "";
      if (m.includes("429")) toast.error("Too many questions right now — try again in a moment.");
      else if (m.includes("402")) toast.error("The assistant is out of credits for now.");
      else toast.error("Couldn't reach the assistant. Please try again.");
    },
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, status]);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, status]);
  useEffect(() => {
    const handler = (e: Event) => {
      const q = (e as CustomEvent<string | undefined>).detail;
      setOpen(true);
      if (q && !busy) sendMessage({ text: q });
    };
    window.addEventListener("portfolio-chat:open", handler);
    return () => window.removeEventListener("portfolio-chat:open", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendMessage]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Ask about my work"}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="size-5" /> : <MessageCircleQuestion className="size-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask about my work"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-20 right-3 z-50 flex h-[min(560px,75svh)] w-[min(400px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-lime-soft">
                <Bot className="size-5 text-highlight" />
              </span>
              <div>
                <p className="font-display font-semibold">Ask {profile.name}'s assistant</p>
                <p className="text-xs text-muted-foreground">Answers from this portfolio</p>
              </div>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Ask anything about my projects or skills.</p>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-xl border border-border px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m) => {
                const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
                return m.role === "user" ? (
                  <div key={m.id} className="ml-auto w-fit max-w-[85%] rounded-2xl bg-primary px-3 py-2 text-sm text-primary-foreground">
                    {text}
                  </div>
                ) : (
                  <div key={m.id} className="prose prose-sm max-w-none text-sm text-foreground dark:prose-invert [&_p]:my-1.5 [&_ul]:my-1.5">
                    <ReactMarkdown>{text}</ReactMarkdown>
                  </div>
                );
              })}
              {status === "submitted" && (
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2 border-t border-border p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Ask a question…"
                className="max-h-28 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {busy ? (
                <button type="button" onClick={() => stop()} aria-label="Stop" className="grid size-10 shrink-0 place-items-center rounded-full bg-muted">
                  <Square className="size-4" />
                </button>
              ) : (
                <button type="submit" aria-label="Send" disabled={!input.trim()} className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50">
                  <Send className="size-4" />
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
