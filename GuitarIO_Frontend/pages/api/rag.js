import { buildPublicApiUrl } from "../../lib/api-url";

function createHandledError(message) {
  const error = new Error(message);
  error.handled = true;

  return error;
}

function getAccessToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem("accessToken") || "";
}

export async function askTeachingAssistant(question, controller, setErrorMessage) {
  try {
    const token = getAccessToken();
    const res = await fetch(buildPublicApiUrl("/rag/ask"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify({ question }),
      signal: controller?.signal,
    });

    const text = await res.text();
    let payload = null;

    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = text;
    }

    if (!res.ok) {
      const finalMessage =
        typeof payload === "string"
          ? payload
          : payload?.message || payload?.error || "Unable to get teaching answer.";

      setErrorMessage(finalMessage);
      throw createHandledError(finalMessage);
    }

    return payload;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw error;
    }

    if (error?.handled) {
      throw error;
    }

    const finalMessage =
      error instanceof Error && error.message
        ? error.message
        : "Unable to get teaching answer right now. Please try again.";

    setErrorMessage(finalMessage);
    throw error;
  }
}
