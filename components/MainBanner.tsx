"use client";

import { useEffect, useState } from "react";

const banners = [
  {
    image: "/banners/banner1.jpg",
    label: "AETHER SPECIAL",
    title: "LUXURY SELECT",
    desc: "프리미엄 명품 셀렉션",
  },
  {
    image: "/banners/banner2.jpg",
    label: "SUMMER EVENT",
    title: "SEASON SALE",
    desc: "여름맞이 특별 혜택",
  },
  {
    image: "/banners/banner3.jpg",
    label: "NEW COLLECTION",
    title: "NEW ARRIVALS",
    desc: "새롭게 입고된 프리미엄 아이템",
  },
  {
    image: "/banners/banner4.jpg",
    label: "AETHER PICK",
    title: "DAILY LUXURY",
    desc: "매일 즐기는 감각적인 스타일",
  },
  {
    image: "/banners/banner5.jpg",
    label: "PREMIUM STYLE",
    title: "MODERN LOOK",
    desc: "고급스러운 데일리 셀렉션",
  },
  {
    image: "/banners/banner6.jpg",
    label: "LIMITED BENEFIT",
    title: "SPECIAL OFFER",
    desc: "지금만 만나는 특별한 혜택",
  },
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
      {banners.map((banner, index) => (
        <div
          key={banner.image}
          className={`banner-slide ${index === current ? "active" : ""}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.42)), url(${banner.image})`,
          }}
        >
          <div className="banner-content">
            <p>{banner.label}</p>
            <h1>{banner.title}</h1>
            <span>{banner.desc}</span>
          </div>
        </div>
      ))}

      <div className="banner-dots">
        {banners.map((_, index) => (
          <button
            key={index}
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
          background: #111;
        }

        .banner-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.03);
          transition: opacity 0.8s ease, transform 1.8s ease;
        }

        .banner-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 1;
        }

        .banner-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          padding: 0 20px;
        }

        .banner-content p {
          margin: 0 0 16px;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 8px;
        }

        .banner-content h1 {
          margin: 0 0 18px;
          font-size: clamp(42px, 7vw, 78px);
          line-height: 1;
          font-weight: 950;
          letter-spacing: -2px;
        }

        .banner-content span {
          font-size: 18px;
          font-weight: 800;
        }

        .banner-dots {
          position: absolute;
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 10px;
        }

        .banner-dots button {
          width: 42px;
          height: 3px;
          border: 0;
          background: rgba(255,255,255,0.45);
          cursor: pointer;
          padding: 0;
        }

        .banner-dots button.active {
          background: #fff;
        }

        @media (max-width: 768px) {
          .main-banner {
            height: 360px;
          }

          .banner-content p {
            font-size: 11px;
            letter-spacing: 5px;
          }

          .banner-content h1 {
            font-size: 42px;
          }

          .banner-content span {
            font-size: 14px;
          }

          .banner-dots button {
            width: 28px;
          }
        }
      `}</style>
    </section>
  );
}