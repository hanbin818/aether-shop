"use client";

import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    window.location.href = `/products?search=${encodeURIComponent(search)}`;
  };

  return (
    <header
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "14px 18px",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="/"
          style={{
            color: "#111",
            fontSize: "28px",
            fontWeight: 900,
            letterSpacing: "6px",
            textDecoration: "none",
          }}
        >
          AETHER
        </a>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <a href="/products" style={navLinkStyle}>전체상품</a>
          <a href="/men" style={navLinkStyle}>남성</a>
          <a href="/women" style={navLinkStyle}>여성</a>
          <a href="/products?search=bag" style={navLinkStyle}>가방</a>
          <a href="/products?search=clutch" style={navLinkStyle}>클러치</a>
          <a href="/products?search=wallet" style={navLinkStyle}>지갑</a>
          <a href="/products?search=shoes" style={navLinkStyle}>신발</a>
          <a href="/products?search=accessory" style={navLinkStyle}>액세서리</a>
          <a href="/products?search=sunglasses" style={navLinkStyle}>선글라스</a>
        </nav>

        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="브랜드 또는 상품 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            style={{
              flex: 1,
              height: "42px",
              borderRadius: "999px",
              border: "1px solid #ddd",
              padding: "0 16px",
              outline: "none",
              fontSize: "14px",
              color: "#111",
              background: "#fff",
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              width: "64px",
              height: "42px",
              borderRadius: "999px",
              border: "none",
              background: "#111",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            검색
          </button>

          <a href="/order" style={cartStyle}>주문조회</a>
          <a href="/cart" style={cartStyle}>장바구니</a>
        </div>
      </div>
    </header>
  );
}

const navLinkStyle = {
  color: "#111",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 900,
  letterSpacing: "1px",
  whiteSpace: "nowrap" as const,
};

const cartStyle = {
  color: "#111",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 900,
  border: "1.5px solid #111",
  padding: "12px 14px",
  borderRadius: "999px",
  whiteSpace: "nowrap" as const,
};