export default function GenderBanners() {
  return (
    <section className="gender-section">
      <a href="/men" className="gender-card gender-men">
        <div className="gender-content">
          <p>MEN</p>
          <h2>남성 컬렉션</h2>
          <span>바로가기</span>
        </div>
      </a>

      <a href="/women" className="gender-card gender-women">
        <div className="gender-content">
          <p>WOMEN</p>
          <h2>여성 컬렉션</h2>
          <span>바로가기</span>
        </div>
      </a>
    </section>
  );
}