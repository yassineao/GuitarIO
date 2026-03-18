import { useMemo, useState } from "react";
import { FIXTURES } from "./fixtures";
import parse from "html-react-parser";
import ChordSheetJS from "chordsheetjs";

function systemPromptForDifficulty(difficulty, genre) {
  const difficultyName =
    (typeof difficulty === "string" ? difficulty : difficulty?.name) ?? "novice";
  const genreName =
    (typeof genre === "string" ? genre : genre?.name) ?? "pop";

  const base = `
You are a music assistant.
Return ONLY ChordPro-style text with inline chords like: [C]word.
Do not wrap in markdown fences. Do not add explanations.

Write a well-known-sounding song in the style of ${genreName}.
`;

  if (difficultyName === "intermediate") {
    return (
      base +
      ` 
Difficulty: INTERMEDIATE
- Allow add7, sus2/sus4, occasional slash chords (G/B).
- Provide: Title, Key, Tempo.
- Structure: Verse, Pre-Chorus, Chorus, Verse, Pre, Chorus, Bridge, Final Chorus.
- Keep it playable on acoustic guitar.
`
    );
  }

  if (difficultyName === "advanced") {
    return (
      base +
      `
Difficulty: ADVANCED
- Allow maj7, m7, 9, secondary dominants, chromatic approach chords, tasteful modulation (optional).
- Provide: Title, Key, Tempo.
- Structure: Verse, Pre, Chorus, Verse, Pre, Chorus, Bridge, Outro.
- Keep voice-leading musical (avoid random chords).
`
    );
  }

  return (
    base +
    `
Difficulty: NOVICE
- Use only easy open chords: C, G, Am, F, Dm, Em, D, A, E.
- No slash chords, no barre-only chords.
- Provide: Title, Key, Tempo.
- Structure: Verse, Chorus, Verse, Chorus, Bridge (optional), Final Chorus.
- Keep chords repeating and simple.
`
  );
}

export default function Chat({
  title = "Chat",
  apiEndpoint = "/api/chat",
  assistantName = "Assistant",
  genre,
  difficulty,
}) {
  const intro = FIXTURES.messages?.[0];

  const [messages, setMessages] = useState(() =>
    intro
      ? [
          {
            role: "assistant",
            content: intro.content,
            meta: intro,
            createdAt: Date.now(),
          },
        ]
      : []
  );

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const activeAnswers = useMemo(() => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    return last?.meta?.answers ?? [];
  }, [messages]);

  function buildMessagesForApi(userMessages) {
    const system = systemPromptForDifficulty(difficulty, genre);
    return [{ role: "system", content: system }, ...userMessages.map(stripMeta)];
  }

  function stripMeta(m) {
    // Keep only what your API needs; meta/createdAt isn’t required by the model.
    return { role: m.role, content: m.content };
  }

  async function callApi(nextMessages) {
    setLoading(true);
    try {
      const payloadMessages = buildMessagesForApi(nextMessages);
      
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          difficulty,
          genre,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        setMessages([
          ...nextMessages,
          {
            role: "assistant",
            content: `Server error ${res.status}: ${text}`,
            createdAt: Date.now(),
          },
        ]);
        return;
      }

      const data = JSON.parse(text);

      const assistantMsg = {
        role: "assistant",
        content: data.text ?? "",
        meta: data.answers ? { answers: data.answers, author: data.author } : undefined,
        createdAt: Date.now(),
      };

      setMessages([...nextMessages, assistantMsg]);
    } catch (err) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "Network/client error calling API.",
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendTypedMessage(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const nextMessages = [
      ...messages,
      { role: "user", content: input.trim(), createdAt: Date.now() },
    ];

    setMessages(nextMessages);
    setInput("");
    await callApi(nextMessages);
  }

  async function pickAnswer(answerText) {
    if (loading) return;

    const nextMessages = [
      ...messages,
      { role: "user", content: answerText, createdAt: Date.now() },
    ];

    const isDecline = answerText.toLowerCase().includes("decline");
    setMessages(nextMessages);
    if (!isDecline) await callApi(nextMessages);
  }

  function RenderMessageBody({ content }) {
    try {
      const parser = new ChordSheetJS.ChordProParser();
      const song = parser.parse(content);
      const formatter = new ChordSheetJS.HtmlTableFormatter();
      const html = formatter.format(song);
      
      return (
        <div className="chord-sheet">
          {parse(html)}
        </div>
      );
    } catch {
      return <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>;
    }
  }

  function FeedMessage({ message }) {
    const dt = new Date(message.createdAt ?? Date.now());
    const timeLabel = dt.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    const author =
      message.meta?.author?.name ||
      message.author?.name ||
      (message.role === "user" ? "You" : assistantName) ||
      "Unknown";

    const isUser = message.role === "user";

    return (
      <div className={`cp-message ${isUser ? "cp-message--user" : "cp-message--assistant"}`}>
        <div className="cp-message__avatar">
          {isUser ? "◈" : "◆"}
        </div>
        <div className="cp-message__content">
          <div className="cp-message__header">
            <span className="cp-message__author">{author}</span>
            <span className="cp-message__time">{timeLabel}</span>
          </div>
          <div className="cp-message__body">
            <RenderMessageBody content={message.content} />
          </div>
        </div>
      </div>
    );
  }

  function DialogChoices() {
    if (!activeAnswers.length) return null;

    return (
      <div className="cp-choices">
        {activeAnswers.map((a) => (
          <button
            key={a.id}
            type="button"
            className={`cp-choices__btn ${loading ? "cp-choices__btn--disabled" : ""}`}
            disabled={loading}
            onClick={() => {
              if (!loading) pickAnswer(a.content);
            }}
          >
            <span className="cp-choices__icon">▶</span>
            {a.content}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="cp-chat">
      <div className="cp-chat__header">
        <div className="cp-chat__header-icon">◉</div>
        <h1 className="cp-chat__title">{title}</h1>
        <div className="cp-chat__header-line" />
      </div>

      <div className="cp-chat__body">
        {messages.map((m, i) => (
          <FeedMessage key={i} message={m} />
        ))}
        {loading && (
          <div className="cp-chat__loading">
            <span className="cp-chat__loading-dot" />
            <span className="cp-chat__loading-dot" />
            <span className="cp-chat__loading-dot" />
          </div>
        )}
      </div>

      <div className="cp-chat__footer">
        <DialogChoices />
        {/* <form className="cp-chat__form" onSubmit={sendTypedMessage}>
          <label className="form-label" htmlFor="message">
            Transmit
          </label>
          <div className="cp-chat__input-wrap">
            <textarea
              id="message"
              className="cp-chat__textarea"
              name="message"
              placeholder="Type your message..."
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendTypedMessage(e);
                }
              }}
            />
            <button
              type="submit"
              className={`cp-chat__send ${loading ? "cp-chat__send--loading" : ""}`}
              disabled={loading}
            >
              {loading ? "···" : "▶ SEND"}
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
}
