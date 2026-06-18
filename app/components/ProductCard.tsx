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
      <div className="product-image-box">
        <img
          src={image}
          alt={name}
          className="product-image"
          style={{
            opacity: isSoldOut ? 0.4 : 1,
          }}
        />

        {isSoldOut && <div className="soldout-badge">SOLD OUT</div>}
      </div>

      <p>{brand}</p>
      <h3>{name}</h3>
      <span>{price}</span>

      {isSoldOut && <p className="soldout-text">품절</p>}
    </Link>
  );
}