import React, { useState } from "react";
import Link from "next/link";
import { askTeachingAssistant } from "@/pages/api/rag";

const suggestedQuestions = [
  "How do I switch between G, C, and D smoothly?",
  "What should I practice for 15 minutes today?",
  "How do I keep rhythm while strumming?",
];

export default function TeachingAssistant({ teachingDocuments = [] }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearConversation = () => {
    setQuestion("");
    setAnswer("");
    setSources([]);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAnswer("");
    setError("");
    setSources([]);

    if (!question.trim()) {
      setError("Ask a question about guitar teaching first.");
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const data = await askTeachingAssistant(question, controller, setError);
      setAnswer(data?.answer || "No answer returned.");
      setSources(data?.sources || []);
    } catch (err) {
      if (err?.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else if (err instanceof Error && err.message) {
        setError(err.message);
      } else {
        setError("Request failed.");
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <main className="teaching-page">
      <section className="container teaching-shell">
        <div className="teaching-header">
          <span className="teaching-eyebrow">Practice desk</span>
          <h1>Guitar Teaching Assistant</h1>
          <p>Ask a focused question and get a lesson-grounded answer from your GuitarIO backend.</p>
        </div>

        <div className="teaching-workspace">
          <form onSubmit={handleSubmit} className="rag-form">
            <div className="rag-form__topline">
              <span>Ask</span>
              <small>{question.trim().length}/1000</small>
            </div>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about chords, rhythm, practice, or learning songs..."
              rows={7}
              maxLength={1000}
            />

            <div className="rag-suggestions" aria-label="Suggested questions">
              {suggestedQuestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuestion(suggestion)}
                  disabled={loading}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="rag-actions">
              <button type="submit" disabled={loading}>
                {loading ? "Thinking..." : "Ask assistant"}
              </button>
              <button
                type="button"
                className="rag-clear"
                onClick={clearConversation}
                disabled={loading || (!question && !answer && !error)}
              >
                Clear
              </button>
            </div>
          </form>

          <aside className="rag-panel" aria-live="polite">
            <div className="rag-panel__header">
              <span>Answer</span>
              {sources.length > 0 && (
                <small>
                  {sources.length} source{sources.length === 1 ? "" : "s"}
                </small>
              )}
            </div>

            {loading && (
              <div className="rag-state">
                <span className="rag-loader" aria-hidden="true" />
                <p>Reading your lessons and shaping a practice answer...</p>
              </div>
            )}

            {!loading && error && <div className="rag-error">{error}</div>}

            {!loading && !error && !answer && (
              <div className="rag-empty">
                <strong>Ready when you are.</strong>
                <p>Try asking for a chord-change drill, a strumming pattern, or a short practice plan.</p>
              </div>
            )}

            {!loading && answer && (
              <div className="rag-answer">
                <p>{answer}</p>
                {sources.length > 0 && (
                  <div className="rag-sources">
                    <span>Sources used</span>
                    <ul>
                      {sources.map((source) => (
                        <li key={source.id || source.title}>
                          <strong>{source.title}</strong>
                          {source.description && <small>{source.description}</small>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="container teaching-topics">
        <div className="teaching-section-heading">
          <span>Lesson map</span>
          <h2>Teaching topics</h2>
        </div>
        <div className="topic-list">
          {teachingDocuments.map((doc) => (
            <article key={doc.id} className="topic-card">
              <h3>{doc.title}</h3>
              <p>{doc.body.trim().slice(0, 150)}...</p>
            </article>
          ))}
        </div>
        <div className="back-link">
          <Link href="/options">Back to Learn</Link>
        </div>
      </section>
    </main>
  );
}
