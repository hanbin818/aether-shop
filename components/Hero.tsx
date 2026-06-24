"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=90",
    title: "AETHER",
    subtitle: "프리미엄 럭셔리 셀렉트샵",
    description: "감각적인 명품 패션을 한 곳에서 만나보세요.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=90",
    title: "NEW COLLECTION",
    subtitle: "새롭게 도착한 스타일",
    description: "가방, 의류, 지갑, 액세서리까지 엄선된 셀렉션.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=90",
    title: "PREMIUM SELECT",
    subtitle: "남성·여성 명품 패션",
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
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        minHeight: isMobile ? "620px" : "760px",
        backgroundImage: `linear-gradient(rgba(0,0,0,.34), rgba(0,0,0,.68)), url(${slides[current].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "90px 20px 70px" : "120px 40px",
        transition: "0.8s ease",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#fff",
          maxWidth: "820px",
        }}
      >
        <p
          style={{
            letterSpacing: isMobile ? "4px" : "7px",
            fontSize: isMobile ? "13px" : "15px",
            marginBottom: "18px",
            fontWeight: 800,
            color: "#e8d8bd",
          }}
        >
          {slides[current].subtitle}
        </p>

        <h1
          style={{
            fontSize: isMobile ? "48px" : "86px",
            margin: 0,
            fontWeight: 950,
            letterSpacing: isMobile ? "3px" : "8px",
            lineHeight: 1.05,
          }}
        >
          {slides[current].title}
        </h1>

        <p
          style={{
            marginTop: "22px",
            fontSize: isMobile ? "16px" : "20px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.88)",
            wordBreak: "keep-all",
          }}
        >
          {slides[current].description}
        </p>

        <a
          href="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "36px",
            width: isMobile ? "190px" : "220px",
            height: isMobile ? "54px" : "60px",
            borderRadius: "999px",
            background: "#fff",
            color: "#111",
            textDecoration: "none",
            fontSize: isMobile ? "15px" : "16px",
            fontWeight: 950,
            boxShadow: "0 18px 45px rgba(0,0,0,0.28)",
          }}
        >
          쇼핑하러 가기
        </a>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "42px",
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              style={{
                width: current === index ? "38px" : "10px",
                height: "10px",
                borderRadius: "20px",
                border: "none",
                background: "#fff",
                opacity: current === index ? 1 : 0.42,
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