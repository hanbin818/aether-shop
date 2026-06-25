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

  const findId = () => {
    alert("아이디는 가입하신 이메일 주소입니다.");
  };

  const findPassword = async () => {
    if (!email) {
      alert("비밀번호를 찾으려면 이메일을 먼저 입력해주세요.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("비밀번호 재설정 메일을 발송했습니다. 이메일을 확인해주세요.");
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <a href="/" className="back-link">
          ← 홈으로 돌아가기
        </a>

        <p className="label">AETHER MEMBERS</p>

        <h1>{mode === "login" ? "로그인" : "회원가입"}</h1>

        <p className="description">
          AETHER 회원 전용 서비스를 이용해보세요.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mode === "login" ? signIn() : signUp();
          }}
          className="login-form"
        >
          <input
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mode === "login" && (
            <label className="keep-login">
              <input type="checkbox" />
              <span>로그인 상태 유지</span>
            </label>
          )}

          <button type="submit" className="main-button">
            {mode === "login" ? "로그인" : "회원가입"}
          </button>

          {mode === "login" && (
            <div className="login-links">
              <button type="button" onClick={findId}>
                아이디 찾기
              </button>
              <span>|</span>
              <button type="button" onClick={findPassword}>
                비밀번호 찾기
              </button>
              <span>|</span>
              <button type="button" onClick={() => setMode("signup")}>
                회원가입
              </button>
            </div>
          )}

          {mode === "signup" && (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="sub-button"
            >
              이미 계정이 있으신가요? 로그인하기
            </button>
          )}
        </form>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          background: #fff;
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 36px 18px;
        }

        .login-card {
          width: 100%;
          max-width: 460px;
          padding: 20px;
          text-align: center;
        }

        .back-link {
          display: inline-block;
          margin-bottom: 56px;
          color: #777;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
        }

        .label {
          margin: 0 0 12px;
          color: #8b7b66;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 4px;
        }

        h1 {
          margin: 0 0 12px;
          font-size: 24px;
          font-weight: 950;
        }

        .description {
          margin: 0 0 48px;
          color: #777;
          font-size: 14px;
          line-height: 1.7;
        }

        .login-form {
          display: grid;
          gap: 22px;
        }

        .login-form input[type="text"],
        .login-form input[type="password"],
        .login-form > input {
          width: 100%;
          height: 54px;
          border: none;
          border-bottom: 1px solid #ddd;
          background: transparent;
          color: #111;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
          font-weight: 700;
        }

        .login-form input::placeholder {
          color: #aaa;
          font-weight: 700;
        }

        .keep-login {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-align: left;
        }

        .keep-login input {
          width: 15px;
          height: 15px;
          accent-color: #111;
        }

        .main-button {
          height: 58px;
          border-radius: 4px;
          background: #111;
          color: #fff;
          border: none;
          font-size: 16px;
          font-weight: 950;
          cursor: pointer;
          margin-top: 4px;
        }

        .login-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          color: #bbb;
          font-size: 13px;
          margin-top: 10px;
        }

        .login-links button {
          background: transparent;
          border: none;
          color: #777;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }

        .sub-button {
          height: 54px;
          border-radius: 999px;
          background: transparent;
          color: #111;
          border: 1px solid #ddd;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .login-page {
            align-items: flex-start;
            padding-top: 70px;
          }

          .back-link {
            margin-bottom: 44px;
          }

          .description {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </main>
  );
}