"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80",
    title: "AETHER",
    subtitle: "TIMELESS LUXURY",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80",
    title: "NEW COLLECTION",
    subtitle: "MODERN STYLE",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80",
    title: "PREMIUM SELECT",
    subtitle: "MEN & WOMEN",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

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
        height: "65vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.55)),url(${slides[current].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.8s",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#fff",
        }}
      >
        <p
          style={{
            letterSpacing: "6px",
            fontSize: "15px",
            marginBottom: "15px",
          }}
        >
          {slides[current].subtitle}
        </p>

        <h1
          style={{
            fontSize: "64px",
            margin: 0,
            fontWeight: 700,
          }}
        >
          {slides[current].title}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "40px",
          }}
        >
          {slides.map((_, index) => (
            <div
              key={index}
              style={{
                width: current === index ? "36px" : "10px",
                height: "10px",
                borderRadius: "20px",
                background: "#fff",
                opacity: current === index ? 1 : 0.4,
                transition: "0.4s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}