const categories = [
  { icon: "👜", name: "가방", href: "/products?search=가방" },
  { icon: "👛", name: "지갑", href: "/products?search=지갑" },
  { icon: "👟", name: "신발", href: "/products?search=신발" },
  { icon: "💍", name: "액세서리", href: "/products?search=액세서리" },
  { icon: "⌚", name: "시계", href: "/products?search=시계" },
  { icon: "🔥", name: "베스트", href: "/products" },
  { icon: "⭐", name: "리뷰", href: "/products" },
  { icon: "✔", name: "정품검수", href: "/products" },
];

export default function CategoryIcons() {
  return (
    <section
      style={{
        background: "#faf8f4",
        padding: "70px 18px",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#9b8b73",
            letterSpacing: "4px",
            fontWeight: 900,
            fontSize: "12px",
            marginBottom: "12px",
          }}
        >
          SHOP BY CATEGORY
        </p>

        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            fontWeight: 950,
            marginBottom: "54px",
            letterSpacing: "-1px",
          }}
        >
          카테고리
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
            gap: "24px",
          }}
        >
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              style={{
                textDecoration: "none",
                color: "#111",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "28px",
                  padding: "30px 18px",
                  textAlign: "center",
                  border: "1px solid rgba(0,0,0,.05)",
                  boxShadow: "0 18px 45px rgba(0,0,0,.06)",
                  transition: "0.3s",
                }}
              >
                <div
                  style={{
                    width: "76px",
                    height: "76px",
                    margin: "0 auto 18px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(145deg,#ffffff,#f1f1f1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "34px",
                    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
                  }}
                >
                  {category.icon}
                </div>

                <p
                  style={{
                    margin: 0,
                    fontWeight: 900,
                    fontSize: "15px",
                  }}
                >
                  {category.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}