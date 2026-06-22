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
        background: "#fff",
        color: "#111",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          background: "#050505",
          color: "#d8b46a",
          textAlign: "center",
          padding: "10px 12px",
          fontSize: "13px",
          letterSpacing: "1px",
          fontWeight: 700,
        }}
      >
        신규 회원 가입 시 10% 쿠폰 증정 &nbsp; | &nbsp; 무료배송 & 무료반품
      </div>

      <div
        style={{
          padding: "26px 18px 18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
          }}
        >
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              background: "transparent",
              color: "#111",
              fontSize: "28px",
              padding: 0,
              lineHeight: 1,
            }}
          >
            ☰
          </button>

          <a
            href="/"
            style={{
              color: "#111",
              textDecoration: "none",
              fontSize: "36px",
              fontWeight: 900,
              letterSpacing: "10px",
              lineHeight: 1,
            }}
          >
            AETHER
          </a>

          <a
            href="/cart"
            style={{
              color: "#111",
              textDecoration: "none",
              fontSize: "24px",
              position: "relative",
            }}
          >
            🛍️
          </a>
        </div>

        <nav
          style={{
            marginTop: "26px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            textAlign: "center",
            gap: "0",
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
            padding: "16px 0",
          }}
        >
          {[
            ["MEN", "/men"],
            ["WOMEN", "/women"],
            ["SHOP", "/products"],
            ["ORDER", "/order"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{
                color: "#111",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 900,
                letterSpacing: "3px",
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div
          style={{
            marginTop: "22px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "48px",
              border: "1px solid #ddd",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="상품 검색"
              style={{
                flex: 1,
                height: "100%",
                border: "none",
                outline: "none",
                padding: "0 18px",
                fontSize: "15px",
                color: "#111",
              }}
            />
          </div>

          <button
            onClick={handleSearch}
            style={{
              width: "78px",
              height: "48px",
              borderRadius: "999px",
              background: "#050505",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            검색
          </button>
        </div>

        <div
          style={{
            marginTop: "18px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <a
            href="/login"
            style={{
              color: "#111",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 900,
              letterSpacing: "3px",
            }}
          >
            LOGIN
          </a>

          <a
            href="/cart"
            style={{
              color: "#111",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 900,
              letterSpacing: "3px",
            }}
          >
            CART
          </a>
        </div>
      </div>
    </header>
  );
}