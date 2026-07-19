"use client";

import { useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";

const categoryLinks = [
  { name: "전체상품", href: "/products" },
  { name: "남성", href: "/men" },
  { name: "여성", href: "/women" },
  { name: "가방", href: "/products?category=bag" },
  { name: "클러치", href: "/products?category=clutch" },
  { name: "지갑", href: "/products?category=wallet" },

  // 의류 카테고리
  {
    name: "남성의류",
    href: "/products?category=clothing&gender=men",
  },
  {
    name: "여성의류",
    href: "/products?category=clothing&gender=women",
  },

  { name: "신발", href: "/products?category=shoes" },
  { name: "시계", href: "/products?category=watch" },
  { name: "액세서리", href: "/products?category=accessory" },
  { name: "선글라스", href: "/products?category=sunglasses" },
];

export default function Header() {
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) return;

    window.location.href = `/products?search=${encodeURIComponent(
      trimmedSearch
    )}`;
  };

  const handleLogoClick = () => {
    localStorage.removeItem("aether-popup-closed");
    localStorage.removeItem("aether-kakao-popup-closed");
    localStorage.removeItem("aether-kakao-popup-hide");
    localStorage.removeItem("aether-main-popup-closed");

    window.location.href = "/";
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("로그아웃 중 오류가 발생했습니다.");
      return;
    }

    alert("로그아웃되었습니다.");
    window.location.href = "/";
  };

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (isMounted) {
        setIsLoggedIn(!!data.user);
      }
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (isMounted) {
          setIsLoggedIn(!!session?.user);
        }
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <div className="notice-bar">
        <div className="notice-track">
          <span>✦ 카카오톡 채널 추가 시 전 품목 10% 할인</span>
          <span>✦ 포토리뷰 작성 시 10% 할인</span>
          <span>✦ 여름맞이 행사 전 상품 3+1</span>
          <span>✦ 카카오톡 채널 추가 시 전 품목 10% 할인</span>
          <span>✦ 포토리뷰 작성 시 10% 할인</span>
          <span>✦ 여름맞이 행사 전 상품 3+1</span>
        </div>

        <div className="notice-track">
          <span>✦ 카카오톡 채널 추가 시 전 품목 10% 할인</span>
          <span>✦ 포토리뷰 작성 시 10% 할인</span>
          <span>✦ 여름맞이 행사 전 상품 3+1</span>
          <span>✦ 카카오톡 채널 추가 시 전 품목 10% 할인</span>
          <span>✦ 포토리뷰 작성 시 10% 할인</span>
          <span>✦ 여름맞이 행사 전 상품 3+1</span>
        </div>
      </div>

      <div className="header-wrap">
        <div className="utility-row">
          <div className="utility-left">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? "닫기" : "전체메뉴"}
            </button>
          </div>

          <div className="utility-right">
            {isLoggedIn ? (
              <>
                <a href="/mypage">마이페이지</a>

                <button type="button" onClick={logout}>
                  로그아웃
                </button>
              </>
            ) : (
              <a href="/login">로그인</a>
            )}

            <a href="/order">주문조회</a>
            <a href="/cart">장바구니</a>
          </div>
        </div>

        <div className="logo-row">
          <button
            type="button"
            className="logo"
            onClick={handleLogoClick}
            aria-label="AETHER 메인으로 이동"
          >
            AETHER
          </button>
        </div>

        <div className="search-row">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="브랜드 또는 상품명을 검색하세요"
            aria-label="상품 검색"
          />

          <button type="button" onClick={handleSearch}>
            검색
          </button>
        </div>

        <nav className="category-nav" aria-label="상품 카테고리">
          {categoryLinks.map((category) => (
            <a key={category.name} href={category.href}>
              {category.name}
            </a>
          ))}
        </nav>

        {menuOpen && (
          <div className="mobile-menu">
            {categoryLinks.map((category) => (
              <a key={category.name} href={category.href}>
                {category.name}
              </a>
            ))}

            <a href="/order">주문조회</a>
            <a href="/cart">장바구니</a>

            {isLoggedIn ? (
              <>
                <a href="/mypage">마이페이지</a>

                <button type="button" onClick={logout}>
                  로그아웃
                </button>
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
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          transition: 0.25s ease;
        }

        .site-header.scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.08);
        }

        .notice-bar {
          width: 100%;
          height: 34px;
          background: #111;
          color: #fff;
          overflow: hidden;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        .notice-track {
          display: flex;
          align-items: center;
          min-width: max-content;
          animation: notice-marquee 42s linear infinite;
        }

        .notice-track span {
          display: inline-flex;
          align-items: center;
          padding: 0 24px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.2px;
        }

        @keyframes notice-marquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-100%);
          }
        }

        .header-wrap {
          max-width: 1280px;
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
          padding: 0;
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
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .search-row {
          max-width: 680px;
          margin: 0 auto 14px;
          display: flex;
          gap: 8px;
        }

        .search-row input {
          flex: 1;
          min-width: 0;
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

        .search-row input:focus {
          border-color: #111;
          background: #fff;
        }

        .search-row button {
          width: 86px;
          height: 48px;
          flex-shrink: 0;
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
          align-items: center;
          gap: 22px;
          border-top: 1px solid #eee;
          padding: 15px 0;
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
        }

        .category-nav::-webkit-scrollbar {
          display: none;
        }

        .category-nav a {
          flex-shrink: 0;
          text-decoration: none;
          color: #111;
          font-weight: 950;
          font-size: 14px;
          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .category-nav a:hover {
          opacity: 0.55;
          transform: translateY(-1px);
        }

        .mobile-menu {
          margin: 0 0 14px;
          background: #111;
          border-radius: 22px;
          padding: 18px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
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

        @media (max-width: 1100px) {
          .category-nav {
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .notice-bar {
            height: 32px;
          }

          .notice-track {
            animation-duration: 34s;
          }

          .notice-track span {
            font-size: 11px;
            padding: 0 18px;
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

          .logo-row {
            padding: 12px 0;
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
        }

        @media (max-width: 420px) {
          .utility-right {
            gap: 9px;
          }

          .utility-right a,
          .utility-right button,
          .utility-left button {
            font-size: 10px;
          }

          .logo {
            font-size: 32px;
            letter-spacing: 6px;
          }

          .mobile-menu {
            border-radius: 18px;
            padding: 15px;
            gap: 8px;
          }

          .mobile-menu a,
          .mobile-menu button {
            font-size: 14px;
          }
        }
      `}</style>
    </header>
  );
}