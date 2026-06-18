"use client";

import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    window.location.href = `/products?search=${encodeURIComponent(search)}`;
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <a href="/" className="header-logo">
          AETHER
        </a>

        <nav className="header-nav">
          <a href="/">홈</a>
          <a href="/products">스토어</a>
          <a href="/order-status">주문확인</a>
          <a href="/cart">장바구니</a>
          <a href="/login">로그인</a>
        </nav>
      </div>

      <div className="header-search">
        <input
          placeholder="상품 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
    </header>
  );
}