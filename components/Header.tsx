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
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <div className="notice-bar">
        AETHER 신규 컬렉션 업데이트 · 100,000원 이상 무료배송
      </div>

      <div className="header-wrap">
        <div className="utility-row">
          <div className="utility-left">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "닫기" : "전체메뉴"}
            </button>
          </div>

          <div className="utility-right">
            {isLoggedIn ? (
              <>
                <a href="/mypage">마이페이지</a>
                <button onClick={logout}>로그아웃</button>
              </>
            ) : (
              <a href="/login">로그인</a>
            )}

            <a href="/order">주문조회</a>
            <a href="/cart">장바구니</a>
          </div>
        </div>

        <div className="logo-row">
          <a href="/" className="logo">
            AETHER
          </a>
        </div>

        <div className="search-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="브랜드 또는 상품명을 검색하세요"
          />

          <button onClick={handleSearch}>검색</button>
        </div>

        <nav className="category-nav">
          <a href="/products">전체상품</a>
          <a href="/men">남성</a>
          <a href="/women">여성</a>
          <a href="/products?search=bag">가방</a>
          <a href="/products?search=wallet">지갑</a>
          <a href="/products?search=shoes">신발</a>
          <a href="/products?search=accessory">액세서리</a>
          <a href="/products?search=clothes">의류</a>
        </nav>

        {menuOpen && (
          <div className="mobile-menu">
            <a href="/products">전체상품</a>
            <a href="/men">남성</a>
            <a href="/women">여성</a>
            <a href="/products?search=bag">가방</a>
            <a href="/products?search=wallet">지갑</a>
            <a href="/products?search=shoes">신발</a>
            <a href="/products?search=accessory">액세서리</a>
            <a href="/products?search=clothes">의류</a>
            <a href="/order">주문조회</a>
            <a href="/cart">장바구니</a>

            {isLoggedIn ? (
              <>
                <a href="/mypage">마이페이지</a>
                <button onClick={logout}>로그아웃</button>
              </>
            ) : (
              <a href="/login">로그인</a>
            )}
          </div>
        )}
      </div>

      <style>{`
        .site-header {
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 999;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          transition: 0.25s ease;
        }

        .site-header.scrolled {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(18px);
          box-shadow: 0 16px 50px rgba(0,0,0,0.08);
        }

        .notice-bar {
          width: 100%;
          background: #111;
          color: #fff;
          text-align: center;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.5px;
          padding: 9px 12px;
        }

        .header-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 12px 16px 0;
        }

        .utility-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .utility-left button,
        .utility-right button {
          background: none;
          border: none;
          color: #111;
          font-size: 12px;
          font-weight: 950;
          cursor: pointer;
        }

        .utility-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .utility-right a,
        .utility-right button {
          text-decoration: none;
          color: #111;
          font-size: 12px;
          font-weight: 950;
        }

        .logo-row {
          text-align: center;
          padding: 10px 0 12px;
        }

        .logo {
          color: #111;
          text-decoration: none;
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 950;
          letter-spacing: 12px;
        }

        .search-row {
          max-width: 680px;
          margin: 0 auto 14px;
          display: flex;
          gap: 8px;
        }

        .search-row input {
          flex: 1;
          height: 48px;
          border-radius: 999px;
          border: 1px solid #ddd;
          padding: 0 18px;
          font-size: 14px;
          outline: none;
          background: #fafafa;
          color: #111;
          font-weight: 800;
        }

        .search-row button {
          width: 86px;
          height: 48px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          border: none;
          font-weight: 950;
          cursor: pointer;
        }

        .category-nav {
          display: flex;
          justify-content: center;
          gap: 28px;
          border-top: 1px solid #eee;
          padding: 15px 0;
          overflow-x: auto;
          white-space: nowrap;
        }

        .category-nav a {
          text-decoration: none;
          color: #111;
          font-weight: 950;
          font-size: 14px;
        }

        .mobile-menu {
          margin: 0 0 14px;
          background: #111;
          border-radius: 22px;
          padding: 18px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .mobile-menu a,
        .mobile-menu button {
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 950;
          padding: 10px 4px;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .notice-bar {
            font-size: 11px;
            padding: 8px 10px;
          }

          .header-wrap {
            padding: 10px 14px 0;
          }

          .utility-right {
            gap: 12px;
          }

          .utility-right a,
          .utility-right button,
          .utility-left button {
            font-size: 11px;
          }

          .logo {
            font-size: 36px;
            letter-spacing: 8px;
          }

          .search-row {
            margin-bottom: 12px;
          }

          .search-row input {
            height: 46px;
            font-size: 13px;
          }

          .search-row button {
            width: 74px;
            height: 46px;
          }

          .category-nav {
            justify-content: flex-start;
            gap: 22px;
            padding: 14px 2px;
          }

          .category-nav::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}