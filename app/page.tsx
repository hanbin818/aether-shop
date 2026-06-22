import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CategoryIcons from "../components/CategoryIcons";
import BrandSection from "../components/BrandSection";
import NewArrivals from "../components/NewArrivals";
import BestItems from "../components/BestItems";
import GenderBanners from "../components/GenderBanners";

export default function Home() {
  return (
    <main>
      <Hero />

      <CategoryIcons />

      <BrandSection />

      <NewArrivals />

      <BestItems />

      <GenderBanners />

      <Footer />
    </main>
  );
}