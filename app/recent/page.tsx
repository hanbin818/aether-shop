"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import ProductCard from "../components/ProductCard";

type Product = {
  id: number;
  brand: string;
  name: string;
  price: number;
  image: string;
  stock_status?: string;
};

export default function RecentPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentProducts();
  }, []);

  const loadRecentProducts = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("로그인이 필요한 페이지입니다.");
      window.location.href = "/login";
      return;
    }

    const { data: recentData } = await supabase
      .from("recent_views")
      .select("product_id")
      .eq("user_id", userData.user.id)
      .order("viewed_at", { ascending: false })
      .limit(20);

    if (!recentData || recentData.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const ids = recentData.map((item) => item.product_id);

    const { data: productData } = await supabase
      .from("products")
      .select("*")
      .in("id", ids);

    const sortedProducts =
      ids
        .map((id) => productData?.find((product) => product.id === id))
        .filter(Boolean) || [];

    setProducts(sortedProducts as Product[]);
    setLoading(false);
  };

  if (loading) {
    return <main style={centerStyle}>최근 본 상품 불러오는 중...</main>;
  }

  return (
    <main style={pageStyle}>
      <div style={innerStyle}>
        <a href="/mypage" style={backStyle}>
          ← 마이페이지로 돌아가기
        </a>

        <p style={labelStyle}>AETHER MEMBERS</p>
        <h1 style={titleStyle}>최근 본 상품</h1>

        {products.length === 0 ? (
          <div style={emptyStyle}>아직 최근 본 상품이 없습니다.</div>
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
      </div>
    </main>
  );
}

const centerStyle = {
  minHeight: "100vh",
  background: "#fff",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
};

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fff 0%, #f7f1e8 100%)",
  padding: "54px 18px 90px",
};

const innerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const backStyle = {
  display: "inline-block",
  marginBottom: "34px",
  color: "#9b8b73",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 900,
};

const labelStyle = {
  margin: 0,
  marginBottom: "12px",
  color: "#9b8b73",
  fontSize: "11px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const titleStyle = {
  fontSize: "42px",
  margin: 0,
  marginBottom: "38px",
  fontWeight: 950,
  letterSpacing: "-1.4px",
};

const gridStyle = {
  display: "flex",
  gap: "22px",
  flexWrap: "wrap" as const,
};

const emptyStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "90px 20px",
  textAlign: "center" as const,
  color: "#777",
  fontSize: "15px",
  fontWeight: 800,
  boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
};