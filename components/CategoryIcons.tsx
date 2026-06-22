const categories = [
  { icon: "BAG", name: "가방", href: "/products?search=가방" },
  { icon: "WAL", name: "지갑", href: "/products?search=지갑" },
  { icon: "SHO", name: "신발", href: "/products?search=신발" },
  { icon: "ACC", name: "액세서리", href: "/products?search=액세서리" },
  { icon: "WAT", name: "시계", href: "/products?search=시계" },
  { icon: "BEST", name: "베스트", href: "/products" },
  { icon: "REV", name: "리뷰", href: "/products" },
  { icon: "AUTH", name: "검수", href: "/products" },
];

export default function CategoryIcons() {
  return (
    <section
      style={{
        background: "#fff",
        color: "#111",
        padding: "42px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "18px 12px",
          textAlign: "center",
        }}
      >
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.href}
            style={{
              color: "#111",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "62px",
                height: "62px",
                margin: "0 auto 10px",
                borderRadius: "18px",
                background:
                  "linear-gradient(145deg, #ffffff, #f3f3f3)",
                border: "1px solid #ececec",
                boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "1px",
              }}
            >
              {category.icon}
            </div>

            <p
              style={{
                fontSize: "13px",
                fontWeight: 900,
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