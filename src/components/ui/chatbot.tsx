'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, X, Send, Sparkles, Bot, ArrowRight, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '¿Qué servicios ofrecen?',
  '¿Quiénes conforman el equipo?',
  'Proyectos destacados',
  '¿Cómo solicitar una cotización?',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '¡Hola! 👋 Soy **Nodux AI**, tu asistente virtual.\n\n¿En qué puedo ayudarte hoy sobre nuestra consultoría de procesos, ingeniería de datos o desarrollo de software?',
      timestamp: 'Ahora',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Disculpa, no pude procesar la respuesta. Por favor intenta de nuevo.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Ocurrió un inconveniente al conectar con el servidor. Si deseas atención inmediata, contáctanos vía WhatsApp al **[+51 919 620 888](https://wa.me/51919620888)**.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render markdown-like links & bold
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      // Process bold **text**
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
      return (
        <span key={lineIdx} className="block leading-relaxed min-h-[1.2rem]">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-foreground">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (linkMatch) {
              return (
                <a
                  key={pIdx}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-accent font-medium inline-flex items-center gap-0.5"
                >
                  {linkMatch[1]}
                </a>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating launcher button in the bottom-left */}
      <div className="fixed bottom-6 left-6 z-50">
        {!isOpen && (
          <div className="relative group">
            {/* Pulsing glow ring */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-75 blur group-hover:opacity-100 transition duration-500 animate-pulse" />

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-3 bg-card hover:bg-card/90 text-foreground border border-primary/40 shadow-2xl rounded-full px-5 py-3.5 transition-all duration-300 transform hover:scale-105"
              aria-label="Abrir asistente de IA Nodux"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30">
                <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold leading-tight text-foreground">Nodux AI</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Asistente en línea</p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[400px] h-[560px] max-h-[85vh] flex flex-col bg-card/95 backdrop-blur-2xl border border-primary/30 rounded-2xl shadow-[0_20px_60px_-15px_rgba(37,99,235,0.3)] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-gradient-to-r from-card via-primary/5 to-card">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/40 bg-primary/10 flex items-center justify-center shadow-inner">
                <Image
                  src="/images/logo.jpg"
                  alt="Nodux AI"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm font-headline text-foreground">Nodux AI</h3>
                  <span className="px-1.5 py-0.2 bg-primary/10 border border-primary/20 rounded text-[10px] font-medium text-primary">
                    Gemini
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Consultor Virtual de Procesos & Datos</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full"
                aria-label="Cerrar chat"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full"
                aria-label="Cerrar ventana"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`flex flex-col max-w-[82%] ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm text-sm ${
                        isUser
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary/70 text-card-foreground border border-border/50 rounded-bl-none backdrop-blur-md'
                      }`}
                    >
                      {renderFormattedText(message.content)}
                    </div>
                    <span className="text-[10px] text-muted-foreground px-1 mt-1">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-secondary/70 border border-border/50 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (only show if few messages) */}
          {messages.length <= 3 && !isLoading && (
            <div className="px-4 py-2 border-t border-border/30 bg-card/40 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] bg-secondary/80 hover:bg-primary/20 text-muted-foreground hover:text-primary border border-border/50 rounded-full px-3 py-1 transition-colors text-left flex items-center gap-1"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-border/40 bg-card/80 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje o consulta..."
              disabled={isLoading}
              className="flex-1 bg-secondary/50 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-200 disabled:opacity-40"
              aria-label="Enviar mensaje"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
