import BestItems from "../components/BestItems";
import CategoryIcons from "../components/CategoryIcons";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      <BestItems />

      <CategoryIcons />

      <section className="home-gender-section">
        <a href="/men" className="home-gender-card home-men-card">
          <div>
            <h2>MEN</h2>
            <p>남성 컬렉션 보기</p>
          </div>
        </a>

        <a href="/women" className="home-gender-card home-women-card">
          <div>
            <h2>WOMEN</h2>
            <p>여성 컬렉션 보기</p>
          </div>
        </a>
      </section>
    </main>
  );
}