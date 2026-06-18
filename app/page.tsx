import BestItems from "../components/BestItems";
import CategoryIcons from "../components/CategoryIcons";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>

      <Hero />

      <CategoryIcons />

      <BestItems />

      <section
        style={{
          padding: "60px 40px",
          textAlign: "center",
          background: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            marginBottom: "30px",
            color: "#111",
          }}
        >
          카테고리
        </h2>

        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="/men" style={{ textDecoration: "none" }}>
            <div
              style={{
                width: "260px",
                height: "340px",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                fontWeight: "700",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "26px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              MEN
            </div>
          </a>

          <a href="/women" style={{ textDecoration: "none" }}>
            <div
              style={{
                width: "260px",
                height: "340px",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1483985988355-763728e1935b')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                fontWeight: "700",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "26px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              WOMEN
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}