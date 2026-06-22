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
        background: "#fff",
        color: "#111",
        padding: "48px 18px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 900,
            marginBottom: "10px",
          }}
        >
          인기 브랜드
        </h2>

        <p
          style={{
            color: "#888",
            fontSize: "14px",
            marginBottom: "28px",
          }}
        >
          AETHER가 엄선한 프리미엄 브랜드를 만나보세요.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
        >
          {brands.map((brand) => (
            <a
              key={brand}
              href={`/products?search=${encodeURIComponent(brand)}`}
              style={{
                padding: "18px 10px",
                border: "1px solid #eee",
                borderRadius: "16px",
                background: "#fafafa",
                color: "#111",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 900,
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