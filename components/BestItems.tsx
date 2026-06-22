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
        <div className="best-grid">
          {products.map((product) => (
            <a key={product.id} href={`/product/${product.id}`} className="best-card">
              <img src={product.image} alt={product.name} className="best-image" />

              <div className="best-info">
                <p className="best-brand">{product.brand}</p>
                <h3 className="best-name">{product.name}</h3>
                <p className="best-price">
                  ₩{Number(product.price).toLocaleString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        .best-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          width: 100%;
        }

        .best-card {
          width: 100%;
          background: #fff;
          color: #111;
          text-decoration: none;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #eee;
        }

        .best-image {
          width: 100%;
          height: 240px;
          object-fit: cover;
          background: #f5f5f5;
          display: block;
        }

        .best-info {
          padding: 14px 8px 12px;
        }

        .best-brand {
          font-size: 12px;
          color: #888;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 7px;
          text-align: center;
        }

        .best-name {
          font-size: 14px;
          line-height: 1.35;
          color: #111;
          margin-bottom: 9px;
          text-align: center;
          min-height: 38px;
        }

        .best-price {
          font-size: 15px;
          font-weight: 900;
          color: #111;
          text-align: center;
        }

        @media (max-width: 768px) {
          .best-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px 12px;
          }

          .best-image {
            height: 170px;
          }

          .best-card {
            border-radius: 14px;
          }

          .best-info {
            padding: 10px 5px 8px;
          }

          .best-brand {
            font-size: 11px;
          }

          .best-name {
            font-size: 13px;
          }

          .best-price {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}