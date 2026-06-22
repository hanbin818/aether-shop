"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const keyword = search.trim();

    if (!keyword) {
      router.push("/products");
      return;
    }

    router.push(`/products?search=${encodeURIComponent(keyword)}`);
  };

  return (
    <header
      style={{
        minHeight: "82px",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #ececec",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 40px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <a
        href="/"
        style={{
          textDecoration: "none",
          color: "#111",
          fontSize: "36px",
          fontWeight: "900",
          letterSpacing: "8px",
        }}
      >
        AETHER
      </a>

      <nav
        style={{
          display: "flex",
          gap: "28px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <a href="/men" style={navLinkStyle}>MEN</a>
        <a href="/women" style={navLinkStyle}>WOMEN</a>
        <a href="/products" style={navLinkStyle}>SHOP</a>
        <a href="/order-status" style={navLinkStyle}>ORDER</a>
      </nav>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="상품 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          style={{
            width: "180px",
            padding: "10px 14px",
            borderRadius: "999px",
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "14px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            border: "none",
            background: "#111",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          검색
        </button>

        <a href="/login" style={navLinkStyle}>LOGIN</a>
        <a href="/cart" style={cartLinkStyle}>CART</a>
      </div>
    </header>
  );
}

const navLinkStyle = {
  textDecoration: "none",
  color: "#111",
  fontSize: "13px",
  fontWeight: "800",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
};

const cartLinkStyle = {
  ...navLinkStyle,
  border: "1.5px solid #111",
  padding: "11px 18px",
  borderRadius: "999px",
};