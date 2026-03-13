"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { authenticateUser } from "./api/login";
import { useAuth } from "./api/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // AuthContext login()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter email and password.");
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      setSubmitting(true);

      // Call backend (returns tokens)
      const payload = await authenticateUser(
        email,
        password,
        controller,
        setErrorMessage
      );

      // Backend returns: { access, refresh }
      const accessToken = payload.access || payload.accessToken;
      const refreshToken = payload.refresh || payload.refreshToken;


      console.log("Login successful, accessToken:", accessToken);
      // Tell AuthContext you logged in
      login(accessToken, refreshToken);

      // Navigate to home
      router.push("/");

    } catch (err) {
      if (err?.name === "AbortError") {
        setErrorMessage("Request timed out. Please try again.");
      }
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  return (
    <div className="miid">
      <section>
        <div id="formi" className="form-container">
          <form className="form" onSubmit={handleSubmit} noValidate>
            {errorMessage && (
              <div id="error-message" role="alert" className="text-red-600 mb-2">
                {errorMessage}
              </div>
            )}

            <span className="heading">Login</span>
            <span className="c2">
              Join our community and learn how to be the next guitar master!
            </span>

            <span className="c1">Email</span>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <span className="c1">Password</span>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="button-container">
              <button className="send-button" type="submit" disabled={submitting}>
                {submitting ? "Signing in…" : "Login"}
              </button>
              <div className="reset-button-container">
                <button
                  className="reset-button"
                  id="reset-btn"
                  type="reset"
                  disabled={submitting}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>

          <div className="form-link">
            <span>
              You don't have an account?{" "}
              <Link href="/register" className="link login-link">
                Register
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
