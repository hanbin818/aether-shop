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
    <main
      style={{
        background: "#fff",
        color: "#111",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Header />

      <Hero />

      <section style={introStyle}>
        <p style={introLabelStyle}>LUXURY SELECT SHOP</p>
        <h1 style={introTitleStyle}>
          감각적인 명품 셀렉션을
          <br />
          한 곳에서 만나보세요
        </h1>
        <p style={introTextStyle}>
          AETHER는 남성·여성 프리미엄 패션 아이템을 엄선해 소개하는
          럭셔리 셀렉트샵입니다.
        </p>
      </section>

      <CategoryIcons />

      <BrandSection />

      <NewArrivals />

      <section style={bannerStyle}>
        <p style={bannerLabelStyle}>CURATED FOR YOU</p>
        <h2 style={bannerTitleStyle}>오늘의 추천 컬렉션</h2>
        <p style={bannerTextStyle}>
          데일리 룩부터 특별한 날의 스타일링까지, AETHER가 엄선한 아이템을
          만나보세요.
        </p>
        <a href="/products" style={bannerButtonStyle}>
          전체 상품 보기
        </a>
      </section>

      <BestItems />

      <GenderBanners />

      <Footer />

      <TopButton />
    </main>
  );
}

const introStyle = {
  padding: "70px 20px 44px",
  textAlign: "center" as const,
  background: "linear-gradient(180deg, #fff 0%, #faf7f1 100%)",
};

const introLabelStyle = {
  margin: "0 0 14px",
  color: "#9b8b73",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "5px",
};

const introTitleStyle = {
  margin: "0 0 18px",
  fontSize: "clamp(34px, 6vw, 62px)",
  lineHeight: "1.18",
  fontWeight: 950,
  letterSpacing: "-2px",
};

const introTextStyle = {
  maxWidth: "640px",
  margin: "0 auto",
  color: "#666",
  fontSize: "16px",
  lineHeight: "1.9",
  wordBreak: "keep-all" as const,
};

const bannerStyle = {
  margin: "50px auto",
  maxWidth: "1120px",
  padding: "74px 22px",
  borderRadius: "34px",
  textAlign: "center" as const,
  background:
    "linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.72)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
};

const bannerLabelStyle = {
  margin: "0 0 14px",
  color: "#d8c59f",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "5px",
};

const bannerTitleStyle = {
  margin: "0 0 16px",
  fontSize: "clamp(34px, 6vw, 58px)",
  fontWeight: 950,
  letterSpacing: "-1.5px",
};

const bannerTextStyle = {
  maxWidth: "620px",
  margin: "0 auto 30px",
  color: "rgba(255,255,255,0.82)",
  fontSize: "16px",
  lineHeight: "1.9",
  wordBreak: "keep-all" as const,
};

const bannerButtonStyle = {
  display: "inline-block",
  padding: "16px 34px",
  background: "#fff",
  color: "#111",
  borderRadius: "999px",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 950,
};