type ProductCardProps = {
  brand: string;
  name: string;
  price: string;
  image: string;
  href: string;
  stockStatus?: string;
};

export default function ProductCard({
  brand,
  name,
  price,
  image,
  href,
  stockStatus = "available",
}: ProductCardProps) {
  const isSoldOut = stockStatus === "soldout";

  return (
    <a href={href} style={cardStyle}>
      <div style={imageBoxStyle}>
        <img
          src={image}
          alt={name}
          style={{
            ...imageStyle,
            opacity: isSoldOut ? 0.45 : 1,
          }}
        />

        {isSoldOut && <div style={soldOutStyle}>SOLD OUT</div>}
      </div>

      <div style={textBoxStyle}>
        <p style={brandStyle}>{brand}</p>
        <p style={nameStyle}>{name}</p>
        <p style={priceStyle}>{price}</p>

        {isSoldOut && <p style={soldOutTextStyle}>품절</p>}
      </div>
    </a>
  );
}

const cardStyle = {
  width: "220px",
  textDecoration: "none",
  color: "#111",
  background: "#fff",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const imageBoxStyle = {
  width: "220px",
  height: "230px",
  background: "#fafafa",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative" as const,
};

const imageStyle = {
  width: "105%",
  height: "105%",
  objectFit: "contain" as const,
  objectPosition: "center",
  display: "block",
};

const soldOutStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.82)",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "900",
  letterSpacing: "1px",
};

const textBoxStyle = {
  padding: "14px",
  textAlign: "center" as const,
  background: "#fff",
};

const brandStyle = {
  margin: "0 0 5px",
  fontSize: "11px",
  fontWeight: "900",
  letterSpacing: "1px",
  color: "#777",
  textTransform: "uppercase" as const,
};

const nameStyle = {
  margin: "0 0 10px",
  fontSize: "13px",
  color: "#111",
  lineHeight: "1.4",
  minHeight: "36px",
  fontWeight: "700",
};

const priceStyle = {
  margin: 0,
  fontSize: "16px",
  fontWeight: "900",
  color: "#111",
};

const soldOutTextStyle = {
  margin: "8px 0 0",
  fontSize: "12px",
  fontWeight: "900",
  color: "#d93025",
};