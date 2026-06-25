"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type ProductCardProps = {
  brand: string;
  name: string;
  price: string;
  image: string;
  href: string;
  stockStatus?: string;
  stockQuantity?: number;
};

export default function ProductCard({
  brand,
  name,
  price,
  image,
  href,
  stockStatus = "available",
  stockQuantity,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const normalizedStock = stockStatus.toLowerCase().replace(/[_-\s]/g, "");
  const isSoldOut =
    normalizedStock === "soldout" || Number(stockQuantity || 0) <= 0;

  const productId = Number(href.split("/").pop());

  useEffect(() => {
    const checkWishlist = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user || !productId) return;

      setUserId(data.user.id);

      const { data: wishlistData } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", data.user.id)
        .eq("product_id", productId)
        .maybeSingle();

      setIsWishlisted(!!wishlistData);
    };

    checkWishlist();
  }, [productId]);

  const toggleWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      alert("로그인 후 찜할 수 있습니다.");
      window.location.href = "/login";
      return;
    }

    const currentUserId = userId || data.user.id;

    if (isWishlisted) {
      await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", currentUserId)
        .eq("product_id", productId);

      setIsWishlisted(false);
    } else {
      await supabase.from("wishlists").insert({
        user_id: currentUserId,
        product_id: productId,
      });

      setIsWishlisted(true);
    }
  };

  return (
    <>
      <a href={href} className="card">
        <div className="imageWrap">
          <button
            onClick={toggleWishlist}
            className={isWishlisted ? "heart active" : "heart"}
          >
            {isWishlisted ? "♥" : "♡"}
          </button>

          <img
            src={image}
            alt={name}
            className={isSoldOut ? "soldOutImage" : ""}
          />

          {isSoldOut && <div className="soldOut">품절</div>}
        </div>

        <div className="info">
          <div className="brand">{brand}</div>

          <div className="name">{name}</div>

          <div className="price">{price}</div>

          <div className="detail">자세히 보기 →</div>
        </div>
      </a>

      <style jsx>{`
        .card {
          width: 100%;
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          color: #111;
          transition: .25s;
          box-shadow: 0 6px 18px rgba(0,0,0,.06);
          border: 1px solid rgba(0,0,0,.05);
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 34px rgba(0,0,0,.12);
        }

        .imageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 0.9;
          background: #fafafa;
          overflow: hidden;
        }

        .imageWrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: .35s;
        }

        .card:hover img {
          transform: scale(1.04);
        }

        .soldOutImage {
          opacity: .35;
        }

        .heart {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,.96);
          font-size: 17px;
          cursor: pointer;
          z-index: 5;
          box-shadow: 0 3px 10px rgba(0,0,0,.12);
        }

        .heart.active {
          background:#111;
          color:#fff;
        }

        .soldOut {
          position:absolute;
          left:50%;
          top:50%;
          transform:translate(-50%,-50%);
          background:#111;
          color:#fff;
          padding:8px 16px;
          border-radius:999px;
          font-size:12px;
          font-weight:900;
        }

        .info {
          padding:10px;
        }

        .brand {
          font-size:9px;
          color:#9b8b73;
          letter-spacing:2px;
          font-weight:900;
          margin-bottom:5px;
        }

        .name {
          font-size:12px;
          font-weight:800;
          line-height:1.35;
          height:32px;
          overflow:hidden;
        }

        .price {
          margin-top:10px;
          font-size:14px;
          font-weight:900;
        }

        .detail {
          margin-top:8px;
          font-size:10px;
          color:#888;
          font-weight:800;
        }

        @media (max-width:768px){

          .imageWrap{
            aspect-ratio:1 / .82;
          }

          .heart{
            width:26px;
            height:26px;
            font-size:15px;
          }

          .info{
            padding:8px;
          }

          .brand{
            font-size:8px;
          }

          .name{
            font-size:11px;
            height:28px;
          }

          .price{
            font-size:13px;
            margin-top:8px;
          }

          .detail{
            font-size:9px;
          }

        }

      `}</style>
    </>
  );
}