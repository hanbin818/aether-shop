import Link from "next/link";

type ProductCardProps = {
  brand: string;
  name: string;
  price: string;
  href: string;
  image: string;
  stockStatus?: string;
};

export default function ProductCard({
  brand,
  name,
  price,
  href,
  image,
  stockStatus = "available",
}: ProductCardProps) {
  const isSoldOut = stockStatus === "soldout";

  return (
    <Link href={href} className="product-card">
      <div>
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "15px",
            position: "relative",
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
              opacity: isSoldOut ? 0.4 : 1,
            }}
          />

          {isSoldOut && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0,0,0,0.85)",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "999px",
                fontWeight: "900",
                letterSpacing: "1px",
              }}
            >
              SOLD OUT
            </div>
          )}
        </div>

        <p>{brand}</p>
        <h3>{name}</h3>
        <span>{price}</span>

        {isSoldOut && (
          <p
            style={{
              color: "#d93025",
              fontWeight: "900",
              marginTop: "8px",
            }}
          >
            품절
          </p>
        )}
      </div>
    </Link>
  );
}