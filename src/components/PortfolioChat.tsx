import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, MessageCircleQuestion, Send, Square, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { useLang } from "@/i18n/LangProvider";

// Opens the chat from anywhere on the page, optionally with a pre-loaded question.
export function openPortfolioChat(question?: string) {
  window.dispatchEvent(new CustomEvent<string | undefined>("portfolio-chat:open", { detail: question }));
}

export function PortfolioChat() {
  const { t, lang } = useLang();
  const faq = t.faq;
  const [open, setOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop } = useChat({
    transport,
    onError: (e) => {
      const m = e.message || "";
      if (m.includes("429")) toast.error(t.chat.errBusy);
      else if (m.includes("402")) toast.error(t.chat.errCredits);
      else toast.error(t.chat.errGeneric);
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
      if (q && !busy) sendMessage({ text: q }, { body: { lang } });
    };
    window.addEventListener("portfolio-chat:open", handler);
    return () => window.removeEventListener("portfolio-chat:open", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendMessage, lang]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    sendMessage({ text: q }, { body: { lang } });
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t.chat.close : t.chat.open}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="size-5" /> : <MessageCircleQuestion className="size-5" />}
        <span className="hidden sm:inline">{open ? t.chat.close : t.chat.open}</span>
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
                <p className="font-display font-semibold">{t.chat.title(profile.name)}</p>
                <p className="text-xs text-muted-foreground">{t.chat.subtitle}</p>
              </div>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{t.chat.intro}</p>
                  {faq.map((f, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={f.q} className="overflow-hidden rounded-xl border border-border">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted"
                        >
                          {f.q}
                          <ChevronDown
                            className={`size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="border-t border-border px-3 py-2">
                            <div className="prose prose-sm max-w-none text-sm text-muted-foreground [&_p]:my-1.5 [&_ul]:my-1.5 [&_ol]:my-1.5">
                              <ReactMarkdown>{f.a}</ReactMarkdown>
                            </div>
                            <button
                              onClick={() => send(f.q)}
                              className="mt-1 text-xs font-medium text-highlight transition-opacity hover:opacity-80"
                            >
                              {t.chat.askMore}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                placeholder={t.chat.placeholder}
                className="max-h-28 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {busy ? (
                <button type="button" onClick={() => stop()} aria-label={t.chat.stop} className="grid size-10 shrink-0 place-items-center rounded-full bg-muted">
                  <Square className="size-4" />
                </button>
              ) : (
                <button type="submit" aria-label={t.chat.send} disabled={!input.trim()} className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50">
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
