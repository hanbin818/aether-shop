import Header from "../../components/Header";
import TopButton from "../../components/TopButton";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import CategoryIcons from "../../components/CategoryIcons";
import BrandSection from "../../components/BrandSection";
import NewArrivals from "../../components/NewArrivals";
import BestItems from "../../components/BestItems";
import GenderBanners from "../../components/GenderBanners";
import SummerPopup from "../../components/SummerPopup";

export default function Home() {
  return (
    <main className="home-page">
      <Header />

      <SummerPopup />

      <Hero />

      <CategoryIcons />

      <NewArrivals />

      <BestItems />

      <GenderBanners />

      <BrandSection />

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
          padding: 64px 20px 58px;
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
          font-size: clamp(34px, 6vw, 58px);
          line-height: 1.14;
          font-weight: 950;
          letter-spacing: -2px;
        }

        .intro-section p:last-child {
          max-width: 660px;
          margin: 0 auto;
          color: #666;
          font-size: 16px;
          line-height: 1.9;
          word-break: keep-all;
        }

        @media (max-width: 768px) {
          .intro-section {
            padding: 46px 18px 42px;
          }

          .intro-section h1 {
            font-size: 32px;
            letter-spacing: -1.3px;
          }

          .intro-section p:last-child {
            font-size: 14px;
          }
        }
      `}</style>
    </main>
  );
}