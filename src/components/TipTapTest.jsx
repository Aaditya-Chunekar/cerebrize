import React, { useState, useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TipTapTest() {
  const [prompt, setPrompt] = useState("");
  const [lastKeyTime, setLastKeyTime] = useState(Date.now());
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [pauseDuration, setPauseDuration] = useState(0);
  const [revisions, setRevisions] = useState(0);
  const keyCount = useRef(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      const now = Date.now();
      const diff = (now - lastKeyTime) / 1000; // seconds
      setPauseDuration(diff);

      keyCount.current += 1;
      setTypingSpeed((keyCount.current / (now - startTime.current)) * 1000);

      setLastKeyTime(now);
    },
    onTransaction: ({ transaction }) => {
      if (transaction.docChanged && transaction.steps.length > 0) {
        const step = transaction.steps[0];
        if (step.from !== step.to) {
          setRevisions((prev) => prev + 1); // simple revision count
        }
      }
    },
  });

  const startTime = useRef(Date.now());

  // Send metrics every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          typing_speed: typingSpeed,
          pause_duration: pauseDuration,
          revisions: revisions,
        }),
      })
        .then((res) => res.json())
        .then((data) => setPrompt(data.prompt));
    }, 5000);

    return () => clearInterval(interval);
  }, [typingSpeed, pauseDuration, revisions]);

  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial" }}>
      <div style={{ flex: 2, marginRight: "20px" }}>
        <h2>✍️ Cerebrize MVP</h2>
        <EditorContent editor={editor} style={{ border: "1px solid #ccc", padding: "10px", minHeight: "200px" }} />
      </div>
      <div style={{ flex: 1, background: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
        <h3>💡 Adaptive Prompt</h3>
        <p>{prompt || "No prompt yet..."}</p>
      </div>
    </div>
  );
}

export default TipTapTest;
