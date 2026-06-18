"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";

export default function MenPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("gender", "MEN")
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
    <main style={mainStyle}>
      <h1 style={titleStyle}>MEN</h1>
      <p style={subTitleStyle}>남성 명품 상품을 만나보세요.</p>

      {loading ? (
        <p>상품 불러오는 중...</p>
      ) : products.length === 0 ? (
        <p>등록된 남성 상품이 없습니다.</p>
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
            />
          ))}
        </div>
      )}
    </main>
  );
}

const mainStyle = {
  minHeight: "100vh",
  background: "#0b0b0f",
  color: "#fff",
  padding: "60px 40px",
};

const titleStyle = {
  fontSize: "48px",
  letterSpacing: "4px",
  marginBottom: "10px",
};

const subTitleStyle = {
  color: "#aaa",
  marginBottom: "40px",
};

const gridStyle = {
  display: "flex",
  gap: "24px",
  flexWrap: "wrap" as const,
  justifyContent: "center",
};