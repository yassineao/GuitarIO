

export async function authenticateUser(email, password, controller, setErrorMessage) {
  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
        : (payload && payload.message) ||
          (payload && payload.error) ||
          "Login failed";

    const fieldErrors =
      payload && payload.errors
        ? Object.entries(payload.errors)
            .map(([k, v]) => `${k}: ${v}`)
            .join("; ")
        : "";

    const finalMsg = fieldErrors ? `${baseMsg}. ${fieldErrors}` : baseMsg;
    setErrorMessage(finalMsg);
    throw new Error(finalMsg);
  }

  return payload; 
}
