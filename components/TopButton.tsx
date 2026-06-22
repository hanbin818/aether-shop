"use client";

import { useEffect, useState } from "react";

export default function TopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollTop}
      style={{
        position: "fixed",
        right: "18px",
        bottom: "22px",
        width: "54px",
        height: "54px",
        borderRadius: "50%",
        background: "#111",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        fontSize: "12px",
        fontWeight: 900,
        letterSpacing: "1px",
        cursor: "pointer",
        zIndex: 2000,
      }}
      aria-label="맨 위로 이동"
    >
      TOP
    </button>
  );
}