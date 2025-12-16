import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Bot } from "lucide-react";

interface ChatBotTaskDialogProps {
  open: boolean;
  onClose: () => void;
  context: string;
  taskType: string;
  onSend: (question: string) => void;
}

const STANDARD_QUESTIONS: Record<string, string[]> = {
  zaehlerstand: [
    "Wie finde ich meinen Zählerstand?",
    "Was passiert, wenn ich die Frist verpasse?",
    "Kann ich den Zählerstand auch telefonisch melden?",
  ],
  vertrag: [
    "Wie funktioniert die digitale Unterschrift?",
    "Ist die digitale Unterschrift rechtsgültig?",
    "Kann ich den Vertrag auch ausdrucken und per Post schicken?",
  ],
  dokumente: [
    "Welche Dateiformate werden akzeptiert?",
    "Wie lade ich mehrere Dokumente hoch?",
    "Was passiert, wenn ich die Dokumente zu spät einreiche?",
  ],
};

const TASK_LABELS: Record<string, { context: string; intro: string }> = {
  zaehlerstand: {
    context: "Zählerstand melden – bitte teilen Sie uns Ihren Zählerstand bis zum 31.12.2025 mit.",
    intro: "Welche Fragen haben Sie zur Zählerstandsmeldung?",
  },
  vertrag: {
    context: "Vertrag digital unterschreiben – Ihr Netzanschlussvertrag wartet auf Ihre digitale Unterschrift.",
    intro: "Welche Fragen haben Sie zur digitalen Unterschrift?",
  },
  dokumente: {
    context: "Dokumente für Antrag nachreichen – für Ihren Antrag PV-Anlage fehlen noch Lageplan und Gebäudeplan.",
    intro: "Welche Fragen haben Sie zum Nachreichen von Dokumenten?",
  },
};

export function ChatBotTaskDialog({ open, onClose, context, taskType, onSend }: ChatBotTaskDialogProps) {
  const [input, setInput] = useState("");
  const questions = STANDARD_QUESTIONS[taskType] || [];
  const labels = TASK_LABELS[taskType] || { context, intro: "Wie kann ich helfen?" };

  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hallo! ${labels.context}\n${labels.intro}`,
      sender: "bot" as const,
    },
  ]);

  useEffect(() => {
    // Reset Chatverlauf bei Öffnen oder Kontextwechsel
    if (open) {
      setMessages([
        {
          id: 1,
          text: `Hallo! ${labels.context}\n${labels.intro}`,
          sender: "bot" as const,
        },
      ]);
    }
  }, [open, context, taskType]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (msg: string) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: msg, sender: "user" as const },
    ]);
    onSend(msg);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl relative flex flex-col animate-in fade-in zoom-in">
        <button
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          onClick={onClose}
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 px-4 pt-4 pb-2 border-b">
          <span className="bg-primary/10 rounded-full p-2"><Bot className="w-6 h-6 text-primary" /></span>
          <span className="font-semibold text-primary">Digitaler Assistent</span>
        </div>
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{maxHeight: 350}}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
              <div className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm whitespace-pre-line ${msg.sender === "bot" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2 mb-2">
            {questions.map((q, idx) => (
              <Button
                key={idx}
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white hover:from-blue-600 hover:to-fuchsia-700 border-0"
                onClick={() => sendMessage(q)}
              >
                {q}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              className="rounded-2xl"
              placeholder="Nachricht eingeben..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && input.trim()) {
                  sendMessage(input);
                  setInput("");
                }
              }}
            />
            <Button onClick={() => { if (input.trim()) { sendMessage(input); setInput(""); } }}>
              Senden
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
