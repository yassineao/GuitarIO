
import { buildPublicApiUrl } from "../../lib/api-url";

function createHandledError(message) {
  const error = new Error(message);
  error.handled = true;

  return error;
}


export async function authenticateUser(email, password, controller, setErrorMessage) {
  try {
    const res = await fetch(buildPublicApiUrl("/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
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
      const baseMsg =
        typeof payload === "string"
          ? payload
          : payload?.message || payload?.error || "Login failed";

      const fieldErrors = payload?.errors
        ? Object.entries(payload.errors)
            .map(([k, v]) => `${k}: ${v}`)
            .join("; ")
        : "";

      const finalMsg = fieldErrors ? `${baseMsg}. ${fieldErrors}` : baseMsg;
      setErrorMessage(finalMsg);
      throw createHandledError(finalMsg);
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
        : "Unable to sign in right now. Please try again.";

    setErrorMessage(finalMessage);
    throw error;
  }
}
