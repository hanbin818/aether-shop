export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-card">
        <p className="label">AETHER OFFICIAL</p>

        <h1>AETHER</h1>

        <p className="subtitle">Premium Luxury Select Shop</p>

        <h2>
          카카오톡 채널 추가 시
          <br />
          전품목 10% 할인
        </h2>

        <p className="desc">
          최신 입고 소식 · 상시 이벤트 · 할인 혜택을
          <br />
          AETHER 카카오톡 채널에서 가장 먼저 만나보세요.
        </p>

        <div className="button-group">
          <a
            href="https://pf.kakao.com/_FvxexfX"
            target="_blank"
            rel="noopener noreferrer"
            className="kakao-button"
          >
            카카오톡 채널 바로가기
          </a>

          <a href="/home" className="enter-button">
            홈페이지 입장
          </a>
        </div>

        <p className="bottom-text">상시 이벤트 진행중</p>
      </section>

      <style>{`
        .landing-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(214, 177, 92, 0.22), transparent 34%),
            radial-gradient(circle at bottom, rgba(255, 255, 255, 0.08), transparent 30%),
            linear-gradient(145deg, #030303 0%, #111 48%, #050505 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          color: #fff;
          overflow: hidden;
        }

        .landing-card {
          width: min(92vw, 520px);
          min-height: 640px;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.035);
          box-shadow: 0 40px 120px rgba(0,0,0,0.55);
          backdrop-filter: blur(18px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 52px 34px;
          position: relative;
        }

        .landing-card::before {
          content: "";
          position: absolute;
          inset: 18px;
          border-radius: 26px;
          border: 1px solid rgba(214,177,92,0.22);
          pointer-events: none;
        }

        .label {
          margin: 0 0 22px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 4px;
          color: #d6b15c;
        }

        h1 {
          margin: 0;
          font-size: clamp(52px, 12vw, 82px);
          font-weight: 950;
          letter-spacing: 12px;
          line-height: 1;
        }

        .subtitle {
          margin: 16px 0 38px;
          font-size: 13px;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.58);
          font-weight: 800;
        }

        h2 {
          margin: 0;
          font-size: clamp(28px, 7vw, 42px);
          line-height: 1.35;
          font-weight: 950;
          letter-spacing: -1px;
          color: #f2d27b;
        }

        .desc {
          margin: 24px 0 34px;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,0.74);
          font-weight: 700;
          word-break: keep-all;
        }

        .button-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .button-group a {
          height: 54px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 15px;
          font-weight: 950;
        }

        .kakao-button {
          background: #fee500;
          color: #111;
          box-shadow: 0 16px 36px rgba(254,229,0,0.22);
        }

        .enter-button {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.18);
        }

        .bottom-text {
          margin: 26px 0 0;
          font-size: 12px;
          color: rgba(255,255,255,0.48);
          letter-spacing: 2px;
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .landing-card {
            min-height: 560px;
            padding: 42px 24px;
            border-radius: 28px;
          }

          h1 {
            letter-spacing: 8px;
          }

          .subtitle {
            font-size: 11px;
            letter-spacing: 2px;
          }

          .desc {
            font-size: 13px;
          }
        }
      `}</style>
    </main>
  );
}