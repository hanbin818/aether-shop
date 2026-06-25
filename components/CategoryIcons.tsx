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
    <section className="category-section">
      <div className="category-inner">
        <p className="category-label">SHOP BY CATEGORY</p>
        <h2 className="category-title">카테고리</h2>

        <div className="category-scroll">
          {categories.map((category) => (
            <a key={category.name} href={category.href} className="category-link">
              <div className="category-card">
                <div className="category-icon">{category.icon}</div>
                <p className="category-name">{category.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .category-section {
          background: #faf8f4;
          padding: 64px 18px;
          overflow: hidden;
        }

        .category-inner {
          max-width: 1150px;
          margin: 0 auto;
        }

        .category-label {
          text-align: center;
          color: #9b8b73;
          letter-spacing: 4px;
          font-weight: 900;
          font-size: 12px;
          margin-bottom: 12px;
        }

        .category-title {
          text-align: center;
          font-size: 42px;
          font-weight: 950;
          margin-bottom: 44px;
          letter-spacing: -1px;
        }

        .category-scroll {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 24px;
        }

        .category-link {
          text-decoration: none;
          color: #111;
        }

        .category-card {
          background: #fff;
          border-radius: 28px;
          padding: 30px 18px;
          text-align: center;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.06);
        }

        .category-icon {
          width: 76px;
          height: 76px;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: linear-gradient(145deg, #ffffff, #f1f1f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .category-name {
          margin: 0;
          font-weight: 900;
          font-size: 15px;
        }

        @media (max-width: 768px) {
          .category-section {
            padding: 46px 0 42px;
          }

          .category-title {
            font-size: 32px;
            margin-bottom: 24px;
          }

          .category-scroll {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding: 0 18px 8px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }

          .category-scroll::-webkit-scrollbar {
            display: none;
          }

          .category-link {
            flex: 0 0 auto;
            scroll-snap-align: start;
          }

          .category-card {
            width: 92px;
            height: 104px;
            border-radius: 22px;
            padding: 16px 10px;
          }

          .category-icon {
            width: 46px;
            height: 46px;
            margin-bottom: 10px;
            font-size: 24px;
          }

          .category-name {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}