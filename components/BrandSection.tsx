const brands = [
  "LOUIS VUITTON",
  "GUCCI",
  "PRADA",
  "CHANEL",
  "DIOR",
  "HERMÈS",
  "CELINE",
  "LOEWE",
  "BALENCIAGA",
  "SAINT LAURENT",
];

export default function BrandSection() {
  const loopBrands = [...brands, ...brands];

  return (
    <section className="brand-section">
      <div className="brand-head">
        <p>DESIGNER BRANDS</p>
        <h2>인기 브랜드</h2>
        <span>
          AETHER가 엄선한 프리미엄 디자이너 브랜드를 한 곳에서 만나보세요.
        </span>
      </div>

      <div className="brand-marquee">
        <div className="brand-track">
          {loopBrands.map((brand, index) => (
            <a
              key={`${brand}-${index}`}
              href={`/products?search=${encodeURIComponent(brand)}`}
            >
              {brand}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .brand-section {
          background:
            radial-gradient(circle at top, rgba(216,195,159,0.18), transparent 34%),
            #111;
          color: #fff;
          padding: 92px 0;
          overflow: hidden;
        }

        .brand-head {
          max-width: 760px;
          margin: 0 auto 46px;
          text-align: center;
          padding: 0 18px;
        }

        .brand-head p {
          color: #d8c39f;
          letter-spacing: 5px;
          font-size: 12px;
          font-weight: 950;
          margin: 0 0 14px;
        }

        .brand-head h2 {
          font-size: clamp(38px, 6vw, 64px);
          font-weight: 950;
          margin: 0 0 18px;
          letter-spacing: -1.8px;
        }

        .brand-head span {
          display: block;
          color: rgba(255,255,255,0.68);
          font-size: 16px;
          line-height: 1.8;
          word-break: keep-all;
        }

        .brand-marquee {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 20px 0;
        }

        .brand-track {
          display: flex;
          width: max-content;
          gap: 18px;
          animation: brandSlide 26s linear infinite;
        }

        .brand-track:hover {
          animation-play-state: paused;
        }

        .brand-track a {
          min-width: 210px;
          height: 76px;
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.16);
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 950;
          letter-spacing: 1px;
          backdrop-filter: blur(10px);
          transition: 0.25s ease;
        }

        .brand-track a:hover {
          background: #fff;
          color: #111;
          transform: translateY(-3px);
        }

        @keyframes brandSlide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .brand-section {
            padding: 72px 0;
          }

          .brand-head {
            margin-bottom: 34px;
          }

          .brand-head h2 {
            font-size: 40px;
          }

          .brand-head span {
            font-size: 14px;
          }

          .brand-track {
            gap: 12px;
            animation-duration: 22s;
          }

          .brand-track a {
            min-width: 165px;
            height: 62px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}