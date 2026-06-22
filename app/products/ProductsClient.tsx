"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [genderFilter, setGenderFilter] = useState("ALL");

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

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

  const filteredProducts = products.filter((product) => {
    const keyword = search.trim().toLowerCase();

    const matchesSearch =
      keyword === "" ||
      product.name?.toLowerCase().includes(keyword) ||
      product.brand?.toLowerCase().includes(keyword) ||
      product.category?.toLowerCase().includes(keyword) ||
      product.gender?.toLowerCase().includes(keyword);

    const matchesGender =
      genderFilter === "ALL" ||
      product.gender?.toUpperCase() === genderFilter;

    return matchesSearch && matchesGender;
  });

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0b0b0f",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "800",
        }}
      >
        상품 불러오는 중...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        padding: "34px 16px 60px",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "38px",
            letterSpacing: "2px",
            marginBottom: "10px",
          }}
        >
          SHOP
        </h1>

        <p style={{ color: "#aaa", marginBottom: "24px", fontSize: "14px" }}>
          AETHER의 남성·여성 럭셔리 상품을 만나보세요.
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "18px",
            flexWrap: "wrap",
          }}
        >
          {["ALL", "MEN", "WOMEN"].map((filter) => (
            <button
              key={filter}
              onClick={() => setGenderFilter(filter)}
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                border:
                  genderFilter === filter
                    ? "1px solid white"
                    : "1px solid #333",
                background: genderFilter === filter ? "white" : "transparent",
                color: genderFilter === filter ? "#111" : "white",
                fontWeight: "800",
                letterSpacing: "1px",
                cursor: "pointer",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <input
          placeholder="브랜드, 상품명, 카테고리 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "15px 16px",
            borderRadius: "14px",
            border: "1px solid #333",
            background: "#151515",
            color: "white",
            fontSize: "15px",
            outline: "none",
          }}
        />

        <p style={{ color: "#aaa", marginTop: "16px", fontSize: "14px" }}>
          {filteredProducts.length}개 상품
        </p>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              marginTop: "28px",
              padding: "42px 20px",
              background: "#151515",
              borderRadius: "20px",
              textAlign: "center",
              color: "#aaa",
            }}
          >
            검색 결과가 없습니다.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px 14px",
              marginTop: "28px",
            }}
          >
            {filteredProducts.map((product) => (
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
    </main>
  );
}