import Footer from "../components/Footer";
import NewArrivals from "../components/NewArrivals";
import BrandSection from "../components/BrandSection";
import Hero from "../components/Hero";
import CategoryIcons from "../components/CategoryIcons";
import BestItems from "../components/BestItems";

export default function Home() {
  return (
    <main>
      <Hero />

      <CategoryIcons />

      <BrandSection />

      <NewArrivals />

      <BestItems />

      <section className="gender-section">
        <a href="/men" className="gender-card">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
            alt="MEN"
            className="gender-image"
          />

          <div className="gender-overlay">
            <h2>MEN</h2>
          </div>
        </a>

        <a href="/women" className="gender-card">
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
            alt="WOMEN"
            className="gender-image"
          />

          <div className="gender-overlay">
            <h2>WOMEN</h2>
          </div>
        </a>
      </section>

      <Footer />

      <style>{`
        .gender-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          margin-top: 40px;
        }

        .gender-card {
          text-decoration: none;
          position: relative;
          height: 520px;
          overflow: hidden;
          display: block;
        }

        .gender-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .gender-card:hover .gender-image {
          transform: scale(1.05);
        }

        .gender-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.28);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .gender-overlay h2 {
          color: #fff;
          font-size: 48px;
          letter-spacing: 8px;
          font-weight: 700;
          margin: 0;
        }

        @media (max-width: 768px) {
          .gender-section {
            grid-template-columns: 1fr;
            margin-top: 28px;
          }

          .gender-card {
            height: 320px;
          }

          .gender-overlay h2 {
            font-size: 36px;
            letter-spacing: 6px;
          }
        }
      `}</style>
    </main>
  );
}