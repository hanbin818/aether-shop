"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90",
    label: "AETHER SPECIAL",
    title: "LUXURY SELECT",
    subtitle: "프리미엄 명품 셀렉션",
    description: "가방, 지갑, 의류, 액세서리까지 감각적인 아이템을 만나보세요.",
    href: "/products",
    button: "전체 상품 보기",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=90",
    label: "NEW ARRIVALS",
    title: "NEW COLLECTION",
    subtitle: "새롭게 도착한 스타일",
    description: "AETHER가 엄선한 신상품으로 매일의 스타일을 완성하세요.",
    href: "/products?sort=new",
    button: "신상품 보기",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=90",
    label: "BEST ITEM",
    title: "TIMELESS STYLE",
    subtitle: "오래도록 빛나는 선택",
    description: "과하지 않지만 확실한 존재감, AETHER의 베스트 셀렉션.",
    href: "/products",
    button: "베스트 보기",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="hero">
      <div className="hero-bg" />

      <div className="hero-content">
        <p className="hero-label">{slide.label}</p>

        <h1>{slide.title}</h1>

        <h2>{slide.subtitle}</h2>

        <p className="hero-desc">{slide.description}</p>

        <div className="hero-buttons">
          <a href={slide.href}> {slide.button}</a>
          <a href="/products?search=bag">가방 컬렉션</a>
        </div>

        <div className="quick-menu">
          <a href="/products?gender=MEN">MEN</a>
          <a href="/products?gender=WOMEN">WOMEN</a>
          <a href="/products?search=wallet">WALLET</a>
          <a href="/products?search=bag">BAG</a>
        </div>
      </div>

      <div className="dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={current === index ? "active" : ""}
          />
        ))}
      </div>

      <style>{`
        .hero {
          width: 100%;
          min-height: ${isMobile ? "720px" : "760px"};
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: ${isMobile ? "120px 20px 70px" : "130px 70px"};
          color: #fff;
          background: #111;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(90deg, rgba(0,0,0,0.78), rgba(0,0,0,0.38), rgba(0,0,0,0.18)),
            url(${slide.image});
          background-size: cover;
          background-position: center;
          transform: scale(1.03);
          transition: background-image 0.8s ease;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          text-align: ${isMobile ? "center" : "left"};
          margin: ${isMobile ? "0 auto" : "0"};
        }

        .hero-label {
          margin: 0 0 18px;
          color: #d8c59f;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 5px;
        }

        .hero h1 {
          margin: 0;
          font-size: ${isMobile ? "54px" : "92px"};
          line-height: 0.95;
          font-weight: 950;
          letter-spacing: ${isMobile ? "-2px" : "-4px"};
        }

        .hero h2 {
          margin: 24px 0 0;
          font-size: ${isMobile ? "22px" : "30px"};
          font-weight: 950;
        }

        .hero-desc {
          max-width: 520px;
          margin: 16px ${isMobile ? "auto" : "0"} 0;
          color: rgba(255,255,255,0.78);
          font-size: 16px;
          line-height: 1.8;
          word-break: keep-all;
        }

        .hero-buttons {
          display: flex;
          gap: 12px;
          margin-top: 34px;
          justify-content: ${isMobile ? "center" : "flex-start"};
          flex-wrap: wrap;
        }

        .hero-buttons a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
          height: 56px;
          padding: 0 24px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 950;
        }

        .hero-buttons a:first-child {
          background: #fff;
          color: #111;
        }

        .hero-buttons a:last-child {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.42);
          backdrop-filter: blur(10px);
        }

        .quick-menu {
          margin-top: 44px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          max-width: 560px;
        }

        .quick-menu a {
          height: 54px;
          border-radius: 18px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 950;
          backdrop-filter: blur(10px);
        }

        .dots {
          position: absolute;
          z-index: 3;
          left: ${isMobile ? "50%" : "70px"};
          bottom: 38px;
          transform: ${isMobile ? "translateX(-50%)" : "none"};
          display: flex;
          gap: 10px;
        }

        .dots button {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: none;
          background: #fff;
          opacity: 0.36;
          cursor: pointer;
          transition: 0.3s;
        }

        .dots button.active {
          width: 42px;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .quick-menu {
            grid-template-columns: repeat(2, 1fr);
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}