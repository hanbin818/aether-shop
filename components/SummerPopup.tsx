"use client";

import { useEffect, useState } from "react";

export default function SummerPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const closed = sessionStorage.getItem("aether-summer-popup-closed");

    if (!closed) {
      setShow(true);
    }
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("aether-summer-popup-closed", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="summer-popup">
        <button className="popup-close" onClick={closePopup}>
          ×
        </button>

        <div className="popup-content">
          <p className="popup-label">SUMMER SPECIAL EVENT</p>
          <h2>
            여름맞이 행사
            <br />
            전상품 <span>3+1</span>
          </h2>
          <p className="popup-desc">
            지금 AETHER에서 특별한 여름 혜택을 만나보세요.
          </p>

          <a href="/products" className="popup-button">
            상품 보러가기
          </a>
        </div>
      </div>

      <style>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .summer-popup {
          position: relative;
          width: min(92vw, 420px);
          min-height: 520px;
          border-radius: 26px;
          overflow: hidden;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.22),
              rgba(255,255,255,0.88)
            ),
            url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80");
          background-size: cover;
          background-position: center;
          box-shadow: 0 30px 90px rgba(0,0,0,0.35);
        }

        .popup-close {
          position: absolute;
          top: 14px;
          right: 16px;
          width: 34px;
          height: 34px;
          border: none;
          background: rgba(0,0,0,0.35);
          color: #fff;
          border-radius: 50%;
          font-size: 26px;
          line-height: 1;
          cursor: pointer;
          z-index: 2;
        }

        .popup-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 36px 28px;
          color: #0b2340;
        }

        .popup-label {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 14px;
        }

        .popup-content h2 {
          font-size: 42px;
          line-height: 1.22;
          margin: 0;
          font-weight: 950;
          letter-spacing: -1px;
        }

        .popup-content h2 span {
          color: #f97316;
          font-size: 54px;
        }

        .popup-desc {
          margin: 18px 0 28px;
          font-size: 14px;
          font-weight: 800;
          color: #222;
        }

        .popup-button {
          background: #111;
          color: #fff;
          text-decoration: none;
          padding: 15px 34px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 950;
          box-shadow: 0 12px 30px rgba(0,0,0,0.25);
        }

        @media (max-width: 768px) {
          .summer-popup {
            width: min(90vw, 360px);
            min-height: 460px;
            border-radius: 22px;
          }

          .popup-content h2 {
            font-size: 34px;
          }

          .popup-content h2 span {
            font-size: 46px;
          }

          .popup-desc {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}