export default function Hero() {
  return (
    <section
      style={{
        height: "42vh",
        margin: "0",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.42), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1584917865442-de89df76afd3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(36px, 6vw, 60px)",
          letterSpacing: "8px",
          marginBottom: "12px",
          fontWeight: "900",
        }}
      >
        AETHER
      </h1>

      <p
        style={{
          fontSize: "clamp(13px, 2vw, 17px)",
          color: "#eeeeee",
          marginBottom: "24px",
          letterSpacing: "1px",
        }}
      >
        Luxury Fashion for Men & Women
      </p>

      <a
        href="/products"
        style={{
          padding: "12px 30px",
          background: "white",
          color: "#111",
          fontWeight: "800",
          borderRadius: "999px",
          fontSize: "13px",
          letterSpacing: "1px",
          textDecoration: "none",
        }}
      >
        SHOP NOW
      </a>
    </section>
  );
}