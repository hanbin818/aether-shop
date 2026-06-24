"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function MyPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        alert("로그인이 필요한 페이지입니다.");
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email || "");
      setLoading(false);
    };

    checkUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    alert("로그아웃되었습니다.");
    window.location.href = "/";
  };

  if (loading) {
    return <main style={centerStyle}>회원정보 확인 중...</main>;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fff 0%, #f8f3eb 100%)",
        color: "#111",
        padding: "70px 18px",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "30px",
          padding: "38px 24px",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.08)",
        }}
      >
        <a href="/" style={backStyle}>
          ← 홈으로 돌아가기
        </a>

        <p style={labelStyle}>AETHER MEMBERS</p>

        <h1 style={titleStyle}>마이페이지</h1>

        <p style={descStyle}>
          안녕하세요.
          <br />
          <strong>{email}</strong> 님의 회원 공간입니다.
        </p>

        <div style={menuGridStyle}>
          <a href="/order" style={menuCardStyle}>
            <span style={iconStyle}>📦</span>
            <strong>주문조회</strong>
            <p>주문 상태를 확인하세요.</p>
          </a>

          <div style={menuCardStyle}>
            <span style={iconStyle}>❤️</span>
            <strong>찜한 상품</strong>
            <p>곧 추가될 예정입니다.</p>
          </div>

          <div style={menuCardStyle}>
            <span style={iconStyle}>🕒</span>
            <strong>최근 본 상품</strong>
            <p>곧 추가될 예정입니다.</p>
          </div>

          <div style={menuCardStyle}>
            <span style={iconStyle}>⚙️</span>
            <strong>회원정보</strong>
            <p>{email}</p>
          </div>
        </div>

        <button onClick={logout} style={logoutButtonStyle}>
          로그아웃
        </button>
      </div>
    </main>
  );
}

const centerStyle = {
  minHeight: "100vh",
  background: "#fff",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
};

const backStyle = {
  color: "#9b8b73",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 900,
};

const labelStyle = {
  marginTop: "34px",
  marginBottom: "12px",
  color: "#9b8b73",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "5px",
};

const titleStyle = {
  fontSize: "42px",
  margin: 0,
  marginBottom: "16px",
  fontWeight: 950,
  letterSpacing: "-1.5px",
};

const descStyle = {
  color: "#666",
  fontSize: "15px",
  lineHeight: "1.8",
  marginBottom: "30px",
};

const menuGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "14px",
  marginBottom: "28px",
};

const menuCardStyle = {
  minHeight: "130px",
  padding: "20px",
  borderRadius: "22px",
  background: "#fafafa",
  border: "1px solid #eee",
  color: "#111",
  textDecoration: "none",
};

const iconStyle = {
  display: "block",
  fontSize: "28px",
  marginBottom: "12px",
};

const logoutButtonStyle = {
  width: "100%",
  height: "58px",
  borderRadius: "999px",
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 950,
  cursor: "pointer",
};