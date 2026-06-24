"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        window.location.href = "/";
      }
    };

    checkUser();
  }, []);

  const signUp = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("회원가입이 완료되었습니다. 로그인해주세요.");
    setMode("login");
  };

  const signIn = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("이메일 또는 비밀번호를 확인해주세요.");
      return;
    }

    alert("로그인되었습니다.");
    window.location.href = "/";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #050505 0%, #111 45%, #2a2114 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "36px 18px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "rgba(255,255,255,0.06)",
          padding: "42px 28px",
          borderRadius: "30px",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 30px 90px rgba(0,0,0,0.4)",
          backdropFilter: "blur(18px)",
        }}
      >
        <a
          href="/"
          style={{
            color: "#b99b63",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 900,
          }}
        >
          ← 홈으로 돌아가기
        </a>

        <p
          style={{
            marginTop: "34px",
            marginBottom: "12px",
            color: "#b99b63",
            fontSize: "12px",
            fontWeight: 900,
            letterSpacing: "5px",
          }}
        >
          AETHER MEMBERS
        </p>

        <h1
          style={{
            fontSize: "42px",
            margin: 0,
            marginBottom: "14px",
            fontWeight: 950,
            letterSpacing: "-1.5px",
          }}
        >
          {mode === "login" ? "로그인" : "회원가입"}
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: "14px",
            lineHeight: "1.8",
            marginBottom: "30px",
          }}
        >
          AETHER 회원 전용 서비스를 이용해보세요.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mode === "login" ? signIn() : signUp();
          }}
          style={{ display: "grid", gap: "14px" }}
        >
          <input
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {mode === "login" ? "로그인" : "회원가입"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            style={subButtonStyle}
          >
            {mode === "login"
              ? "아직 회원이 아니신가요?"
              : "이미 계정이 있으신가요?"}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  height: "56px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.35)",
  color: "#fff",
  fontSize: "15px",
  padding: "0 20px",
  outline: "none",
  fontWeight: 700,
};

const buttonStyle = {
  height: "58px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  border: "none",
  fontSize: "16px",
  fontWeight: 950,
  cursor: "pointer",
  marginTop: "8px",
};

const subButtonStyle = {
  height: "54px",
  borderRadius: "999px",
  background: "transparent",
  color: "#b99b63",
  border: "1px solid rgba(185,155,99,0.45)",
  fontSize: "14px",
  fontWeight: 900,
  cursor: "pointer",
};