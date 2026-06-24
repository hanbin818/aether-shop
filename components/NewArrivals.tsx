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
        padding: isMobile ? "58px 16px" : "90px 40px",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "34px" : "52px" }}>
          <p
            style={{
              color: "#9b8b73",
              fontSize: "13px",
              fontWeight: 900,
              letterSpacing: "5px",
              marginBottom: "12px",
            }}
          >
            NEW COLLECTION
          </p>

          <h2
            style={{
              fontSize: isMobile ? "34px" : "50px",
              fontWeight: 950,
              margin: 0,
              letterSpacing: "-1.5px",
            }}
          >
            새롭게 도착한 상품
          </h2>

          <p
            style={{
              color: "#777",
              marginTop: "14px",
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: 1.7,
            }}
          >
            AETHER가 엄선한 프리미엄 신상품을 만나보세요.
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "#888", fontWeight: 800 }}>
            상품 불러오는 중...
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: isMobile ? "18px 12px" : "26px",
            }}
          >
            {products.map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                style={{
                  background: "rgba(255,255,255,0.92)",
                  color: "#111",
                  textDecoration: "none",
                  borderRadius: isMobile ? "20px" : "26px",
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 18px 50px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "#f6f6f6",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      zIndex: 2,
                      background: "#111",
                      color: "#fff",
                      borderRadius: "999px",
                      padding: "7px 11px",
                      fontSize: "10px",
                      fontWeight: 900,
                      letterSpacing: "1px",
                    }}
                  >
                    NEW
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: isMobile ? "170px" : "270px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div style={{ padding: isMobile ? "14px 8px 18px" : "20px 16px 24px" }}>
                  <p
                    style={{
                      color: "#9b8b73",
                      fontSize: "11px",
                      fontWeight: 950,
                      letterSpacing: "2px",
                      textAlign: "center",
                      marginBottom: "8px",
                    }}
                  >
                    {product.brand}
                  </p>

                  <h3
                    style={{
                      color: "#111",
                      fontSize: isMobile ? "13px" : "15px",
                      lineHeight: "1.45",
                      textAlign: "center",
                      marginBottom: "12px",
                      fontWeight: 800,
                      minHeight: isMobile ? "38px" : "44px",
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      color: "#111",
                      fontSize: isMobile ? "14px" : "16px",
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
      </div>
    </section>
  );
}