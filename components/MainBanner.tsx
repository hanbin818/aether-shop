"use client";

import { useEffect, useState } from "react";

const banners = [
  "/banners/banner1.png",
  "/banners/banner2.png",
  "/banners/banner3.png",
  "/banners/banner4.png",
  "/banners/banner5.png",
  "/banners/banner6.png",
];

export default function MainBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="main-banner">
      {banners.map((image, index) => (
        <div
          key={image}
          className={`banner-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url("${image}")` }}
        />
      ))}

      <button
        type="button"
        className="arrow arrow-left"
        onClick={() =>
          setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
        }
        aria-label="이전 배너"
      >
        ‹
      </button>

      <button
        type="button"
        className="arrow arrow-right"
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        aria-label="다음 배너"
      >
        ›
      </button>

      <div className="banner-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === current ? "active" : ""}
            onClick={() => setCurrent(index)}
            aria-label={`배너 ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        .main-banner {
          position: relative;
          width: 100%;
          height: 430px;
          overflow: hidden;
          background: #f7f3ee;
        }

        .banner-slide {
          position: absolute;
          inset: 0;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 0.7s ease;
        }

        .banner-slide.active {
          opacity: 1;
          z-index: 1;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          width: 42px;
          height: 42px;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.9);
          font-size: 48px;
          font-weight: 200;
          cursor: pointer;
          line-height: 1;
        }

        .arrow-left {
          left: 18px;
        }

        .arrow-right {
          right: 18px;
        }

        .banner-dots {
          position: absolute;
          left: 50%;
          bottom: 26px;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 10px;
        }

        .banner-dots button {
          width: 42px;
          height: 3px;
          border: 0;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 0;
        }

        .banner-dots button.active {
          background: #fff;
        }

        @media (max-width: 768px) {
          .main-banner {
            height: 260px;
          }

          .arrow {
            font-size: 36px;
            width: 32px;
            height: 32px;
          }

          .arrow-left {
            left: 8px;
          }

          .arrow-right {
            right: 8px;
          }

          .banner-dots {
            bottom: 16px;
          }

          .banner-dots button {
            width: 26px;
          }
        }
      `}</style>
    </section>
  );
}