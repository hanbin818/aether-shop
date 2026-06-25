import Header from "../components/Header";
import TopButton from "../components/TopButton";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CategoryIcons from "../components/CategoryIcons";
import BrandSection from "../components/BrandSection";
import NewArrivals from "../components/NewArrivals";
import BestItems from "../components/BestItems";
import GenderBanners from "../components/GenderBanners";

export default function Home() {
  return (
    <main className="home-page">
      <Header />

      <Hero />

      <section className="intro-section">
        <p className="section-label">LUXURY SELECT SHOP</p>
        <h1>
          감각적인 명품 셀렉션을
          <br />
          한 곳에서 만나보세요
        </h1>
        <p>
          AETHER는 남성·여성 프리미엄 패션 아이템을 엄선해 소개하는
          럭셔리 셀렉트샵입니다.
        </p>
      </section>

      <section className="premium-points">
        <div>
          <strong>01</strong>
          <h3>엄선된 셀렉션</h3>
          <p>트렌드와 클래식을 모두 담은 프리미엄 아이템만 선별합니다.</p>
        </div>

        <div>
          <strong>02</strong>
          <h3>상담 기반 주문</h3>
          <p>오픈채팅 상담을 통해 상품 확인과 결제 안내를 도와드립니다.</p>
        </div>

        <div>
          <strong>03</strong>
          <h3>프리미엄 무드</h3>
          <p>데일리룩부터 특별한 날까지 어울리는 고급스러운 스타일을 제안합니다.</p>
        </div>
      </section>

      <CategoryIcons />

      <BrandSection />

      <NewArrivals />

      <section className="banner-section">
        <p>CURATED FOR YOU</p>
        <h2>오늘의 추천 컬렉션</h2>
        <span>
          데일리 룩부터 특별한 날의 스타일링까지, AETHER가 엄선한 아이템을
          만나보세요.
        </span>
        <a href="/products">전체 상품 보기</a>
      </section>

      <section className="editorial-section">
        <div className="editorial-image" />

        <div className="editorial-text">
          <p className="section-label">AETHER EDITORIAL</p>
          <h2>
            조용하지만 확실한
            <br />
            럭셔리의 기준
          </h2>
          <p>
            AETHER는 과하게 드러나는 화려함보다, 오래 봐도 질리지 않는
            실루엣과 균형감 있는 스타일을 추구합니다.
          </p>
          <a href="/products">셀렉션 둘러보기</a>
        </div>
      </section>

      <BestItems />

      <GenderBanners />

      <section className="final-cta">
        <p className="section-label">READY TO SHOP</p>
        <h2>당신의 다음 스타일을 완성하세요</h2>
        <a href="/products">쇼핑 시작하기</a>
      </section>

      <Footer />

      <TopButton />

      <style>{`
        .home-page {
          background: #fff;
          color: #111;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .intro-section {
          padding: 78px 20px 54px;
          text-align: center;
          background: linear-gradient(180deg, #fff 0%, #faf7f1 100%);
        }

        .section-label {
          margin: 0 0 14px;
          color: #9b8b73;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 5px;
        }

        .intro-section h1 {
          margin: 0 0 18px;
          font-size: clamp(36px, 6vw, 68px);
          line-height: 1.14;
          font-weight: 950;
          letter-spacing: -2.4px;
        }

        .intro-section p:last-child {
          max-width: 660px;
          margin: 0 auto;
          color: #666;
          font-size: 16px;
          line-height: 1.9;
          word-break: keep-all;
        }

        .premium-points {
          max-width: 1120px;
          margin: 0 auto;
          padding: 34px 20px 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .premium-points div {
          background: #111;
          color: #fff;
          border-radius: 28px;
          padding: 30px;
          min-height: 190px;
          box-shadow: 0 24px 70px rgba(0,0,0,0.12);
        }

        .premium-points strong {
          color: #d8c59f;
          font-size: 13px;
          letter-spacing: 3px;
        }

        .premium-points h3 {
          margin: 28px 0 12px;
          font-size: 23px;
          font-weight: 950;
        }

        .premium-points p {
          margin: 0;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          font-size: 14px;
          word-break: keep-all;
        }

        .banner-section {
          margin: 58px auto;
          max-width: 1120px;
          padding: 82px 22px;
          border-radius: 38px;
          text-align: center;
          background:
            linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.72)),
            url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          color: #fff;
          box-shadow: 0 30px 90px rgba(0,0,0,0.18);
        }

        .banner-section p {
          margin: 0 0 14px;
          color: #d8c59f;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 5px;
        }

        .banner-section h2 {
          margin: 0 0 16px;
          font-size: clamp(36px, 6vw, 62px);
          font-weight: 950;
          letter-spacing: -1.8px;
        }

        .banner-section span {
          display: block;
          max-width: 620px;
          margin: 0 auto 30px;
          color: rgba(255,255,255,0.84);
          font-size: 16px;
          line-height: 1.9;
          word-break: keep-all;
        }

        .banner-section a,
        .editorial-text a,
        .final-cta a {
          display: inline-block;
          padding: 16px 34px;
          background: #fff;
          color: #111;
          border-radius: 999px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 950;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .banner-section a:hover,
        .editorial-text a:hover,
        .final-cta a:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.18);
        }

        .editorial-section {
          max-width: 1120px;
          margin: 70px auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: stretch;
        }

        .editorial-image {
          min-height: 520px;
          border-radius: 36px;
          background:
            linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.16)),
            url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80');
          background-size: cover;
          background-position: center;
          box-shadow: 0 26px 80px rgba(0,0,0,0.12);
        }

        .editorial-text {
          border-radius: 36px;
          padding: 54px;
          background: #f7f1e8;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .editorial-text h2 {
          margin: 0 0 22px;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.12;
          font-weight: 950;
          letter-spacing: -1.8px;
        }

        .editorial-text p:not(.section-label) {
          color: #666;
          line-height: 1.9;
          font-size: 16px;
          margin-bottom: 30px;
          word-break: keep-all;
        }

        .editorial-text a {
          background: #111;
          color: #fff;
          width: fit-content;
        }

        .final-cta {
          margin: 70px 20px 0;
          padding: 82px 20px;
          text-align: center;
          border-radius: 38px 38px 0 0;
          background: #111;
          color: #fff;
        }

        .final-cta h2 {
          margin: 0 0 28px;
          font-size: clamp(34px, 6vw, 62px);
          font-weight: 950;
          letter-spacing: -1.8px;
        }

        @media (max-width: 768px) {
          .intro-section {
            padding: 58px 18px 42px;
          }

          .intro-section h1 {
            font-size: 39px;
            letter-spacing: -1.8px;
          }

          .premium-points {
            grid-template-columns: 1fr;
            padding: 24px 16px 10px;
          }

          .premium-points div {
            min-height: auto;
            padding: 26px;
            border-radius: 24px;
          }

          .banner-section {
            margin: 38px 16px;
            padding: 70px 18px;
            border-radius: 28px;
          }

          .banner-section h2 {
            font-size: 39px;
          }

          .editorial-section {
            grid-template-columns: 1fr;
            margin: 48px auto;
            padding: 0 16px;
          }

          .editorial-image {
            min-height: 360px;
            border-radius: 28px;
          }

          .editorial-text {
            padding: 34px 24px;
            border-radius: 28px;
          }

          .editorial-text h2 {
            font-size: 38px;
          }

          .final-cta {
            margin: 48px 16px 0;
            padding: 66px 18px;
            border-radius: 28px 28px 0 0;
          }

          .final-cta h2 {
            font-size: 38px;
          }
        }
      `}</style>
    </main>
  );
}