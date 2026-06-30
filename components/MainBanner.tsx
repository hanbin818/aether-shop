"use client";

import Image from "next/image";
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

  const prevBanner = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextBanner = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(nextBanner, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="main-banner">
      {banners.map((image, index) => (
        <div
          key={image}
          className={`banner-slide ${index === current ? "active" : ""}`}
        >
          <Image
            src={image}
            alt={`AETHER 메인 배너 ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="banner-image"
          />
        </div>
      ))}

      <button type="button" className="arrow arrow-left" onClick={prevBanner}>
        ‹
      </button>

      <button type="button" className="arrow arrow-right" onClick={nextBanner}>
        ›
      </button>

      <div className="banner-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === current ? "active" : ""}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      <style>{`
        .main-banner {
          position: relative;
          width: 100%;
          height: 450px;
          overflow: hidden;
          background: #f6f1eb;
        }

        .banner-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.75s ease;
          z-index: 0;
        }

        .banner-slide.active {
          opacity: 1;
          z-index: 1;
        }

        .banner-image {
          object-fit: contain;
          object-position: center;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          width: 42px;
          height: 42px;
          border: 0;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.12);
          color: #fff;
          font-size: 42px;
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
          bottom: 22px;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 9px;
        }

        .banner-dots button {
          width: 40px;
          height: 4px;
          border: 0;
          border-radius: 999px;
          background: rgba(255,255,255,0.55);
          cursor: pointer;
          padding: 0;
        }

        .banner-dots button.active {
          background: #fff;
        }

        @media (max-width: 768px) {
          .main-banner {
            height: 250px;
            background: #f6f1eb;
          }

          .banner-image {
            object-fit: contain;
            object-position: center;
          }

          .arrow {
            width: 30px;
            height: 30px;
            font-size: 30px;
            background: rgba(0, 0, 0, 0.08);
          }

          .arrow-left {
            left: 8px;
          }

          .arrow-right {
            right: 8px;
          }

          .banner-dots {
            bottom: 12px;
            gap: 6px;
          }

          .banner-dots button {
            width: 26px;
            height: 3px;
          }
        }
      `}</style>
    </section>
  );
}