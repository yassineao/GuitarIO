"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  // --- form state ---
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState(""); // ✅ new

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [houseNr, setHouseNr] = useState("");
  const [plz, setPlz] = useState("");

  const [telNumber, setTelNumber] = useState("");
  const [dialingCode, setDialingCode] = useState("+49");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const buildAddress = () => {
    const parts = [
      houseNr && `House ${houseNr}`,
      plz && plz,
      city && city,
      country && country,
    ].filter(Boolean);
    return parts.join(" ");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!firstname || !lastname || !username || !email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    if (password !== confirm) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const address = buildAddress();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      setSubmitting(true);

      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstname,
          lastname,
          username, // ✅ send username
          email,
          password,
          telNumber,
          address,
          role: "USER",
          dialingCode,
        }),
        signal: controller.signal,
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
            : (payload && payload.message) || `Register failed (${payload?.detail || "unknown error"})`;

        const fieldErrors =
          payload && payload.errors
            ? Object.entries(payload.errors)
                .map(([k, v]) => `${k}: ${v}`)
                .join("; ")
            : "";

        setErrorMessage(fieldErrors ? `${baseMsg}. ${fieldErrors}` : baseMsg);
        return;
      }
if (payload.accessToken) {
        localStorage.setItem("accessToken", payload.accessToken);
      }
      if (payload.refreshToken) {
        localStorage.setItem("refreshToken", payload.refreshToken);
      }
      setErrorMessage("");
      router.push("/");
    } catch (err) {
      if (err.name === "AbortError") {
        setErrorMessage("Request timed out. Please try again.");
      } else {
        console.error(err);
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <section className="mid">
        <div id="formi" className="form-container">
          <form className="form" onSubmit={handleSubmit} noValidate>
            {errorMessage && (
              <div id="error-message" role="alert" className="text-red-600 mb-2">
                {errorMessage}
              </div>
            )}

            <span className="heading">Register</span>

            <span className="c1">Name</span>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Firstname"
                className="input"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Lastname"
                className="input"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>

            {/* ✅ Username field */}
            <span className="c1">Username</span>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Choose a username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <span className="c1">Address</span>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Country"
                className="input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="City"
                className="input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <span className="c1">Postal / House No.</span>
            <div className="field input-field">
              <input
                type="text"
                placeholder="PLZ"
                className="input"
                value={plz}
                onChange={(e) => setPlz(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="House Number"
                className="input"
                value={houseNr}
                onChange={(e) => setHouseNr(e.target.value)}
                required
              />
            </div>

            <span className="c1">Phone</span>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Dialing Code (e.g. +49)"
                className="input"
                value={dialingCode}
                onChange={(e) => setDialingCode(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="input"
                value={telNumber}
                onChange={(e) => setTelNumber(e.target.value)}
                required
              />
            </div>

            <span className="c1">Email</span>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <span className="c1">Password</span>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Retype Password"
                className="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <div className="button-container">
              <button className="send-button" type="submit" disabled={submitting}>
                {submitting ? "Creating…" : "Become a Player"}
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
              Already have an account?{" "}
              <Link href="/login" className="link login-link">
                Login
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
