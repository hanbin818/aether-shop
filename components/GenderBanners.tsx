export default function GenderBanners() {
  return (
    <section className="gender-section">
      <div className="gender-card men">
        <div>
          <p>MEN</p>
          <h2>남성 컬렉션</h2>
          <a href="/men">바로가기</a>
        </div>
      </div>

      <div className="gender-card women">
        <div>
          <p>WOMEN</p>
          <h2>여성 컬렉션</h2>
          <a href="/women">바로가기</a>
        </div>
      </div>

      <style jsx>{`
        .gender-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          padding: 50px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .gender-card {
          height: 360px;
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 34px;
          color: white;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .gender-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.65)
          );
        }

        .gender-card > div {
          position: relative;
          z-index: 1;
        }

        .men {
          background-image: url("https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1400&auto=format&fit=crop");
        }

        .women {
          background-image: url("https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop");
        }

        .gender-card p {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .gender-card h2 {
          font-size: 32px;
          margin-bottom: 18px;
        }

        .gender-card a {
          display: inline-block;
          color: #111;
          background: white;
          text-decoration: none;
          padding: 11px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .gender-section {
            grid-template-columns: 1fr;
            padding: 34px 16px;
            gap: 14px;
          }

          .gender-card {
            height: 230px;
            border-radius: 18px;
            padding: 24px;
          }

          .gender-card h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </section>
  );
}