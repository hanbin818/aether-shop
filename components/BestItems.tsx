"use client";

import { useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";

export default function BestItems() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestItems = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("stock_status", "available")
        .order("id", { ascending: false })
        .limit(4);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    fetchBestItems();
  }, []);

  return (
    <section className="best-section">
      <div className="section-title-row">
        <div>
          <h2>BEST ITEM</h2>
          <p>AETHER가 추천하는 최신 인기 상품</p>
        </div>
      </div>

      {loading ? (
        <p className="section-empty-text">상품 불러오는 중...</p>
      ) : products.length === 0 ? (
        <p className="section-empty-text">등록된 판매 상품이 없습니다.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "18px 14px",
            width: "100%",
          }}
        >
          {products.map((product) => (
            <a
              key={product.id}
              href={`/product/${product.id}`}
              style={{
                width: "100%",
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

              <div style={{ padding: "10px 4px 6px" }}>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#888",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    marginBottom: "6px",
                    textAlign: "center",
                  }}
                >
                  {product.brand}
                </p>

                <h3
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.35",
                    color: "#111",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#111",
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
    </section>
  );
}