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
        borderBottom: "1px solid #ececec",
      }}
    >
      <div
        style={{
          padding: "18px",
        }}
      >
        {/* 로고 */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "22px",
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "#111",
              fontSize: "38px",
              fontWeight: 900,
              letterSpacing: "8px",
            }}
          >
            AETHER
          </a>
        </div>

        {/* 메뉴 */}
        <nav
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
            padding: "15px 0",
            textAlign: "center",
            marginBottom: "18px",
          }}
        >
          <a
            href="/products"
            style={{
              textDecoration: "none",
              color: "#111",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            전체상품
          </a>

          <a
            href="/men"
            style={{
              textDecoration: "none",
              color: "#111",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            남성
          </a>

          <a
            href="/women"
            style={{
              textDecoration: "none",
              color: "#111",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            여성
          </a>

          <a
            href="/order"
            style={{
              textDecoration: "none",
              color: "#111",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            주문조회
          </a>
        </nav>

        {/* 검색 */}
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="브랜드 또는 상품명을 검색하세요"
            style={{
              flex: 1,
              height: "46px",
              borderRadius: "999px",
              border: "1px solid #ddd",
              padding: "0 18px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              width: "74px",
              height: "46px",
              borderRadius: "999px",
              background: "#111",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            검색
          </button>
        </div>

        {/* 하단 메뉴 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "28px",
            marginTop: "18px",
          }}
        >
          <a
            href="/login"
            style={{
              textDecoration: "none",
              color: "#111",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            로그인
          </a>

          <a
            href="/cart"
            style={{
              textDecoration: "none",
              color: "#111",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            장바구니
          </a>
        </div>
      </div>
    </header>
  );
}