const categories = [
  { icon: "👜", name: "가방", href: "/products" },
  { icon: "👛", name: "지갑", href: "/products" },
  { icon: "👠", name: "신발", href: "/products" },
  { icon: "💍", name: "액세서리", href: "/products" },
  { icon: "⌚", name: "시계", href: "/products" },
  { icon: "🏆", name: "베스트", href: "/products" },
  { icon: "👍", name: "리뷰", href: "/products" },
  { icon: "🔍", name: "검수", href: "/products" },
];

export default function CategoryIcons() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          textAlign: "center",
        }}
      >
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.href}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "78px",
                height: "78px",
                margin: "0 auto 12px",
                borderRadius: "20px",
                background: "#f3f3f3",
                border: "1px solid #e5e5e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
              }}
            >
              {category.icon}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: "800",
                color: "#111",
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