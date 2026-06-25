"use client";

import { useEffect, useState } from "react";

const categories = [
  { icon: "👜", name: "가방", href: "/products?search=가방" },
  { icon: "👛", name: "지갑", href: "/products?search=지갑" },
  { icon: "👟", name: "신발", href: "/products?search=신발" },
  { icon: "💍", name: "액세서리", href: "/products?search=액세서리" },
  { icon: "⌚", name: "시계", href: "/products?search=시계" },
  { icon: "🔥", name: "베스트", href: "/products" },
  { icon: "⭐", name: "리뷰", href: "/products" },
  { icon: "✔", name: "정품검수", href: "/products" },
];

export default function CategoryIcons() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      style={{
        background: "#faf8f4",
        padding: isMobile ? "46px 0" : "70px 18px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#9b8b73",
            letterSpacing: "4px",
            fontWeight: 900,
            fontSize: "12px",
            marginBottom: "12px",
          }}
        >
          SHOP BY CATEGORY
        </p>

        <h2
          style={{
            textAlign: "center",
            fontSize: isMobile ? "32px" : "42px",
            fontWeight: 950,
            marginBottom: isMobile ? "26px" : "54px",
            letterSpacing: "-1px",
          }}
        >
          카테고리
        </h2>

        <div
          style={{
            display: "flex",
            gap: isMobile ? "12px" : "24px",
            overflowX: isMobile ? "auto" : "visible",
            padding: isMobile ? "0 18px 10px" : "0",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              style={{
                textDecoration: "none",
                color: "#111",
                flex: isMobile ? "0 0 auto" : "1 1 0",
              }}
            >
              <div
                style={{
                  width: isMobile ? "92px" : "auto",
                  height: isMobile ? "104px" : "auto",
                  background: "#fff",
                  borderRadius: isMobile ? "22px" : "28px",
                  padding: isMobile ? "15px 10px" : "30px 18px",
                  textAlign: "center",
                  border: "1px solid rgba(0,0,0,.05)",
                  boxShadow: "0 18px 45px rgba(0,0,0,.06)",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "46px" : "76px",
                    height: isMobile ? "46px" : "76px",
                    margin: isMobile ? "0 auto 10px" : "0 auto 18px",
                    borderRadius: "50%",
                    background: "linear-gradient(145deg,#ffffff,#f1f1f1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "24px" : "34px",
                    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
                  }}
                >
                  {category.icon}
                </div>

                <p
                  style={{
                    margin: 0,
                    fontWeight: 900,
                    fontSize: isMobile ? "13px" : "15px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {category.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}