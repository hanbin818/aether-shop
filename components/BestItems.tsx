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
      <div className="best-inner">
        <div className="best-title">
          <p>BEST SELLER</p>
          <h2>가장 사랑받는 상품</h2>
          <span>AETHER가 추천하는 프리미엄 인기 셀렉션</span>
        </div>

        {loading ? (
          <p className="section-empty-text">상품 불러오는 중...</p>
        ) : products.length === 0 ? (
          <p className="section-empty-text">등록된 판매 상품이 없습니다.</p>
        ) : (
          <div className="best-grid">
            {products.map((product, index) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="best-card"
              >
                <div className="image-box">
                  <span className="rank-badge">BEST {index + 1}</span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="best-image"
                  />
                </div>

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

        <div className="more-wrap">
          <a href="/products" className="more-button">
            베스트 상품 더 보기
          </a>
        </div>
      </div>

      <style jsx>{`
        .best-section {
          background:
            radial-gradient(circle at top, rgba(201, 168, 106, 0.14), transparent 34%),
            #111;
          color: #fff;
          padding: 100px 40px;
        }

        .best-inner {
          max-width: 1180px;
          margin: 0 auto;
        }

        .best-title {
          text-align: center;
          margin-bottom: 58px;
        }

        .best-title p {
          color: #d8c39f;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 5px;
          margin-bottom: 14px;
        }

        .best-title h2 {
          font-size: 58px;
          font-weight: 950;
          letter-spacing: -1.8px;
          margin: 0;
        }

        .best-title span {
          display: block;
          margin-top: 16px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 16px;
          line-height: 1.7;
        }

        .best-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          width: 100%;
        }

        .best-card {
          width: 100%;
          background: #fff;
          color: #111;
          text-decoration: none;
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.34);
          transition: 0.35s ease;
        }

        .best-card:hover {
          transform: translateY(-8px);
        }

        .image-box {
          position: relative;
          background: #f4f4f4;
          overflow: hidden;
        }

        .rank-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          background: #111;
          color: #fff;
          border-radius: 999px;
          padding: 8px 13px;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 1px;
        }

        .best-image {
          width: 100%;
          height: 286px;
          object-fit: cover;
          background: #f5f5f5;
          display: block;
          transition: 0.35s ease;
        }

        .best-card:hover .best-image {
          transform: scale(1.05);
        }

        .best-info {
          padding: 22px 18px 26px;
        }

        .best-brand {
          font-size: 11px;
          color: #9b8b73;
          font-weight: 950;
          letter-spacing: 2px;
          margin-bottom: 8px;
          text-align: center;
        }

        .best-name {
          font-size: 16px;
          line-height: 1.45;
          color: #111;
          margin-bottom: 12px;
          text-align: center;
          min-height: 46px;
          font-weight: 900;
          word-break: keep-all;
        }

        .best-price {
          font-size: 17px;
          font-weight: 950;
          color: #111;
          text-align: center;
        }

        .section-empty-text {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 800;
        }

        .more-wrap {
          text-align: center;
          margin-top: 44px;
        }

        .more-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          padding: 0 34px;
          border-radius: 999px;
          background: #fff;
          color: #111;
          text-decoration: none;
          font-size: 15px;
          font-weight: 950;
        }

        @media (max-width: 768px) {
          .best-section {
            padding: 64px 16px;
          }

          .best-title {
            margin-bottom: 36px;
          }

          .best-title h2 {
            font-size: 38px;
          }

          .best-title span {
            font-size: 14px;
          }

          .best-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px 12px;
          }

          .best-card {
            border-radius: 22px;
          }

          .best-image {
            height: 178px;
          }

          .best-info {
            padding: 16px 10px 20px;
          }

          .best-brand {
            font-size: 11px;
          }

          .best-name {
            font-size: 13px;
            min-height: 38px;
          }

          .best-price {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}