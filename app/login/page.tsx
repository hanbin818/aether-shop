"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("회원가입 완료! 이메일 확인 후 로그인해줘.");
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("로그인 성공!");
    window.location.href = "/admin";
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    alert("로그아웃 완료!");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#15151d",
          padding: "40px",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <a href="/" style={{ color: "#aaa", textDecoration: "none" }}>
          ← Back to Home
        </a>

        <h1
          style={{
            fontSize: "44px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          Login
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
          }}
          style={{ display: "grid", gap: "16px" }}
        >
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>

          <button type="button" onClick={signUp} style={subButtonStyle}>
            Sign Up
          </button>

          <button type="button" onClick={signOut} style={subButtonStyle}>
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: "16px",
  borderRadius: "10px",
  border: "1px solid #333",
  background: "#0b0b0f",
  color: "white",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "16px",
  background: "white",
  color: "#111",
  border: "none",
  borderRadius: "10px",
  fontWeight: "800",
  cursor: "pointer",
};

const subButtonStyle = {
  ...buttonStyle,
  background: "#222",
  color: "white",
};