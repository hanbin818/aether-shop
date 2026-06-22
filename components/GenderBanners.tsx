export default function GenderBanners() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        gap: "24px",
        maxWidth: "1200px",
        margin: "70px auto",
        padding: "0 20px",
      }}
    >
      <a
        href="/men"
        style={{
          textDecoration: "none",
          color: "#fff",
          borderRadius: "24px",
          overflow: "hidden",
          minHeight: "360px",
          display: "flex",
          alignItems: "flex-end",
          padding: "36px",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.6)),url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: ".3s",
        }}
      >
        <div>
          <div
            style={{
              letterSpacing: "4px",
              fontSize: "12px",
              opacity: 0.8,
              marginBottom: "8px",
            }}
          >
            COLLECTION
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "42px",
              fontWeight: 700,
            }}
          >
            MEN
          </h2>

          <p
            style={{
              marginTop: "10px",
              fontSize: "16px",
              opacity: 0.9,
            }}
          >
            남성 컬렉션 보기 →
          </p>
        </div>
      </a>

      <a
        href="/women"
        style={{
          textDecoration: "none",
          color: "#fff",
          borderRadius: "24px",
          overflow: "hidden",
          minHeight: "360px",
          display: "flex",
          alignItems: "flex-end",
          padding: "36px",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.6)),url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: ".3s",
        }}
      >
        <div>
          <div
            style={{
              letterSpacing: "4px",
              fontSize: "12px",
              opacity: 0.8,
              marginBottom: "8px",
            }}
          >
            COLLECTION
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "42px",
              fontWeight: 700,
            }}
          >
            WOMEN
          </h2>

          <p
            style={{
              marginTop: "10px",
              fontSize: "16px",
              opacity: 0.9,
            }}
          >
            여성 컬렉션 보기 →
          </p>
        </div>
      </a>
    </section>
  );
}