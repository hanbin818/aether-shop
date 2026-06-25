const categories = [
  { icon: "🔍", name: "찾아주세요", href: "/products" },
  { icon: "⭐", name: "리뷰", href: "/products" },
  { icon: "📦", name: "검수사진", href: "/products" },
  { icon: "🎁", name: "이벤트", href: "/products" },
  { icon: "👜", name: "여성 가방", href: "/products?search=여성 가방" },
  { icon: "💼", name: "남성 가방", href: "/products?search=남성 가방" },
  { icon: "👗", name: "하이엔드 여성", href: "/products?search=여성" },
  { icon: "🧥", name: "하이엔드 남성", href: "/products?search=남성" },
];

export default function CategoryIcons() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "26px 16px 34px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "18px 12px",
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.href}
            style={{
              textDecoration: "none",
              color: "#111",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                margin: "0 auto 8px",
                borderRadius: "50%",
                background: "#111",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
              }}
            >
              {category.icon}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: 800,
                color: "#374151",
                wordBreak: "keep-all",
              }}
            >
              {category.name}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}