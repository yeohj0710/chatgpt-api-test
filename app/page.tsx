"use client";

import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.answer) {
        setMessages([...newMessages, { role: "assistant", content: data.answer }]);
      } else if (data.error) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: `오류: ${data.error}` },
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center min-h-screen p-4">
      <div
        ref={containerRef}
        className="flex-1 w-full max-w-2xl overflow-y-auto mb-4 space-y-4"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg max-w-full break-words ${
                m.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-2xl gap-2">
        <input
          className="flex-1 border rounded p-2 dark:bg-black dark:text-white"
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          className="bg-foreground text-background p-2 rounded"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
}

