"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";

export default function WomenPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("gender", "WOMEN")
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <main style={pageStyle}>
      <button style={homeButtonStyle} onClick={() => (window.location.href = "/")}>
        ← 메인으로
      </button>

      <section style={heroStyle}>
        <h1 style={titleStyle}>WOMEN</h1>
        <p style={descStyle}>여성 명품 컬렉션을 만나보세요.</p>
      </section>

      {loading ? (
        <p style={emptyTextStyle}>상품 불러오는 중...</p>
      ) : products.length === 0 ? (
        <p style={emptyTextStyle}>등록된 여성 상품이 없습니다.</p>
      ) : (
        <div style={gridStyle}>
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
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#07080c",
  color: "#fff",
  padding: "22px 14px 60px",
};

const homeButtonStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  borderRadius: "999px",
  padding: "10px 16px",
  fontSize: "14px",
  fontWeight: 700,
  marginBottom: "28px",
  cursor: "pointer",
};

const heroStyle: React.CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto 30px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(52px, 15vw, 120px)",
  fontWeight: 900,
  letterSpacing: "-4px",
  margin: 0,
};

const descStyle: React.CSSProperties = {
  fontSize: "clamp(16px, 4vw, 24px)",
  color: "rgba(255,255,255,0.65)",
  marginTop: "12px",
};

const gridStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1180px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "14px",
};

const emptyTextStyle: React.CSSProperties = {
  textAlign: "center",
  color: "rgba(255,255,255,0.7)",
  padding: "80px 0",
};