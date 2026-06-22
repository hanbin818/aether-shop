export default function Footer() {
  return (
    <footer
      style={{
        background: "#0b0b0f",
        color: "#fff",
        padding: "70px 20px 42px",
        borderTop: "1px solid #1f1f1f",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 900,
            letterSpacing: "4px",
            color: "#777",
            marginBottom: "18px",
          }}
        >
          LUXURY FASHION MARKETPLACE
        </p>

        <h2
          style={{
            fontSize: "34px",
            fontWeight: 900,
            letterSpacing: "10px",
            marginBottom: "18px",
          }}
        >
          AETHER
        </h2>

        <p
          style={{
            color: "#bdbdbd",
            fontSize: "15px",
            lineHeight: "1.9",
            maxWidth: "680px",
            margin: "0 auto 34px",
          }}
        >
          프리미엄 패션과 럭셔리 라이프스타일을 위한
          <br />
          새로운 셀렉션을 제안합니다.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            flexWrap: "wrap",
            marginBottom: "36px",
          }}
        >
          <a href="/" style={footerLinkStyle}>
            HOME
          </a>
          <a href="/products" style={footerLinkStyle}>
            SHOP
          </a>
          <a href="/men" style={footerLinkStyle}>
            MEN
          </a>
          <a href="/women" style={footerLinkStyle}>
            WOMEN
          </a>
          <a href="/order-status" style={footerLinkStyle}>
            ORDER
          </a>
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#242424",
            marginBottom: "24px",
          }}
        />

        <p
          style={{
            color: "#777",
            fontSize: "12px",
            letterSpacing: "1.5px",
            lineHeight: "1.8",
          }}
        >
          © 2026 AETHER. ALL RIGHTS RESERVED.
          <br />
          Curated in Korea.
        </p>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  color: "#d8d8d8",
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "2px",
};