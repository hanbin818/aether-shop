const brands = [
  "루이비통",
  "구찌",
  "프라다",
  "샤넬",
  "디올",
  "에르메스",
];

export default function BrandSection() {
  return (
    <section
      style={{
        background: "#111",
        color: "#fff",
        padding: "80px 18px",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#c9a86a",
            letterSpacing: "5px",
            fontSize: "12px",
            fontWeight: 950,
            marginBottom: "14px",
          }}
        >
          DESIGNER BRANDS
        </p>

        <h2
          style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 950,
            margin: "0 0 18px",
            letterSpacing: "-1.5px",
          }}
        >
          인기 브랜드
        </h2>

        <p
          style={{
            maxWidth: "620px",
            margin: "0 auto 46px",
            color: "rgba(255,255,255,0.68)",
            fontSize: "16px",
            lineHeight: "1.8",
            wordBreak: "keep-all",
          }}
        >
          AETHER가 엄선한 프리미엄 디자이너 브랜드를 한 곳에서 만나보세요.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "16px",
          }}
        >
          {brands.map((brand) => (
            <a
              key={brand}
              href={`/products?search=${encodeURIComponent(brand)}`}
              style={{
                padding: "24px 14px",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "22px",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "17px",
                fontWeight: 950,
                letterSpacing: "-0.3px",
                boxShadow: "0 16px 45px rgba(0,0,0,0.22)",
                backdropFilter: "blur(10px)",
              }}
            >
              {brand}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}