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
          padding: "18px 18px 18px",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <a
            href="/"
            style={{
              color: "#111",
              textDecoration: "none",
              fontSize: "38px",
              fontWeight: 900,
              letterSpacing: "10px",
              lineHeight: 1,
            }}
          >
            AETHER
          </a>
        </div>

        <nav
          style={{
            marginTop: "24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            textAlign: "center",
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
            padding: "15px 0",
          }}
        >
          {[
            ["SHOP", "/products"],
            ["MEN", "/men"],
            ["WOMEN", "/women"],
            ["ORDER", "/order"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{
                color: "#111",
                textDecoration: "none",
                fontSize: "13px",
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
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
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
              height: "44px",
              border: "1px solid #ddd",
              outline: "none",
              borderRadius: "999px",
              padding: "0 16px",
              fontSize: "14px",
              color: "#111",
              background: "#fff",
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              width: "70px",
              height: "44px",
              borderRadius: "999px",
              background: "#050505",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            검색
          </button>
        </div>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "center",
            gap: "18px",
          }}
        >
          <a
            href="/login"
            style={{
              color: "#111",
              textDecoration: "none",
              fontSize: "13px",
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
              fontSize: "13px",
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