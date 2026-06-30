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
        </div>
      </a>

      <style jsx>{`
        .card {
          width: 100%;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: #111;
          transition: 0.25s;
          box-shadow: 0 5px 14px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
          display: block;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1);
        }

        .imageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 0.78;
          background: #fafafa;
          overflow: hidden;
        }

        .imageWrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: 0.35s;
        }

        .card:hover img {
          transform: scale(1.04);
        }

        .soldOutImage {
          opacity: 0.35;
        }

        .heart {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 27px;
          height: 27px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.96);
          font-size: 15px;
          cursor: pointer;
          z-index: 5;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
        }

        .heart.active {
          background: #111;
          color: #fff;
        }

        .soldOut {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #111;
          color: #fff;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
        }

        .info {
          padding: 8px 9px 9px;
        }

        .brand {
          font-size: 8px;
          color: #9b8b73;
          letter-spacing: 1.4px;
          font-weight: 900;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .name {
          font-size: 11px;
          font-weight: 800;
          line-height: 1.25;
          height: 27px;
          overflow: hidden;
        }

        .price {
          margin-top: 6px;
          font-size: 12px;
          font-weight: 950;
        }

        @media (max-width: 768px) {
          .card {
            border-radius: 9px;
            box-shadow: 0 3px 9px rgba(0, 0, 0, 0.05);
          }

          .imageWrap {
            aspect-ratio: 1 / 0.72;
          }

          .heart {
            top: 4px;
            right: 4px;
            width: 21px;
            height: 21px;
            font-size: 12px;
          }

          .info {
            padding: 5px 5px 6px;
          }

          .brand {
            font-size: 6.5px;
            letter-spacing: 0.7px;
            margin-bottom: 2px;
          }

          .name {
            font-size: 8.5px;
            line-height: 1.2;
            height: 20px;
          }

          .price {
            margin-top: 4px;
            font-size: 9px;
          }

          .soldOut {
            padding: 5px 9px;
            font-size: 9px;
          }
        }
      `}</style>
    </>
  );
}