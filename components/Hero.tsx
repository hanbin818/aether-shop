"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    label: "AETHER COLLECTION",
    title: "당신만의\n럭셔리 스타일",
    description: "세계적인 브랜드를 한 곳에서.\nAETHER가 엄선한 프리미엄 컬렉션을 만나보세요.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80",
    link: "/products",
  },
  {
    label: "MEN COLLECTION",
    title: "세련된\n남성 컬렉션",
    description: "데일리부터 포멀까지.\nAETHER가 제안하는 남성 프리미엄 스타일.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80",
    link: "/men",
  },
  {
    label: "WOMEN COLLECTION",
    title: "우아한\n여성 컬렉션",
    description: "고급스러운 실루엣과 감각적인 무드.\nAETHER의 여성 셀렉션을 만나보세요.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80",
    link: "/women",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        minHeight: "520px",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.58)), url('${slide.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          maxWidth: "760px",
        }}
      >
        <p
          style={{
            fontSize: "15px",
            letterSpacing: "5px",
            opacity: 0.9,
            marginBottom: "16px",
            fontWeight: 700,
          }}
        >
          {slide.label}
        </p>

        <h1
          style={{
            fontSize: "clamp(42px,7vw,78px)",
            fontWeight: 900,
            letterSpacing: "8px",
            marginBottom: "18px",
            lineHeight: 1.1,
            whiteSpace: "pre-line",
          }}
        >
          {slide.title}
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "#f2f2f2",
            lineHeight: 1.8,
            marginBottom: "36px",
            whiteSpace: "pre-line",
          }}
        >
          {slide.description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <a
            href={slide.link}
            style={{
              padding: "16px 34px",
              background: "white",
              color: "#111",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 900,
              fontSize: "15px",
            }}
          >
            컬렉션 보기
          </a>

          <a
            href="/products"
            style={{
              padding: "16px 34px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "15px",
            }}
          >
            전체 상품 보기
          </a>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "9px",
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              style={{
                width: current === index ? "26px" : "9px",
                height: "9px",
                borderRadius: "999px",
                border: "none",
                background:
                  current === index ? "#fff" : "rgba(255,255,255,0.45)",
                cursor: "pointer",
                transition: "0.25s",
              }}
              aria-label={`${index + 1}번째 슬라이드`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}