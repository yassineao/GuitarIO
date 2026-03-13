import { useMemo, useState } from "react";
import { Button } from "./ui";
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
        <div className="chord-sheet" style={{ whiteSpace: "pre-wrap" }}>
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

    return (
      <div className="message" style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        <div className="message__body">
          <RenderMessageBody content={message.content} />
        </div>

        <div className="message__footer" style={{ marginTop: 8, opacity: 0.7 }}>
          <span className="message__authoring">{author}</span>
          {` - ${timeLabel}`}
        </div>
      </div>
    );
  }

  function DialogChoices() {
    if (!activeAnswers.length) return null;

    return (
      <ul className="nav" style={{ padding: 12 }}>
        {activeAnswers.map((a) => (
          <li className="nav__item" key={a.id}>
            <a
              href="#"
              className="nav__link"
              onClick={(e) => {
                e.preventDefault();
                if (!loading) pickAnswer(a.content);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) pickAnswer(a.content);
              }}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {a.content}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="channel-feed">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{title}</h1>

      <div className="channel-feed__body">
        {messages.map((m, i) => (
          <FeedMessage key={i} message={m} />
        ))}
      </div>

      <div className="channel-feed__footer">
        <form className="channel-message-form" action="#" onSubmit={sendTypedMessage}>
          <div className="form-group">
            <label className="form-label" htmlFor="message">
              Message
            </label>

            <div className="form-control">
              <DialogChoices />
              <textarea
                id="message"
                className="form-control"
                name="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>

          <div className="form-footer">
            <Button size="xl" type="submit" variant="primary">
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
