"use client";

import { useEffect, useState } from "react";

export default function SummerPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const closePopup = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="kakao-popup">
        <button className="popup-close" onClick={closePopup}>
          ×
        </button>

        <div className="popup-content">
          <p className="popup-label">AETHER MEMBERSHIP EVENT</p>

          <h2>
            카카오톡 채널 추가하고
            <br />
            <span>전품목 10% 할인</span>
          </h2>

          <p className="popup-desc">
            신규 혜택, 할인 이벤트, 입고 소식을
            <br />
            AETHER 카카오톡 채널에서 가장 먼저 확인하세요.
          </p>

          <div className="popup-buttons">
            <a
              href="https://pf.kakao.com/_FvxexfX"
              target="_blank"
              rel="noopener noreferrer"
              className="popup-button primary"
            >
              카카오톡 채널 바로가기
            </a>

            <button className="popup-button secondary" onClick={closePopup}>
              홈페이지 들어가기
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .kakao-popup {
          position: relative;
          width: min(92vw, 430px);
          min-height: 520px;
          border-radius: 28px;
          overflow: hidden;
          background:
            radial-gradient(circle at top, rgba(255, 215, 120, 0.35), transparent 34%),
            linear-gradient(145deg, #080808 0%, #171717 48%, #050505 100%);
          box-shadow:
            0 35px 100px rgba(0,0,0,0.55),
            inset 0 0 0 1px rgba(255,255,255,0.12);
        }

        .kakao-popup::before {
          content: "";
          position: absolute;
          inset: 16px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.12);
          pointer-events: none;
        }

        .kakao-popup::after {
          content: "AETHER";
          position: absolute;
          left: 50%;
          top: 42px;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.06);
          font-size: 56px;
          font-weight: 950;
          letter-spacing: 8px;
          pointer-events: none;
        }

        .popup-close {
          position: absolute;
          top: 16px;
          right: 18px;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08);
          color: #fff;
          border-radius: 50%;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          z-index: 2;
        }

        .popup-content {
          position: relative;
          z-index: 1;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 44px 30px;
          color: #fff;
        }

        .popup-label {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 18px;
          color: #d9b76c;
        }

        .popup-content h2 {
          font-size: 31px;
          line-height: 1.35;
          margin: 0;
          font-weight: 950;
          letter-spacing: -1px;
        }

        .popup-content h2 span {
          color: #f3d083;
          font-size: 34px;
        }

        .popup-desc {
          margin: 22px 0 30px;
          font-size: 14px;
          line-height: 1.7;
          font-weight: 700;
          color: rgba(255,255,255,0.76);
        }

        .popup-buttons {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .popup-button {
          width: 100%;
          min-height: 50px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 950;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-button.primary {
          background: #f9df63;
          color: #111;
          border: none;
          box-shadow: 0 16px 36px rgba(249, 223, 99, 0.25);
        }

        .popup-button.secondary {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.18);
        }

        @media (max-width: 768px) {
          .kakao-popup {
            width: min(90vw, 360px);
            min-height: 470px;
            border-radius: 24px;
          }

          .popup-content {
            min-height: 470px;
            padding: 38px 24px;
          }

          .kakao-popup::after {
            font-size: 42px;
            letter-spacing: 6px;
          }

          .popup-content h2 {
            font-size: 25px;
          }

          .popup-content h2 span {
            font-size: 28px;
          }

          .popup-desc {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}