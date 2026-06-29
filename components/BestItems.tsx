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
        .eq("is_bestseller", true)
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
      left: direction === "left" ? -220 : 220,
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
          <p className="section-empty-text">
            아직 선택된 베스트 상품이 없습니다.
          </p>
        ) : (
          <div ref={scrollRef} className="best-slider">
            {products.map((product, index) => (
              <a key={product.id} href={`/product/${product.id}`} className="best-card">
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

                  <img src={product.image} alt={product.name} className="best-image" />
                </div>

                <div className="best-info">
                  <p className="best-brand">{product.brand}</p>
                  <h3 className="best-name">{product.name}</h3>
                  <p className="best-price">₩{Number(product.price).toLocaleString()}</p>
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
          background: #111;
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
        }

        .best-slider {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 8px 2px 28px;
          -webkit-overflow-scrolling: touch;
        }

        .best-slider::-webkit-scrollbar {
          display: none;
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
        }

        .best-image {
          width: 100%;
          height: 330px;
          object-fit: cover;
          display: block;
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
          margin: 0 0 12px;
          min-height: 46px;
          font-weight: 900;
        }

        .best-price {
          font-size: 17px;
          font-weight: 950;
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
          margin-top: 28px;
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
            padding: 64px 0;
          }

          .best-inner {
            padding: 0;
          }

          .title-row {
            display: block;
            text-align: center;
            margin-bottom: 28px;
            padding: 0 18px;
          }

          .title-row h2 {
            font-size: 32px;
            letter-spacing: -1px;
          }

          .title-row span {
            font-size: 14px;
          }

          .arrow-wrap {
            justify-content: center;
            margin-top: 22px;
          }

          .arrow-wrap button {
            width: 44px;
            height: 44px;
          }

          .best-slider {
            gap: 12px;
            padding: 4px 18px 18px;
          }

          .best-card {
            flex: 0 0 158px;
            border-radius: 22px;
          }

          .best-image {
            height: 175px;
          }

          .rank-badge {
            top: 10px;
            left: 10px;
            padding: 6px 10px;
            font-size: 9px;
          }

          .wish-button {
            width: 32px;
            height: 32px;
            top: 9px;
            right: 9px;
            font-size: 18px;
          }

          .best-info {
            padding: 14px 10px 16px;
          }

          .best-brand {
            font-size: 9px;
            letter-spacing: 2px;
          }

          .best-name {
            font-size: 12px;
            min-height: 34px;
          }

          .best-price {
            font-size: 13px;
          }

          .shop-label {
            height: 30px;
            padding: 0 13px;
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}