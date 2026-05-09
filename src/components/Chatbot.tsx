"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import type { Locale } from "@/i18n/config";

const linkPattern =
  /\b(contact\s*(?:me|form)|get\s*in\s*touch|contatt(?:ami|o|a)|modulo\s*di\s*contatto|cont[aá]ct(?:ame|o)|formulario\s*de\s*contacto|reach\s*out|telegram)\b/gi;

const telegramPattern = /\b(reach\s*out|telegram)\b/i;

function renderWithLinks(
  text: string,
  onContactClick: () => void,
): React.ReactNode {
  const parts = text.split(linkPattern);
  if (parts.length === 1) return text;

  // split with capture group puts matches at odd indices
  return parts.map((part, i) => {
    if (i % 2 === 0) return part;

    if (telegramPattern.test(part)) {
      return (
        <a
          key={i}
          href="https://t.me/edwardcastle"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-accent hover:text-accent/80 transition-colors"
        >
          {part}
        </a>
      );
    }

    return (
      <button
        key={i}
        onClick={onContactClick}
        className="underline text-accent hover:text-accent/80 transition-colors cursor-pointer"
      >
        {part}
      </button>
    );
  });
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const uiText: Record<
  Locale,
  {
    title: string;
    placeholder: string;
    greeting: string;
    suggestions: string[];
  }
> = {
  en: {
    title: "Chat with Eduardo",
    placeholder: "Type a message...",
    greeting:
      "Hi! I'm Eduardo's AI assistant. Ask me anything about my skills, services, or experience!",
    suggestions: [
      "What services do you offer?",
      "What's your tech stack?",
      "Are you available for hire?",
      "Tell me about your projects",
    ],
  },
  es: {
    title: "Chatea con Eduardo",
    placeholder: "Escribe un mensaje...",
    greeting:
      "Hola! Soy el asistente de Eduardo. Preguntame lo que quieras sobre mis servicios, habilidades o experiencia!",
    suggestions: [
      "Que servicios ofreces?",
      "Cual es tu stack tecnologico?",
      "Estas disponible?",
      "Cuentame sobre tus proyectos",
    ],
  },
  it: {
    title: "Chatta con Eduardo",
    placeholder: "Scrivi un messaggio...",
    greeting:
      "Ciao! Sono l'assistente di Eduardo. Chiedimi quello che vuoi sui miei servizi, competenze o esperienze!",
    suggestions: [
      "Quali servizi offri?",
      "Qual e il tuo stack tecnologico?",
      "Sei disponibile?",
      "Parlami dei tuoi progetti",
    ],
  },
};

export function Chatbot({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [mobileViewport, setMobileViewport] = useState<{
    height: number;
    offsetTop: number;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = uiText[locale];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!isOpen) return;
    const vv = window.visualViewport;
    if (!vv) return;

    function onViewportChange() {
      setMobileViewport({ height: vv!.height, offsetTop: vv!.offsetTop });
    }
    onViewportChange();
    vv.addEventListener("resize", onViewportChange);
    vv.addEventListener("scroll", onViewportChange);
    return () => {
      vv.removeEventListener("resize", onViewportChange);
      vv.removeEventListener("scroll", onViewportChange);
      setMobileViewport(null);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.inset = "0";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.inset = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    // Add empty assistant message that we'll stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, locale }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to send message");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const data = line.replace(/^data: /, "");
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              setMessages((prev) => {
                const lastIdx = prev.length - 1;
                const last = prev[lastIdx];
                if (last.role === "assistant") {
                  return [
                    ...prev.slice(0, lastIdx),
                    { ...last, content: last.content + parsed.text },
                  ];
                }
                return prev;
              });
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const lastIdx = prev.length - 1;
        const last = prev[lastIdx];
        if (last.role === "assistant" && !last.content) {
          const errorMsg =
            locale === "es"
              ? "Lo siento, algo salio mal. Intentalo de nuevo."
              : locale === "it"
                ? "Mi dispiace, qualcosa e andato storto. Riprova."
                : "Sorry, something went wrong. Please try again.";
          return [...prev.slice(0, lastIdx), { ...last, content: errorMsg }];
        }
        return prev;
      });
      console.error("Chat error:", err);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              boxShadow: [
                "0 0 0 0 rgba(6, 182, 212, 0.4)",
                "0 0 0 12px rgba(6, 182, 212, 0)",
                "0 0 0 0 rgba(6, 182, 212, 0.4)",
              ],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center shadow-lg shadow-accent/30 cursor-pointer"
            aria-label="Open chat"
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={
              mobileViewport
                ? {
                    height: `${mobileViewport.height}px`,
                    top: `${mobileViewport.offsetTop}px`,
                  }
                : undefined
            }
            className="fixed inset-x-0 top-0 z-[60] h-dvh flex flex-col bg-background sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[480px] sm:!h-[min(600px,85vh)] sm:rounded-2xl sm:border sm:border-border sm:bg-[rgba(5,5,16,0.95)] sm:backdrop-blur-xl sm:shadow-2xl sm:shadow-black/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-semibold text-sm text-foreground">
                  {t.title}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {/* Greeting */}
              <div className="flex justify-start">
                <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-bl-sm bg-white/5 border border-border text-sm text-foreground">
                  {t.greeting}
                </div>
              </div>

              {/* Suggestions (show only if no messages yet) */}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2">
                  {t.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      className="px-3 py-1.5 text-xs rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Message list */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "rounded-br-sm bg-accent/20 border border-accent/30 text-foreground"
                        : "rounded-bl-sm bg-white/5 border border-border text-foreground"
                    }`}
                  >
                    {msg.content
                      ? msg.role === "assistant"
                        ? renderWithLinks(msg.content, () => {
                            setIsOpen(false);
                            document
                              .getElementById("contact")
                              ?.scrollIntoView({ behavior: "smooth" });
                          })
                        : msg.content
                      : (
                      <Loader2 size={14} className="animate-spin text-muted" />
                    )}
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-border"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                disabled={isStreaming}
                className="flex-1 bg-white/5 border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-accent text-background disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-opacity"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
