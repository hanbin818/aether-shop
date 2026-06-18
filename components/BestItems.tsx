"use client";

import { useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";
import ProductCard from "./ProductCard";

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
    <section
      style={{
        background: "white",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          color: "#111",
          marginBottom: "6px",
          fontWeight: "800",
        }}
      >
        BEST ITEM
      </h2>

      <p
        style={{
          color: "#888",
          fontSize: "13px",
          marginBottom: "24px",
        }}
      >
        AETHER가 추천하는 최신 인기 상품
      </p>

      {loading ? (
        <p style={{ color: "#777" }}>상품 불러오는 중...</p>
      ) : products.length === 0 ? (
        <p style={{ color: "#777" }}>등록된 판매 상품이 없습니다.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            maxWidth: "1100px",
            margin: "0 auto",
            justifyItems: "center",
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              brand={product.brand}
              name={product.name}
              price={`₩${Number(product.price).toLocaleString()}`}
              image={product.image}
              href={`/product/${product.id}`}
              stockStatus={product.stock_status}
            />
          ))}
        </div>
      )}
    </section>
  );
}