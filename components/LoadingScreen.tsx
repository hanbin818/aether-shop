"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 900);

    const hideTimer = setTimeout(() => {
      setHidden(true);
    }, 1350);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={visible ? "loading-screen" : "loading-screen fade-out"}>
      <div className="loading-logo">AETHER</div>
      <p>Luxury Select Shop</p>
      <span />

      <style>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background:
            radial-gradient(circle at center, rgba(216,195,159,0.16), transparent 34%),
            #0b0b0f;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          transition: opacity 0.45s ease, visibility 0.45s ease;
        }

        .loading-screen.fade-out {
          opacity: 0;
          visibility: hidden;
        }

        .loading-logo {
          font-size: clamp(42px, 8vw, 76px);
          font-weight: 950;
          letter-spacing: 14px;
          margin-bottom: 14px;
        }

        .loading-screen p {
          color: #d8c39f;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 4px;
          margin: 0 0 26px;
        }

        .loading-screen span {
          width: 120px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, #d8c39f, transparent);
          animation: loadingMove 1s ease-in-out infinite;
        }

        @keyframes loadingMove {
          0% {
            transform: scaleX(0.25);
            opacity: 0.35;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(0.25);
            opacity: 0.35;
          }
        }

        @media (max-width: 768px) {
          .loading-logo {
            font-size: 44px;
            letter-spacing: 9px;
          }

          .loading-screen p {
            font-size: 11px;
            letter-spacing: 3px;
          }
        }
      `}</style>
    </div>
  );
}