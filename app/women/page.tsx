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
    <main className="gender-page">
      <a href="/home" className="home-button">
        ← 메인으로
      </a>

      <section className="gender-hero">
        <h1>WOMEN</h1>
        <p>여성 명품 컬렉션을 만나보세요.</p>
      </section>

      {loading ? (
        <p className="empty-text">상품 불러오는 중...</p>
      ) : products.length === 0 ? (
        <p className="empty-text">등록된 여성 상품이 없습니다.</p>
      ) : (
        <section className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              brand={product.brand}
              name={product.name}
              price={`₩${Number(product.price).toLocaleString()}`}
              image={product.image}
              href={`/product/${product.id}`}
              stockStatus={product.stock_status}
              stockQuantity={product.stock_quantity}
            />
          ))}
        </section>
      )}

      <style>{`
        .gender-page {
          min-height: 100vh;
          background: #07080c;
          color: #fff;
          padding: 22px 14px 70px;
        }

        .home-button {
          display: inline-block;
          color: #111;
          background: rgba(255,255,255,0.94);
          text-decoration: none;
          padding: 9px 15px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 950;
          margin-bottom: 24px;
        }

        .gender-hero {
          max-width: 1180px;
          margin: 0 auto 28px;
        }

        .gender-hero h1 {
          font-size: clamp(48px, 14vw, 110px);
          font-weight: 950;
          letter-spacing: -3px;
          margin: 0;
        }

        .gender-hero p {
          font-size: 16px;
          color: rgba(255,255,255,0.66);
          margin: 10px 0 0;
        }

        .product-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 13px;
        }

        .empty-text {
          text-align: center;
          color: rgba(255,255,255,0.72);
          padding: 70px 0;
          font-weight: 800;
        }

        @media (max-width: 1180px) {
          .product-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .gender-page {
            padding: 16px 6px 60px;
          }

          .home-button {
            margin-left: 4px;
            padding: 7px 11px;
            font-size: 10px;
            margin-bottom: 18px;
          }

          .gender-hero {
            padding: 0 6px;
            margin-bottom: 20px;
          }

          .gender-hero h1 {
            font-size: 38px;
            letter-spacing: -1px;
          }

          .gender-hero p {
            font-size: 12px;
          }

          .product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 8px;
          }
        }
      `}</style>
    </main>
  );
}