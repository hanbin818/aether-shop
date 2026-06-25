"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90",
    label: "AETHER SPECIAL",
    title: "LUXURY SELECT",
    subtitle: "프리미엄 명품 셀렉션",
    href: "/products",
    button: "바로 확인하기",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=90",
    label: "NEW ARRIVALS",
    title: "NEW COLLECTION",
    subtitle: "새롭게 도착한 스타일",
    href: "/products?sort=new",
    button: "신상품 보기",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=90",
    label: "BEST ITEM",
    title: "TIMELESS STYLE",
    subtitle: "오래도록 빛나는 선택",
    href: "/products",
    button: "베스트 보기",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg" />

      <div className="hero-content">
        <p className="hero-label">{slide.label}</p>
        <h1>{slide.title}</h1>
        <p className="hero-subtitle">{slide.subtitle}</p>

        <a href={slide.href} className="hero-button">
          {slide.button}
        </a>
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
          height: 520px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: #111;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.38)),
            url(${slide.image});
          background-size: cover;
          background-position: center;
          transform: scale(1.02);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 22px;
          max-width: 720px;
        }

        .hero-label {
          margin: 0 0 14px;
          color: #fff;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 6px;
        }

        .hero h1 {
          margin: 0;
          font-size: 64px;
          line-height: 0.95;
          font-weight: 950;
          letter-spacing: -3px;
        }

        .hero-subtitle {
          margin: 20px 0 0;
          font-size: 24px;
          font-weight: 850;
          word-break: keep-all;
        }

        .hero-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 28px;
          height: 52px;
          padding: 0 34px;
          border-radius: 999px;
          background: #fff;
          color: #111;
          text-decoration: none;
          font-size: 15px;
          font-weight: 950;
          box-shadow: 0 18px 40px rgba(0,0,0,0.18);
        }

        .dots {
          position: absolute;
          z-index: 3;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .dots button {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          border: none;
          background: #fff;
          opacity: 0.42;
          cursor: pointer;
        }

        .dots button.active {
          width: 28px;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .hero {
            height: 430px;
          }

          .hero h1 {
            font-size: 42px;
            letter-spacing: -1.5px;
          }

          .hero-subtitle {
            font-size: 18px;
          }

          .hero-button {
            height: 48px;
            padding: 0 28px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}