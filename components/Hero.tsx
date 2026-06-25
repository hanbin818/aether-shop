"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90",
    label: "AETHER COLLECTION",
    title: "LUXURY\nSELECTION",
    subtitle: "프리미엄 명품 셀렉트샵",
    description: "남성·여성 명품 패션을 감각적으로 큐레이션합니다.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=90",
    label: "NEW ARRIVALS",
    title: "NEW\nCOLLECTION",
    subtitle: "새롭게 도착한 스타일",
    description: "가방, 의류, 지갑, 액세서리까지 엄선된 셀렉션.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=90",
    label: "PREMIUM SELECT",
    title: "TIMELESS\nSTYLE",
    subtitle: "오래도록 빛나는 스타일",
    description: "AETHER가 제안하는 고급스러운 데일리 룩.",
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
    }, 4600);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      style={{
        width: "100%",
        minHeight: isMobile ? "690px" : "820px",
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.72), rgba(0,0,0,.36), rgba(0,0,0,.72)), url(${slide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "110px 20px 72px" : "130px 44px",
        transition: "0.9s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(0,0,0,0.38))",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "#fff",
          maxWidth: "980px",
        }}
      >
        <p
          style={{
            letterSpacing: isMobile ? "4px" : "8px",
            fontSize: isMobile ? "12px" : "13px",
            marginBottom: "18px",
            fontWeight: 950,
            color: "#d8c59f",
          }}
        >
          {slide.label}
        </p>

        <h1
          style={{
            whiteSpace: "pre-line",
            fontSize: isMobile ? "58px" : "112px",
            margin: 0,
            fontWeight: 950,
            letterSpacing: isMobile ? "-2px" : "-5px",
            lineHeight: 0.9,
          }}
        >
          {slide.title}
        </h1>

        <p
          style={{
            marginTop: "26px",
            fontSize: isMobile ? "18px" : "23px",
            fontWeight: 900,
            color: "#fff",
          }}
        >
          {slide.subtitle}
        </p>

        <p
          style={{
            margin: "14px auto 0",
            maxWidth: "620px",
            fontSize: isMobile ? "15px" : "17px",
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.78)",
            wordBreak: "keep-all",
          }}
        >
          {slide.description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "38px",
          }}
        >
          <a href="/products" style={primaryButtonStyle}>
            쇼핑하러 가기
          </a>

          <a href="/products?search=bag" style={secondaryButtonStyle}>
            컬렉션 보기
          </a>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "46px",
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              style={{
                width: current === index ? "42px" : "10px",
                height: "10px",
                borderRadius: "20px",
                border: "none",
                background: "#fff",
                opacity: current === index ? 1 : 0.38,
                transition: "0.4s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const primaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "190px",
  height: "58px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 950,
  boxShadow: "0 18px 45px rgba(0,0,0,0.28)",
};

const secondaryButtonStyle = {
  ...primaryButtonStyle,
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.42)",
  backdropFilter: "blur(10px)",
};