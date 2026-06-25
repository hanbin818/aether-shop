import {
  Search,
  MessageCircle,
  Camera,
  Gift,
  ShoppingBag,
  BriefcaseBusiness,
  Shirt,
  Sparkles,
} from "lucide-react";

const categories = [
  { Icon: Search, name: "찾아주세요", href: "/products" },
  { Icon: MessageCircle, name: "리뷰", href: "/products" },
  { Icon: Camera, name: "검수사진", href: "/products" },
  { Icon: Gift, name: "이벤트", href: "/products" },
  { Icon: ShoppingBag, name: "여성 가방", href: "/products?search=여성 가방" },
  { Icon: BriefcaseBusiness, name: "남성 가방", href: "/products?search=남성 가방" },
  { Icon: Sparkles, name: "하이엔드 여성", href: "/products?search=여성" },
  { Icon: Shirt, name: "하이엔드 남성", href: "/products?search=남성" },
];

export default function CategoryIcons() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "24px 14px 30px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "18px 10px",
          maxWidth: "540px",
          margin: "0 auto",
        }}
      >
        {categories.map((category) => {
          const Icon = category.Icon;

          return (
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
                  width: "66px",
                  height: "66px",
                  margin: "0 auto 8px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(145deg, #050505 0%, #1b1b1b 100%)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.14)",
                }}
              >
                <Icon size={30} strokeWidth={1.8} />
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#374151",
                  lineHeight: 1.25,
                  wordBreak: "keep-all",
                }}
              >
                {category.name}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}