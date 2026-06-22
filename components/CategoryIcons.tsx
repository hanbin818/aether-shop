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
        padding: "22px 14px 18px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "14px 8px",
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "50%",
                background: "#f3f3f3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              }}
            >
              {category.icon}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "12px",
                fontWeight: 700,
                color: "#222",
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