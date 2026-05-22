import { buildPublicApiUrl } from "../../lib/api-url";

function createHandledError(message) {
  const error = new Error(message);
  error.handled = true;

  return error;
}

async function parseResponse(res) {
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

async function refreshAccessToken(controller) {
  const res = await fetch(buildPublicApiUrl("/auth/refresh"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({}),
    signal: controller?.signal,
  });

  return res.ok;
}

async function requestTeachingAnswer(question, controller) {
  return fetch(buildPublicApiUrl("/rag/ask"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ question }),
    signal: controller?.signal,
  });
}

export async function askTeachingAssistant(question, controller, setErrorMessage) {
  try {
    let res = await requestTeachingAnswer(question, controller);

    if (res.status === 401 && (await refreshAccessToken(controller))) {
      res = await requestTeachingAnswer(question, controller);
    }

    const payload = await parseResponse(res);

    if (!res.ok) {
      const finalMessage =
        res.status === 401
          ? "Please log in again to use the teaching assistant."
          : typeof payload === "string"
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
