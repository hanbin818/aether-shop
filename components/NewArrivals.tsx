"use client";

import { useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";

export default function NewArrivals() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        background: "#fff",
        color: "#111",
        padding: "44px 16px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 900 }}>신상품</h2>
          <p style={{ color: "#888", marginTop: "8px", fontSize: "14px" }}>
            새롭게 등록된 프리미엄 상품
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "#888" }}>
            상품 불러오는 중...
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "18px 14px",
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
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "170px",
                    objectFit: "cover",
                    background: "#f5f5f5",
                  }}
                />

                <div style={{ padding: "12px 6px 14px" }}>
                  <p
                    style={{
                      color: "#888",
                      fontSize: "11px",
                      fontWeight: 900,
                      letterSpacing: "1px",
                      textAlign: "center",
                      marginBottom: "7px",
                    }}
                  >
                    {product.brand}
                  </p>

                  <h3
                    style={{
                      color: "#111",
                      fontSize: "13px",
                      lineHeight: "1.35",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      color: "#111",
                      fontSize: "14px",
                      fontWeight: 900,
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