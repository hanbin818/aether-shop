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

      <nav style={navStyle}>
        <a href="/" style={navLinkStyle}>홈</a>
        <a href="/products" style={navLinkStyle}>스토어</a>
        <a href="/order-status" style={navLinkStyle}>주문확인</a>
        <a href="/cart" style={navLinkStyle}>장바구니</a>
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
    </header>
  );
}

const headerStyle = {
  background: "#111",
  padding: "24px 20px",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "18px",
  borderBottom: "1px solid #222",
  width: "100%",
  overflow: "hidden",
};

const logoStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "36px",
  fontWeight: "900",
  letterSpacing: "8px",
  lineHeight: "1",
};

const navStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "18px",
  flexWrap: "wrap" as const,
  width: "100%",
};

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "14px",
  whiteSpace: "nowrap" as const,
};

const searchBoxStyle = {
  display: "flex",
  alignItems: "center",
  background: "#fff",
  borderRadius: "999px",
  overflow: "hidden",
  width: "100%",
  maxWidth: "420px",
  height: "48px",
};

const searchInputStyle = {
  flex: 1,
  minWidth: 0,
  height: "48px",
  padding: "0 18px",
  border: "none",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box" as const,
};

const searchButtonStyle = {
  width: "76px",
  height: "48px",
  border: "none",
  background: "#fff",
  color: "#111",
  margin: 0,
  padding: 0,
  cursor: "pointer",
  fontWeight: "900",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box" as const,
  whiteSpace: "nowrap" as const,
};