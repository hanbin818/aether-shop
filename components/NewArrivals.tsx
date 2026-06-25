"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../app/lib/supabase";

export default function NewArrivals() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("stock_status", "available")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    fetchNewProducts();
  }, []);

  const moveSlide = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="new-section">
      <div className="new-inner">
        <div className="title-row">
          <div>
            <p>NEW COLLECTION</p>
            <h2>새롭게 도착한 상품</h2>
            <span>AETHER가 엄선한 프리미엄 신상품을 가장 먼저 만나보세요.</span>
          </div>

          <div className="arrow-wrap">
            <button onClick={() => moveSlide("left")}>‹</button>
            <button onClick={() => moveSlide("right")}>›</button>
          </div>
        </div>

        {loading ? (
          <p className="empty-text">상품 불러오는 중...</p>
        ) : products.length === 0 ? (
          <p className="empty-text">등록된 신상품이 없습니다.</p>
        ) : (
          <div ref={scrollRef} className="new-slider">
            {products.map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="new-card"
              >
                <div className="image-box">
                  <span className="new-badge">NEW</span>

                  <button
                    type="button"
                    className="wish-button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      alert("상품 상세페이지에서 찜할 수 있습니다.");
                    }}
                  >
                    ♡
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="new-image"
                  />
                </div>

                <div className="new-info">
                  <p className="new-brand">{product.brand}</p>
                  <h3>{product.name}</h3>
                  <p className="new-price">
                    ₩{Number(product.price).toLocaleString()}
                  </p>
                  <span className="view-label">바로 보기</span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="more-wrap">
          <a href="/products" className="more-button">
            신상품 더 보기
          </a>
        </div>
      </div>

      <style jsx>{`
        .new-section {
          background: linear-gradient(180deg, #fff 0%, #f8f3eb 100%);
          color: #111;
          padding: 100px 0;
          overflow: hidden;
        }

        .new-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 42px;
        }

        .title-row p {
          color: #9b8b73;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 5px;
          margin: 0 0 14px;
        }

        .title-row h2 {
          font-size: clamp(38px, 6vw, 62px);
          font-weight: 950;
          letter-spacing: -1.8px;
          margin: 0;
        }

        .title-row span {
          display: block;
          margin-top: 14px;
          color: #777;
          font-size: 16px;
          line-height: 1.7;
          word-break: keep-all;
        }

        .arrow-wrap {
          display: flex;
          gap: 10px;
        }

        .arrow-wrap button {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fff;
          color: #111;
          font-size: 32px;
          cursor: pointer;
          line-height: 1;
          transition: 0.25s ease;
        }

        .arrow-wrap button:hover {
          background: #111;
          color: #fff;
        }

        .new-slider {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 8px 2px 26px;
        }

        .new-slider::-webkit-scrollbar {
          height: 6px;
        }

        .new-slider::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 999px;
        }

        .new-card {
          flex: 0 0 276px;
          scroll-snap-align: start;
          background: #fff;
          color: #111;
          text-decoration: none;
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 24px 70px rgba(0,0,0,0.08);
          transition: 0.35s ease;
        }

        .new-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 90px rgba(0,0,0,0.14);
        }

        .image-box {
          position: relative;
          background: #f6f6f6;
          overflow: hidden;
        }

        .new-badge {
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

        .wish-button {
          position: absolute;
          top: 13px;
          right: 13px;
          z-index: 2;
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: none;
          background: rgba(255,255,255,0.92);
          color: #111;
          font-size: 22px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .new-image {
          width: 100%;
          height: 330px;
          object-fit: cover;
          background: #f5f5f5;
          display: block;
          transition: 0.35s ease;
        }

        .new-card:hover .new-image {
          transform: scale(1.06);
        }

        .new-info {
          padding: 22px 18px 24px;
          text-align: center;
        }

        .new-brand {
          font-size: 11px;
          color: #9b8b73;
          font-weight: 950;
          letter-spacing: 2px;
          margin: 0 0 8px;
          text-transform: uppercase;
        }

        .new-info h3 {
          font-size: 16px;
          line-height: 1.45;
          color: #111;
          margin: 0 0 12px;
          min-height: 46px;
          font-weight: 900;
          word-break: keep-all;
        }

        .new-price {
          font-size: 17px;
          font-weight: 950;
          color: #111;
          margin: 0 0 14px;
        }

        .view-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          padding: 0 18px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          font-size: 12px;
          font-weight: 950;
        }

        .empty-text {
          text-align: center;
          color: #888;
          font-weight: 800;
        }

        .more-wrap {
          text-align: center;
          margin-top: 34px;
        }

        .more-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          padding: 0 34px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 950;
        }

        @media (max-width: 768px) {
          .new-section {
            padding: 72px 0;
          }

          .new-inner {
            padding: 0 16px;
          }

          .title-row {
            display: block;
            text-align: center;
            margin-bottom: 34px;
          }

          .title-row h2 {
            font-size: 38px;
          }

          .title-row span {
            font-size: 14px;
          }

          .arrow-wrap {
            justify-content: center;
            margin-top: 24px;
          }

          .new-slider {
            gap: 16px;
            padding-bottom: 22px;
          }

          .new-card {
            flex-basis: 238px;
            border-radius: 24px;
          }

          .new-image {
            height: 270px;
          }

          .new-info {
            padding: 18px 12px 22px;
          }

          .new-info h3 {
            font-size: 14px;
          }

          .new-price {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}