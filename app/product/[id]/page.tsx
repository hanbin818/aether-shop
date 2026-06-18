"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  gender?: string;
  description?: string;
  stock_status?: string;
};

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const isSoldOut = product?.stock_status === "soldout";

  const addToCart = () => {
    if (!product) return;

    if (isSoldOut) {
      alert("품절 상품은 장바구니에 담을 수 없어 ㅠㅠ");
      return;
    }

    const oldCart = localStorage.getItem("aether-cart");
    const cart = oldCart ? JSON.parse(oldCart) : [];

    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );

      localStorage.setItem("aether-cart", JSON.stringify(updatedCart));
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });

      localStorage.setItem("aether-cart", JSON.stringify(cart));
    }

    alert(`${product.name} 장바구니에 담았어!`);
  };

  const buyNow = () => {
    if (isSoldOut) {
      alert("품절 상품은 구매할 수 없어 ㅠㅠ");
      return;
    }

    addToCart();
    window.location.href = "/cart";
  };

  if (loading) {
    return <main style={centerStyle}>불러오는 중...</main>;
  }

  if (!product) {
    return <main style={centerStyle}>상품을 찾을 수 없습니다.</main>;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #1c1c27 0, #0b0b0f 42%)",
        color: "white",
        padding: isMobile ? "24px 18px" : "40px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <a
          href="/products"
          style={{
            color: "#aaa",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          ← 상품목록으로
        </a>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
            gap: isMobile ? "32px" : "70px",
            marginTop: isMobile ? "28px" : "40px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: isMobile ? "20px" : "28px",
              padding: isMobile ? "22px" : "40px",
              minHeight: isMobile ? "320px" : "620px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              position: "relative",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                maxHeight: isMobile ? "300px" : "540px",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                opacity: isSoldOut ? 0.4 : 1,
              }}
            />

            {isSoldOut && <div style={soldOutOverlayStyle}>SOLD OUT</div>}
          </div>

          <div>
            <p
              style={{
                color: "#c9a86a",
                fontSize: "15px",
                letterSpacing: "3px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {product.brand}
            </p>

            {isSoldOut && <p style={soldOutBadgeStyle}>품절</p>}

            <h1
              style={{
                fontSize: isMobile ? "36px" : "56px",
                lineHeight: "1.08",
                marginTop: "16px",
                marginBottom: "18px",
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: isMobile ? "24px" : "34px",
              }}
            >
              {product.gender && <span style={badgeStyle}>{product.gender}</span>}
              <span style={badgeStyle}>{product.category}</span>
            </div>

            <h2
              style={{
                fontSize: isMobile ? "30px" : "36px",
                marginBottom: "28px",
              }}
            >
              ₩{Number(product.price).toLocaleString()}
            </h2>

            <p
              style={{
                color: "#cfcfcf",
                lineHeight: "1.9",
                fontSize: "16px",
                maxWidth: "520px",
                marginBottom: "34px",
              }}
            >
              {product.description ||
                "A carefully selected luxury fashion item curated for AETHER. Designed to complete a refined and timeless wardrobe."}
            </p>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.12)",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                padding: "20px 0",
                marginBottom: "34px",
                display: "grid",
                gap: "10px",
                color: "#bbb",
              }}
            >
              <p style={{ margin: 0 }}>무료 배송</p>
              <p style={{ margin: 0 }}>프리미엄 패키징</p>
              <p style={{ margin: 0 }}>교환 및 반품 정책 적용</p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={addToCart}
                disabled={isSoldOut}
                style={{
                  ...cartButtonStyle,
                  opacity: isSoldOut ? 0.45 : 1,
                  cursor: isSoldOut ? "not-allowed" : "pointer",
                }}
              >
                {isSoldOut ? "품절 상품" : "장바구니 담기"}
              </button>

              <button
                onClick={buyNow}
                disabled={isSoldOut}
                style={{
                  ...buyButtonStyle,
                  background: isSoldOut ? "#555" : "#fff",
                  color: isSoldOut ? "#aaa" : "#111",
                  cursor: isSoldOut ? "not-allowed" : "pointer",
                }}
              >
                {isSoldOut ? "구매 불가" : "바로 구매"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const centerStyle = {
  minHeight: "100vh",
  background: "#0b0b0f",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const badgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.08)",
  color: "#ccc",
  fontSize: "14px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
};

const soldOutBadgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "#d93025",
  color: "#fff",
  fontSize: "13px",
  fontWeight: "900",
  margin: "10px 0",
};

const soldOutOverlayStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.85)",
  color: "#fff",
  padding: "14px 24px",
  borderRadius: "999px",
  fontSize: "18px",
  fontWeight: "900",
  letterSpacing: "2px",
};

const cartButtonStyle = {
  flex: 1,
  minWidth: "160px",
  height: "56px",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "14px",
  background: "transparent",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

const buyButtonStyle = {
  flex: 1,
  minWidth: "160px",
  height: "56px",
  border: "none",
  borderRadius: "14px",
  background: "#fff",
  color: "#111",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};