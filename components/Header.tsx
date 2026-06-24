"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const handleSearch = () => {
    if (!search.trim()) return;
    window.location.href = `/products?search=${encodeURIComponent(search)}`;
  };

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
        background: scrolled ? "rgba(255,255,255,0.9)" : "#fff",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "18px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "#111",
              fontSize: "36px",
              fontWeight: 950,
              letterSpacing: "9px",
            }}
          >
            AETHER
          </a>
        </div>

        <nav
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "6px",
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
            padding: "14px 0",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          {[
            ["전체상품", "/products"],
            ["남성", "/men"],
            ["여성", "/women"],
            ["주문조회", "/order"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                textDecoration: "none",
                color: "#111",
                fontWeight: 850,
                fontSize: "14px",
                letterSpacing: "-0.2px",
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="브랜드 또는 상품명을 검색하세요"
            style={{
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
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              width: "78px",
              height: "48px",
              borderRadius: "999px",
              background: "#111",
              color: "#fff",
              border: "none",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            검색
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "18px",
          }}
        >
          <a href="/login" style={bottomLinkStyle}>
            로그인
          </a>
          <a href="/cart" style={bottomLinkStyle}>
            장바구니
          </a>
        </div>
      </div>
    </header>
  );
}

const bottomLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontSize: "13px",
  fontWeight: 850,
};