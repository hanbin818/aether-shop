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
  const [isHover, setIsHover] = useState(false);
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
    <a
      href={href}
      style={{
        ...cardStyle,
        transform: isHover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHover
          ? "0 22px 45px rgba(0,0,0,0.14)"
          : "0 10px 28px rgba(0,0,0,0.07)",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div style={imageBoxStyle}>
        <button
          type="button"
          onClick={toggleWishlist}
          style={{
            ...heartButtonStyle,
            background: isWishlisted ? "#111" : "rgba(255,255,255,0.94)",
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
            opacity: isSoldOut ? 0.34 : 1,
            transform: isHover ? "scale(1.08)" : "scale(1)",
          }}
        />

        {isSoldOut && <div style={soldOutStyle}>품절</div>}
      </div>

      <div style={textBoxStyle}>
        <p style={brandStyle}>{brand}</p>
        <p style={nameStyle}>{name}</p>
        <p style={priceStyle}>{price}</p>

        <span style={moreStyle}>자세히 보기 →</span>
      </div>
    </a>
  );
}

const cardStyle = {
  width: "220px",
  minWidth: "180px",
  textDecoration: "none",
  color: "#111",
  background: "#fff",
  borderRadius: "24px",
  overflow: "hidden",
  border: "1px solid rgba(0,0,0,0.06)",
  position: "relative" as const,
  transition: "0.28s ease",
};

const imageBoxStyle = {
  width: "100%",
  height: "238px",
  background: "linear-gradient(180deg, #fafafa 0%, #f4f1eb 100%)",
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
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  border: "1px solid rgba(0,0,0,0.08)",
  fontSize: "18px",
  fontWeight: 900,
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "112%",
  height: "112%",
  objectFit: "contain" as const,
  objectPosition: "center",
  display: "block",
  transition: "0.35s ease",
};

const soldOutStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.86)",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "950",
  letterSpacing: "1.5px",
};

const textBoxStyle = {
  padding: "16px 15px 18px",
  textAlign: "left" as const,
  background: "#fff",
};

const brandStyle = {
  margin: "0 0 8px",
  fontSize: "11px",
  fontWeight: "950",
  letterSpacing: "1.4px",
  color: "#8b806f",
  textTransform: "uppercase" as const,
};

const nameStyle = {
  margin: "0 0 12px",
  fontSize: "14px",
  color: "#111",
  lineHeight: "1.45",
  minHeight: "40px",
  fontWeight: "800",
  wordBreak: "keep-all" as const,
};

const priceStyle = {
  margin: "0 0 14px",
  fontSize: "17px",
  fontWeight: "950",
  color: "#111",
};

const moreStyle = {
  display: "inline-block",
  fontSize: "12px",
  fontWeight: "900",
  color: "#777",
};