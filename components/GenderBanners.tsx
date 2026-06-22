export default function GenderBanners() {
  return (
    <section className="home-gender-section">
      <a href="/men" className="home-gender-card home-men-card">
        <div>
          <h2>MEN</h2>
          <p>남성 컬렉션</p>
        </div>
      </a>

      <a href="/women" className="home-gender-card home-women-card">
        <div>
          <h2>WOMEN</h2>
          <p>여성 컬렉션</p>
        </div>
      </a>
    </section>
  );
}