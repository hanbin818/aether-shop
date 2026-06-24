"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

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
    <main style={pageStyle}>
      <section style={cardStyle}>
        <a href="/" style={backStyle}>
          ← 홈으로 돌아가기
        </a>

        <p style={labelStyle}>AETHER MEMBERS</p>

        <h1 style={titleStyle}>마이페이지</h1>

        <p style={descStyle}>
          안녕하세요.
          <br />
          <strong style={{ color: "#111" }}>{email}</strong> 님의 회원 공간입니다.
        </p>

        <div style={menuGridStyle}>
          <a href="/order" style={menuCardStyle}>
            <span style={iconStyle}>📦</span>
            <strong style={menuTitleStyle}>주문조회</strong>
            <p style={menuTextStyle}>주문 상태를 확인하세요.</p>
          </a>

          <div style={menuCardStyle}>
            <span style={iconStyle}>❤️</span>
            <strong style={menuTitleStyle}>찜한 상품</strong>
            <p style={menuTextStyle}>곧 추가될 예정입니다.</p>
          </div>

          <div style={menuCardStyle}>
            <span style={iconStyle}>🕒</span>
            <strong style={menuTitleStyle}>최근 본 상품</strong>
            <p style={menuTextStyle}>곧 추가될 예정입니다.</p>
          </div>

          <div style={menuCardStyle}>
            <span style={iconStyle}>⚙️</span>
            <strong style={menuTitleStyle}>회원정보</strong>
            <p style={menuTextStyle}>{email}</p>
          </div>
        </div>

        <button onClick={logout} style={logoutButtonStyle}>
          로그아웃
        </button>
      </section>
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

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fff 0%, #f7f1e8 100%)",
  color: "#111",
  padding: "54px 16px 80px",
};

const cardStyle = {
  maxWidth: "720px",
  margin: "0 auto",
  background: "rgba(255,255,255,0.94)",
  borderRadius: "32px",
  padding: "34px 22px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 26px 80px rgba(0,0,0,0.09)",
};

const backStyle = {
  display: "inline-block",
  color: "#9b8b73",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 900,
  marginBottom: "34px",
};

const labelStyle = {
  margin: 0,
  marginBottom: "12px",
  color: "#9b8b73",
  fontSize: "11px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const titleStyle = {
  fontSize: "40px",
  margin: 0,
  marginBottom: "16px",
  fontWeight: 950,
  letterSpacing: "-1.4px",
};

const descStyle = {
  color: "#666",
  fontSize: "15px",
  lineHeight: "1.8",
  marginBottom: "32px",
};

const menuGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "14px",
  marginBottom: "30px",
};

const menuCardStyle = {
  minHeight: "132px",
  padding: "20px 18px",
  borderRadius: "24px",
  background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
  border: "1px solid #eee",
  color: "#111",
  textDecoration: "none",
  boxShadow: "0 10px 28px rgba(0,0,0,0.04)",
};

const iconStyle = {
  display: "block",
  fontSize: "27px",
  marginBottom: "13px",
};

const menuTitleStyle = {
  display: "block",
  fontSize: "16px",
  fontWeight: 950,
  marginBottom: "7px",
};

const menuTextStyle = {
  margin: 0,
  color: "#777",
  fontSize: "13px",
  lineHeight: "1.5",
  wordBreak: "break-all" as const,
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
  boxShadow: "0 16px 34px rgba(0,0,0,0.18)",
};