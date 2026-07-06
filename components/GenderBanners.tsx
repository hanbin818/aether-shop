"use client";

export default function GenderBanners() {
  const banners = [
    {
      title: "MEN",
      subtitle: "남성 컬렉션",
      desc: "남성 상품과 공용 상품까지 함께 만나볼 수 있는 럭셔리 셀렉션입니다.",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=90",
      href: "/products?gender=men",
    },
    {
      title: "WOMEN",
      subtitle: "여성 컬렉션",
      desc: "여성 상품과 공용 상품까지 함께 만나볼 수 있는 프리미엄 셀렉션입니다.",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=90",
      href: "/products?gender=women",
    },
  ];

  return (
    <section className="gender-section">
      <div className="gender-head">
        <p>COLLECTION</p>
        <h2>MEN & WOMEN</h2>
        <span>공용 상품까지 함께 볼 수 있는 AETHER 컬렉션을 선택해보세요.</span>
      </div>

      <div className="gender-grid">
        {banners.map((banner) => (
          <a key={banner.title} href={banner.href} className="gender-card">
            <div
              className="gender-bg"
              style={{ backgroundImage: `url(${banner.image})` }}
            />

            <div className="gender-overlay" />

            <div className="gender-content">
              <p>{banner.subtitle}</p>
              <h3>{banner.title}</h3>
              <span>{banner.desc}</span>
              <strong>컬렉션 보기 →</strong>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .gender-section {
          background: linear-gradient(180deg, #fff 0%, #f7f2ea 100%);
          padding: 100px 18px;
          overflow: hidden;
        }

        .gender-head {
          max-width: 760px;
          margin: 0 auto 48px;
          text-align: center;
        }

        .gender-head p {
          color: #9b8b73;
          letter-spacing: 5px;
          font-size: 12px;
          font-weight: 950;
          margin: 0 0 14px;
        }

        .gender-head h2 {
          font-size: clamp(40px, 7vw, 68px);
          margin: 0;
          font-weight: 950;
          letter-spacing: -2px;
        }

        .gender-head span {
          display: block;
          margin-top: 18px;
          color: #666;
          font-size: 16px;
          line-height: 1.8;
        }

        .gender-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .gender-card {
          position: relative;
          min-height: 620px;
          border-radius: 38px;
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          display: flex;
          align-items: flex-end;
          box-shadow: 0 32px 90px rgba(0,0,0,0.18);
          background: #111;
        }

        .gender-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
        }

        .gender-card:hover .gender-bg {
          transform: scale(1.08);
        }

        .gender-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.78) 100%),
            linear-gradient(90deg, rgba(0,0,0,0.42), rgba(0,0,0,0.08));
        }

        .gender-content {
          position: relative;
          z-index: 2;
          padding: 46px;
          width: 100%;
        }

        .gender-content p {
          margin: 0;
          color: #d8c39f;
          letter-spacing: 4px;
          font-size: 12px;
          font-weight: 950;
        }

        .gender-content h3 {
          margin: 12px 0 14px;
          font-size: clamp(58px, 8vw, 92px);
          line-height: 0.9;
          font-weight: 950;
          letter-spacing: -4px;
        }

        .gender-content span {
          display: block;
          color: rgba(255,255,255,0.82);
          line-height: 1.8;
          max-width: 360px;
          margin-bottom: 28px;
          word-break: keep-all;
        }

        .gender-content strong {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 54px;
          padding: 0 30px;
          border-radius: 999px;
          background: #fff;
          color: #111;
          font-size: 15px;
          font-weight: 950;
          transition: 0.25s ease;
        }

        .gender-card:hover .gender-content strong {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.24);
        }

        @media (max-width: 768px) {
          .gender-section {
            padding: 72px 16px;
          }

          .gender-head {
            margin-bottom: 34px;
          }

          .gender-head h2 {
            font-size: 42px;
          }

          .gender-head span {
            font-size: 14px;
          }

          .gender-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .gender-card {
            min-height: 480px;
            border-radius: 30px;
          }

          .gender-content {
            padding: 34px 26px;
          }

          .gender-content h3 {
            font-size: 64px;
          }

          .gender-content span {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}