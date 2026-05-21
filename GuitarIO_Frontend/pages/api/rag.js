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

function isTokenExpiredOrUnreadable(token) {
  if (!token) {
    return true;
  }

  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return true;
    }

    const normalizedPayload = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const decodedPayload = JSON.parse(atob(normalizedPayload));
    const now = Date.now() / 1000;

    return typeof decodedPayload.exp !== "number" || decodedPayload.exp <= now;
  } catch {
    return true;
  }
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
    const shouldRefresh = res.status === 401 && isTokenExpiredOrUnreadable(token);

    if (shouldRefresh) {
      token = await refreshAccessToken(controller);
      if (token) {
        res = await requestTeachingAnswer(question, token, controller);
      }
    }

    const payload = await parseResponse(res);

    if (!res.ok) {
      const finalMessage =
        res.status === 401
          ? shouldRefresh
            ? "Please log in again to use the teaching assistant."
            : "The teaching assistant request was unauthorized. Your login was kept; please check the RAG API configuration."
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
