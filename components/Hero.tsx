export default function Hero() {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "520px",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          maxWidth: "760px",
        }}
      >
        <p
          style={{
            fontSize: "15px",
            letterSpacing: "5px",
            opacity: 0.9,
            marginBottom: "16px",
            fontWeight: 700,
          }}
        >
          AETHER COLLECTION
        </p>

        <h1
          style={{
            fontSize: "clamp(42px,7vw,78px)",
            fontWeight: 900,
            letterSpacing: "8px",
            marginBottom: "18px",
            lineHeight: 1.1,
          }}
        >
          당신만의
          <br />
          럭셔리 스타일
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "#f2f2f2",
            lineHeight: 1.8,
            marginBottom: "36px",
          }}
        >
          세계적인 브랜드를 한 곳에서.
          <br />
          AETHER가 엄선한 프리미엄 컬렉션을 만나보세요.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/products"
            style={{
              padding: "16px 34px",
              background: "white",
              color: "#111",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 900,
              fontSize: "15px",
            }}
          >
            전체 상품 보기
          </a>

          <a
            href="/best"
            style={{
              padding: "16px 34px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "15px",
            }}
          >
            베스트 상품
          </a>
        </div>
      </div>
    </section>
  );
}