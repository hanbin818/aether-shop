"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../app/lib/supabase";

export default function BestItems() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchBestItems = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("stock_status", "available")
        .order("id", { ascending: false })
        .limit(10);

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

  const moveSlide = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="best-section">
      <div className="best-inner">
        <div className="title-row">
          <div>
            <p>BEST SELLER</p>
            <h2>가장 사랑받는 상품</h2>
            <span>AETHER가 추천하는 프리미엄 인기 셀렉션</span>
          </div>

          <div className="arrow-wrap">
            <button onClick={() => moveSlide("left")}>‹</button>
            <button onClick={() => moveSlide("right")}>›</button>
          </div>
        </div>

        {loading ? (
          <p className="section-empty-text">상품 불러오는 중...</p>
        ) : products.length === 0 ? (
          <p className="section-empty-text">등록된 판매 상품이 없습니다.</p>
        ) : (
          <div ref={scrollRef} className="best-slider">
            {products.map((product, index) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="best-card"
              >
                <div className="image-box">
                  <span className="rank-badge">BEST {index + 1}</span>
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
                    className="best-image"
                  />
                </div>

                <div className="best-info">
                  <p className="best-brand">{product.brand}</p>
                  <h3 className="best-name">{product.name}</h3>
                  <p className="best-price">
                    ₩{Number(product.price).toLocaleString()}
                  </p>
                  <span className="shop-label">바로 보기</span>
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
            radial-gradient(circle at top left, rgba(216, 195, 159, 0.18), transparent 34%),
            radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.08), transparent 28%),
            #111;
          color: #fff;
          padding: 104px 0;
          overflow: hidden;
        }

        .best-inner {
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
          color: #d8c39f;
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
          color: rgba(255, 255, 255, 0.68);
          font-size: 16px;
          line-height: 1.7;
        }

        .arrow-wrap {
          display: flex;
          gap: 10px;
        }

        .arrow-wrap button {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-size: 32px;
          cursor: pointer;
          line-height: 1;
          transition: 0.25s ease;
        }

        .arrow-wrap button:hover {
          background: #fff;
          color: #111;
        }

        .best-slider {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 8px 2px 28px;
        }

        .best-slider::-webkit-scrollbar {
          height: 6px;
        }

        .best-slider::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.35);
          border-radius: 999px;
        }

        .best-card {
          flex: 0 0 276px;
          scroll-snap-align: start;
          background: #fff;
          color: #111;
          text-decoration: none;
          border-radius: 30px;
          overflow: hidden;
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

        .best-image {
          width: 100%;
          height: 330px;
          object-fit: cover;
          background: #f5f5f5;
          display: block;
          transition: 0.35s ease;
        }

        .best-card:hover .best-image {
          transform: scale(1.06);
        }

        .best-info {
          padding: 22px 18px 24px;
          text-align: center;
        }

        .best-brand {
          font-size: 11px;
          color: #9b8b73;
          font-weight: 950;
          letter-spacing: 2px;
          margin: 0 0 8px;
          text-transform: uppercase;
        }

        .best-name {
          font-size: 16px;
          line-height: 1.45;
          color: #111;
          margin: 0 0 12px;
          min-height: 46px;
          font-weight: 900;
          word-break: keep-all;
        }

        .best-price {
          font-size: 17px;
          font-weight: 950;
          color: #111;
          margin: 0 0 14px;
        }

        .shop-label {
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

        .section-empty-text {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
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
          background: #fff;
          color: #111;
          text-decoration: none;
          font-size: 15px;
          font-weight: 950;
        }

        @media (max-width: 768px) {
          .best-section {
            padding: 72px 0;
          }

          .best-inner {
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

          .best-slider {
            gap: 16px;
            padding-bottom: 22px;
          }

          .best-card {
            flex-basis: 238px;
            border-radius: 24px;
          }

          .best-image {
            height: 270px;
          }

          .best-info {
            padding: 18px 12px 22px;
          }

          .best-name {
            font-size: 14px;
          }

          .best-price {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}