"use client";

import { useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";

export default function Header() {
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {
    if (!search.trim()) return;
    window.location.href = `/products?search=${encodeURIComponent(search)}`;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    alert("로그아웃되었습니다.");
    window.location.href = "/";
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: scrolled ? "rgba(255,255,255,0.86)" : "#fff",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: scrolled ? "0 16px 50px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div style={wrapStyle}>
        <div style={topStyle}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={menuButtonStyle}>
            {menuOpen ? "닫기" : "메뉴"}
          </button>

          <a href="/" style={logoStyle}>
            AETHER
          </a>

          <a href="/cart" style={cartMiniStyle}>
            장바구니
          </a>
        </div>

        <nav style={navStyle}>
          {[
            ["전체상품", "/products"],
            ["남성", "/men"],
            ["여성", "/women"],
            ["주문조회", "/order"],
          ].map(([label, href]) => (
            <a key={href} href={href} style={navLinkStyle}>
              {label}
            </a>
          ))}
        </nav>

        <div style={searchRowStyle}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="브랜드 또는 상품명을 검색하세요"
            style={searchInputStyle}
          />

          <button onClick={handleSearch} style={searchButtonStyle}>
            검색
          </button>
        </div>

        <div style={bottomStyle}>
          {isLoggedIn ? (
            <>
              <a href="/mypage" style={bottomLinkStyle}>
                마이페이지
              </a>

              <a href="/cart" style={bottomLinkStyle}>
                장바구니
              </a>

              <button onClick={logout} style={logoutButtonStyle}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <a href="/login" style={bottomLinkStyle}>
                로그인
              </a>

              <a href="/cart" style={bottomLinkStyle}>
                장바구니
              </a>
            </>
          )}
        </div>

        {menuOpen && (
          <div style={mobileMenuStyle}>
            <a href="/products" style={mobileMenuLinkStyle}>
              전체상품
            </a>
            <a href="/men" style={mobileMenuLinkStyle}>
              남성
            </a>
            <a href="/women" style={mobileMenuLinkStyle}>
              여성
            </a>
            <a href="/order" style={mobileMenuLinkStyle}>
              주문조회
            </a>
            {isLoggedIn ? (
              <>
                <a href="/mypage" style={mobileMenuLinkStyle}>
                  마이페이지
                </a>
                <button onClick={logout} style={mobileLogoutStyle}>
                  로그아웃
                </button>
              </>
            ) : (
              <a href="/login" style={mobileMenuLinkStyle}>
                로그인
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

const wrapStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "16px 16px 14px",
};

const topStyle = {
  display: "grid",
  gridTemplateColumns: "80px 1fr 80px",
  alignItems: "center",
};

const logoStyle = {
  textAlign: "center" as const,
  textDecoration: "none",
  color: "#111",
  fontSize: "clamp(28px, 5vw, 42px)",
  fontWeight: 950,
  letterSpacing: "9px",
};

const menuButtonStyle = {
  background: "none",
  border: "none",
  color: "#111",
  fontSize: "13px",
  fontWeight: 900,
  cursor: "pointer",
};

const cartMiniStyle = {
  textAlign: "right" as const,
  color: "#111",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 900,
};

const navStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "34px",
  borderTop: "1px solid #eee",
  borderBottom: "1px solid #eee",
  padding: "14px 0",
  marginTop: "16px",
};

const navLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontWeight: 900,
  fontSize: "14px",
};

const searchRowStyle = {
  maxWidth: "620px",
  margin: "16px auto 0",
  display: "flex",
  gap: "8px",
};

const searchInputStyle = {
  flex: 1,
  height: "48px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  padding: "0 18px",
  fontSize: "14px",
  outline: "none",
  background: "#fafafa",
  color: "#111",
  fontWeight: 700,
};

const searchButtonStyle = {
  width: "82px",
  height: "48px",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  border: "none",
  fontWeight: 950,
  cursor: "pointer",
};

const bottomStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "28px",
  marginTop: "16px",
  flexWrap: "wrap" as const,
};

const bottomLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontSize: "13px",
  fontWeight: 900,
};

const logoutButtonStyle = {
  background: "none",
  border: "none",
  color: "#111",
  fontSize: "13px",
  fontWeight: 900,
  cursor: "pointer",
};

const mobileMenuStyle = {
  marginTop: "16px",
  background: "#111",
  borderRadius: "22px",
  padding: "18px",
  display: "grid",
  gap: "12px",
};

const mobileMenuLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 900,
  padding: "10px 4px",
};

const mobileLogoutStyle = {
  textAlign: "left" as const,
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "15px",
  fontWeight: 900,
  padding: "10px 4px",
  cursor: "pointer",
};