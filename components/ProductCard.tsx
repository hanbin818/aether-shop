"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type ProductCardProps = {
  brand: string;
  name: string;
  price: string;
  image: string;
  href: string;
  stockStatus?: string;
  stockQuantity?: number;
};

export default function ProductCard({
  brand,
  name,
  price,
  image,
  href,
  stockStatus = "available",
  stockQuantity,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const normalizedStock = stockStatus.toLowerCase().replace(/[_-\s]/g, "");
  const isSoldOut =
    normalizedStock === "soldout" || Number(stockQuantity || 0) <= 0;

  const productId = Number(href.split("/").pop());

  useEffect(() => {
    const checkWishlist = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user || !productId) return;

      setUserId(data.user.id);

      const { data: wishlistData } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", data.user.id)
        .eq("product_id", productId)
        .maybeSingle();

      setIsWishlisted(!!wishlistData);
    };

    checkWishlist();
  }, [productId]);

  const toggleWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      alert("로그인 후 찜할 수 있습니다.");
      window.location.href = "/login";
      return;
    }

    const currentUserId = userId || data.user.id;
    setUserId(currentUserId);

    if (isWishlisted) {
      await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", currentUserId)
        .eq("product_id", productId);

      setIsWishlisted(false);
      return;
    }

    await supabase.from("wishlists").insert({
      user_id: currentUserId,
      product_id: productId,
    });

    setIsWishlisted(true);
  };

  return (
    <a href={href} style={cardStyle}>
      <div style={imageBoxStyle}>
        <button
          type="button"
          onClick={toggleWishlist}
          style={{
            ...heartButtonStyle,
            background: isWishlisted ? "#111" : "rgba(255,255,255,0.92)",
            color: isWishlisted ? "#fff" : "#111",
          }}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        <img
          src={image}
          alt={name}
          style={{
            ...imageStyle,
            opacity: isSoldOut ? 0.38 : 1,
          }}
        />

        {isSoldOut && <div style={soldOutStyle}>SOLD OUT</div>}
      </div>

      <div style={textBoxStyle}>
        <p style={brandStyle}>{brand}</p>
        <p style={nameStyle}>{name}</p>
        <p style={priceStyle}>{price}</p>

        {isSoldOut ? (
          <p style={soldOutTextStyle}>품절</p>
        ) : (
          <p style={availableTextStyle}>구매 가능</p>
        )}
      </div>
    </a>
  );
}

const cardStyle = {
  width: "220px",
  textDecoration: "none",
  color: "#111",
  background: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  position: "relative" as const,
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

const heartButtonStyle = {
  position: "absolute" as const,
  top: "12px",
  right: "12px",
  zIndex: 5,
  width: "38px",
  height: "38px",
  borderRadius: "999px",
  border: "1px solid rgba(0,0,0,0.08)",
  fontSize: "22px",
  fontWeight: 900,
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
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
  background: "rgba(0,0,0,0.88)",
  color: "#fff",
  padding: "11px 18px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "900",
  letterSpacing: "1.2px",
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

const availableTextStyle = {
  margin: "8px 0 0",
  fontSize: "12px",
  fontWeight: "900",
  color: "#167a3a",
};