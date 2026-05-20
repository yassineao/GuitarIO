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

function getRefreshToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem("refreshToken") || "";
}

function saveTokens(payload) {
  if (typeof window === "undefined" || !payload) {
    return;
  }

  const accessToken = payload.access || payload.accessToken;
  const refreshToken = payload.refresh || payload.refreshToken;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
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
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return "";
  }

  const res = await fetch(buildPublicApiUrl("/auth/refresh"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ refreshToken }),
    signal: controller?.signal,
  });

  const payload = await parseResponse(res);

  if (!res.ok) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return "";
  }

  saveTokens(payload);
  return payload?.access || payload?.accessToken || "";
}

async function requestTeachingAnswer(question, token, controller) {
  return fetch(buildPublicApiUrl("/rag/ask"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify({ question }),
    signal: controller?.signal,
  });
}

export async function askTeachingAssistant(question, controller, setErrorMessage) {
  try {
    let token = getAccessToken();
    let res = await requestTeachingAnswer(question, token, controller);

    if (res.status === 401) {
      token = await refreshAccessToken(controller);
      if (token) {
        res = await requestTeachingAnswer(question, token, controller);
      }
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
