export default function GenderBanners() {
  return (
    <section
      style={{
        width: "100%",
        background: "#fff",
        padding: "24px 16px 56px",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "14px",
      }}
    >
      <a
        href="/men"
        style={{
          height: "180px",
          borderRadius: "18px",
          overflow: "hidden",
          textDecoration: "none",
          color: "#fff",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          padding: "20px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              letterSpacing: "3px",
            }}
          >
            MEN
          </h2>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "12px",
              color: "#fff",
            }}
          >
            남성 컬렉션
          </p>
        </div>
      </a>

      <a
        href="/women"
        style={{
          height: "180px",
          borderRadius: "18px",
          overflow: "hidden",
          textDecoration: "none",
          color: "#fff",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          padding: "20px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              letterSpacing: "3px",
            }}
          >
            WOMEN
          </h2>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "12px",
              color: "#fff",
            }}
          >
            여성 컬렉션
          </p>
        </div>
      </a>
    </section>
  );
}