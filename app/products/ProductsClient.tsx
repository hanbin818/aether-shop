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
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          color: "#111",
          fontSize: "17px",
          fontWeight: 800,
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
        background: "#fff",
        color: "#111",
        padding: "46px 18px 80px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <section
          style={{
            textAlign: "center",
            padding: "18px 0 34px",
            borderBottom: "1px solid #eee",
            marginBottom: "28px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "4px",
              color: "#999",
              marginBottom: "12px",
            }}
          >
            AETHER COLLECTION
          </p>

          <h1
            style={{
              fontSize: "46px",
              letterSpacing: "8px",
              marginBottom: "14px",
              fontWeight: 900,
            }}
          >
            SHOP
          </h1>

          <p
            style={{
              color: "#777",
              fontSize: "15px",
              lineHeight: "1.6",
            }}
          >
            남성·여성 프리미엄 셀렉션을 만나보세요.
          </p>
        </section>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["ALL", "MEN", "WOMEN"].map((filter) => (
              <button
                key={filter}
                onClick={() => setGenderFilter(filter)}
                style={{
                  padding: "11px 24px",
                  borderRadius: "999px",
                  border:
                    genderFilter === filter
                      ? "1.5px solid #111"
                      : "1px solid #ddd",
                  background: genderFilter === filter ? "#111" : "#fff",
                  color: genderFilter === filter ? "#fff" : "#111",
                  fontWeight: 900,
                  letterSpacing: "2px",
                  cursor: "pointer",
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <input
            placeholder="브랜드, 상품명, 카테고리 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "560px",
              margin: "0 auto",
              display: "block",
              padding: "16px 20px",
              borderRadius: "999px",
              border: "1px solid #ddd",
              background: "#fafafa",
              color: "#111",
              fontSize: "15px",
              outline: "none",
              textAlign: "center",
            }}
          />

          <p
            style={{
              textAlign: "center",
              color: "#888",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            총 {filteredProducts.length}개 상품
          </p>
        </section>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              marginTop: "28px",
              padding: "50px 20px",
              background: "#fafafa",
              borderRadius: "22px",
              textAlign: "center",
              color: "#777",
              border: "1px solid #eee",
            }}
          >
            검색 결과가 없습니다.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "18px",
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
                  borderRadius: "22px",
                  overflow: "hidden",
                  border: "1px solid #eee",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "230px",
                    background: "#f6f6f6",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div style={{ padding: "18px 12px 22px" }}>
                  <p
                    style={{
                      color: "#999",
                      fontSize: "12px",
                      fontWeight: 900,
                      letterSpacing: "2px",
                      textAlign: "center",
                      marginBottom: "9px",
                    }}
                  >
                    {product.brand}
                  </p>

                  <h3
                    style={{
                      color: "#111",
                      fontSize: "15px",
                      lineHeight: "1.4",
                      textAlign: "center",
                      marginBottom: "12px",
                      fontWeight: 800,
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      color: "#111",
                      fontSize: "16px",
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