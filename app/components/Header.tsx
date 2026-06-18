"use client";

import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;

    window.location.href = `/products?search=${encodeURIComponent(search)}`;
  };

  return (
    <header style={headerStyle}>
      <a href="/" style={logoStyle}>
        AETHER
      </a>

      <div style={rightAreaStyle}>
        <nav style={navStyle}>
          <a href="/" style={navLinkStyle}>홈</a>
          <a href="/products" style={navLinkStyle}>스토어</a>
          <a href="/order-status" style={navLinkStyle}>주문확인</a>
          <a href="/cart" style={navLinkStyle}>장바구니 🛒</a>
          <a href="/login" style={navLinkStyle}>로그인</a>
        </nav>

        <div style={searchBoxStyle}>
          <input
            placeholder="상품 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            style={searchInputStyle}
          />

          <button onClick={handleSearch} style={searchButtonStyle}>
            검색
          </button>
        </div>
      </div>
    </header>
  );
}

const headerStyle = {
  background: "#111",
  padding: "18px 40px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  borderBottom: "1px solid #222",
  gap: "24px",
};

const logoStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "30px",
  fontWeight: "900",
  letterSpacing: "7px",
  whiteSpace: "nowrap" as const,
  lineHeight: "1",
  paddingTop: "4px",
};

const rightAreaStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-end",
  gap: "6px",
  marginLeft: "auto",
};

const navStyle = {
  display: "flex",
  gap: "22px",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "24px",
};

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "16px",
  lineHeight: "24px",
  whiteSpace: "nowrap" as const,
};

const searchBoxStyle = {
  display: "flex",
  alignItems: "center",
  background: "#fff",
  borderRadius: "999px",
  overflow: "hidden",
  flexShrink: 0,
  marginTop: "6px",
  height: "42px",
  width: "420px",
};

const searchInputStyle = {
  width: "320px",
  height: "42px",
  padding: "0 16px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  lineHeight: "42px",
  boxSizing: "border-box" as const,
};

const searchButtonStyle = {
  width: "100px",
  height: "42px",
  border: "none",
  background: "#fff",
  color: "#111",
  padding: "0",
  paddingBottom: "6px",
  cursor: "pointer",
  fontWeight: "900",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box" as const,
  whiteSpace: "nowrap" as const,
};