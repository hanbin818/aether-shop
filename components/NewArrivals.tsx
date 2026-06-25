"use client";

import { useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";

export default function NewArrivals() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchNewProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("stock_status", "available")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    fetchNewProducts();
  }, []);

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #fff 0%, #f8f3eb 100%)",
        color: "#111",
        padding: isMobile ? "64px 16px" : "96px 40px",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "36px" : "56px",
          }}
        >
          <p style={labelStyle}>NEW COLLECTION</p>

          <h2
            style={{
              fontSize: isMobile ? "38px" : "58px",
              fontWeight: 950,
              margin: 0,
              letterSpacing: "-1.8px",
            }}
          >
            새롭게 도착한 상품
          </h2>

          <p
            style={{
              color: "#777",
              margin: "16px auto 0",
              maxWidth: "560px",
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: 1.8,
              wordBreak: "keep-all",
            }}
          >
            AETHER가 엄선한 프리미엄 신상품을 가장 먼저 만나보세요.
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "#888", fontWeight: 800 }}>
            상품 불러오는 중...
          </p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", fontWeight: 800 }}>
            등록된 신상품이 없습니다.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(4, 1fr)",
              gap: isMobile ? "18px 12px" : "28px",
            }}
          >
            {products.map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                style={{
                  background: "#fff",
                  color: "#111",
                  textDecoration: "none",
                  borderRadius: isMobile ? "22px" : "30px",
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 24px 70px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "#f6f6f6",
                    overflow: "hidden",
                  }}
                >
                  <span style={newBadgeStyle}>NEW</span>

                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: isMobile ? "178px" : "286px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: isMobile ? "16px 10px 20px" : "22px 18px 26px",
                  }}
                >
                  <p style={brandStyle}>{product.brand}</p>

                  <h3
                    style={{
                      color: "#111",
                      fontSize: isMobile ? "13px" : "16px",
                      lineHeight: "1.45",
                      textAlign: "center",
                      marginBottom: "12px",
                      fontWeight: 900,
                      minHeight: isMobile ? "38px" : "46px",
                      wordBreak: "keep-all",
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      color: "#111",
                      fontSize: isMobile ? "14px" : "17px",
                      fontWeight: 950,
                      textAlign: "center",
                    }}
                  >
                    ₩{Number(product.price).toLocaleString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "42px" }}>
          <a href="/products" style={moreButtonStyle}>
            신상품 더 보기
          </a>
        </div>
      </div>
    </section>
  );
}

const labelStyle = {
  color: "#9b8b73",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "5px",
  marginBottom: "14px",
};

const newBadgeStyle = {
  position: "absolute" as const,
  top: "14px",
  left: "14px",
  zIndex: 2,
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  padding: "7px 12px",
  fontSize: "10px",
  fontWeight: 950,
  letterSpacing: "1px",
};

const brandStyle = {
  color: "#9b8b73",
  fontSize: "11px",
  fontWeight: 950,
  letterSpacing: "2px",
  textAlign: "center" as const,
  marginBottom: "8px",
};

const moreButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "56px",
  padding: "0 34px",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 950,
};