import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const STORAGE_PREFIX = "guitario-comments:";

const formatDate = (value) =>
  new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const cleanPath = (path) => path.split("?")[0].split("#")[0] || "/";

const PageComments = () => {
  const router = useRouter();
  const pagePath = useMemo(() => cleanPath(router.asPath || "/"), [router.asPath]);
  const storageKey = `${STORAGE_PREFIX}${pagePath}`;

  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);

    try {
      const savedComments = window.localStorage.getItem(storageKey);
      setComments(savedComments ? JSON.parse(savedComments) : []);
    } catch {
      setComments([]);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, isReady, storageKey]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return;
    }

    setComments((currentComments) => [
      {
        id: crypto.randomUUID(),
        author: name.trim() || "Gast",
        message: trimmedMessage,
        createdAt: new Date().toISOString(),
      },
      ...currentComments,
    ]);

    setMessage("");
  };

  const removeComment = (id) => {
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== id)
    );
  };

  return (
    <section className="page-comments" aria-labelledby="page-comments-title">
      <div className="page-comments__inner container">
        <div className="page-comments__header">
          <span className="page-comments__eyebrow">Community</span>
          <h2 id="page-comments-title">Kommentare</h2>
        </div>

        <form className="page-comments__form" onSubmit={handleSubmit}>
          <label className="page-comments__field">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Dein Name"
              maxLength={40}
            />
          </label>

          <label className="page-comments__field page-comments__field--message">
            <span>Kommentar</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Schreib einen Kommentar zu dieser Seite..."
              rows={4}
              maxLength={500}
              required
            />
          </label>

          <div className="page-comments__actions">
            <small>{message.length}/500</small>
            <button type="submit">Senden</button>
          </div>
        </form>

        <div className="page-comments__list" aria-live="polite">
          {comments.length === 0 ? (
            <p className="page-comments__empty">
              Noch keine Kommentare auf dieser Seite.
            </p>
          ) : (
            comments.map((comment) => (
              <article className="page-comments__item" key={comment.id}>
                <div className="page-comments__meta">
                  <strong>{comment.author}</strong>
                  <time dateTime={comment.createdAt}>
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
                <p>{comment.message}</p>
                <button
                  type="button"
                  className="page-comments__delete"
                  onClick={() => removeComment(comment.id)}
                >
                  Löschen
                </button>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PageComments;
