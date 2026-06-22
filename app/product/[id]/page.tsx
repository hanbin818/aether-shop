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
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
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

  const normalizedStock = product?.stock_status
    ?.toLowerCase()
    .replace(/[_-]/g, "");

  const isSoldOut = normalizedStock === "soldout";

  const addToCart = () => {
    if (!product) return;

    if (isSoldOut) {
      alert("품절 상품은 장바구니에 담을 수 없습니다.");
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
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("aether-cart", JSON.stringify(cart));
    }

    alert(`${product.name} 장바구니에 담았습니다.`);
  };

  const buyNow = () => {
    if (!product) return;

    if (isSoldOut) {
      alert("품절 상품은 구매할 수 없습니다.");
      return;
    }

    addToCart();
    window.location.href = "/cart";
  };

  if (loading) {
    return <main style={centerStyle}>상품 불러오는 중...</main>;
  }

  if (!product) {
    return <main style={centerStyle}>상품을 찾을 수 없습니다.</main>;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        padding: isMobile ? "26px 18px 70px" : "60px 40px 100px",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <a
          href="/products"
          style={{
            display: "inline-block",
            marginBottom: "30px",
            color: "#777",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          ← 전체상품으로 돌아가기
        </a>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
            gap: isMobile ? "34px" : "72px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "#f7f7f7",
              borderRadius: "28px",
              minHeight: isMobile ? "360px" : "640px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
              border: "1px solid #eee",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: isMobile ? "360px" : "640px",
                objectFit: "contain",
                display: "block",
                opacity: isSoldOut ? 0.35 : 1,
              }}
            />

            {isSoldOut && <div style={soldOutOverlayStyle}>SOLD OUT</div>}
          </div>

          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: "4px",
                color: "#999",
                marginBottom: "14px",
              }}
            >
              {product.brand}
            </p>

            <h1
              style={{
                fontSize: isMobile ? "34px" : "48px",
                lineHeight: "1.15",
                marginBottom: "18px",
                fontWeight: 900,
              }}
            >
              {product.name}
            </h1>

            {isSoldOut && <span style={soldOutBadgeStyle}>품절</span>}

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                margin: "22px 0",
              }}
            >
              {product.gender && <span style={badgeStyle}>{product.gender}</span>}
              <span style={badgeStyle}>{product.category}</span>
            </div>

            <h2
              style={{
                fontSize: "30px",
                marginBottom: "28px",
                fontWeight: 900,
              }}
            >
              ₩{Number(product.price).toLocaleString()}
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: "1.9",
                fontSize: "15px",
                marginBottom: "34px",
              }}
            >
              {product.description ||
                "AETHER가 엄선한 프리미엄 패션 아이템입니다. 세련된 실루엣과 고급스러운 무드로 데일리 룩부터 특별한 스타일까지 완성해줍니다."}
            </p>

            <div
              style={{
                borderTop: "1px solid #eee",
                borderBottom: "1px solid #eee",
                padding: "22px 0",
                marginBottom: "30px",
                display: "grid",
                gap: "12px",
                color: "#555",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              <p style={{ margin: 0 }}>무료 배송</p>
              <p style={{ margin: 0 }}>프리미엄 패키징</p>
              <p style={{ margin: 0 }}>교환 및 반품 정책 적용</p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexDirection: isMobile ? "column" : "row",
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
                {isSoldOut ? "품절된 상품입니다" : "장바구니 담기"}
              </button>

              <button
                onClick={buyNow}
                disabled={isSoldOut}
                style={{
                  ...buyButtonStyle,
                  opacity: isSoldOut ? 0.45 : 1,
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
  minHeight: "70vh",
  background: "#fff",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
};

const badgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "#f5f5f5",
  color: "#555",
  fontSize: "13px",
  fontWeight: "800",
  textTransform: "uppercase" as const,
};

const soldOutBadgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  fontSize: "13px",
  fontWeight: "900",
};

const soldOutOverlayStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.82)",
  color: "#fff",
  padding: "14px 24px",
  borderRadius: "999px",
  fontSize: "17px",
  fontWeight: "900",
  letterSpacing: "2px",
};

const cartButtonStyle = {
  flex: 1,
  height: "66px",
  border: "2px solid #111",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  fontSize: "22px",
  fontWeight: "900",
};

const buyButtonStyle = {
  flex: 1,
  height: "66px",
  border: "none",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  fontSize: "22px",
  fontWeight: "900",
};