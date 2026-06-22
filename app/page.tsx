import Hero from "../components/Hero";
import CategoryIcons from "../components/CategoryIcons";
import BestItems from "../components/BestItems";

export default function Home() {
  return (
    <main>
      <Hero />

      <CategoryIcons />

      <BestItems />

      <section
        style={{
          padding: "50px 20px",
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <a
            href="/men"
            style={{
              height: "220px",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              textDecoration: "none",
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "34px",
                fontWeight: 900,
                letterSpacing: "4px",
              }}
            >
              MEN
            </div>
          </a>

          <a
            href="/women"
            style={{
              height: "220px",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              textDecoration: "none",
              backgroundImage:
                "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "34px",
                fontWeight: 900,
                letterSpacing: "4px",
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