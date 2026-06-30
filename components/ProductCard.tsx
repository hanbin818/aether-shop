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
};

export default function ProductCard({
  brand,
  name,
  price,
  image,
  href,
  stockStatus = "available",
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const normalizedStock = stockStatus.toLowerCase().replace(/[_-\s]/g, "");
  const isSoldOut = normalizedStock === "soldout";
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
            type="button"
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
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none;
          color: #111;
          display: block;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
        }

        .imageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #f7f7f7;
          overflow: hidden;
        }

        .imageWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .soldOutImage {
          opacity: 0.35;
        }

        .heart {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.96);
          color: #2f80ed;
          font-size: 16px;
          cursor: pointer;
          z-index: 5;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
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
          z-index: 4;
        }

        .info {
          padding: 12px 12px 14px;
        }

        .brand {
          font-size: 11px;
          color: #8f826f;
          font-weight: 800;
          margin-bottom: 7px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .name {
          font-size: 15px;
          font-weight: 900;
          line-height: 1.35;
          min-height: 40px;
          word-break: keep-all;
        }

        .price {
          margin-top: 10px;
          font-size: 15px;
          font-weight: 950;
        }

        @media (max-width: 768px) {
          .card {
            border-radius: 16px;
          }

          .imageWrap {
            aspect-ratio: 1 / 1;
          }

          .heart {
            width: 26px;
            height: 26px;
            font-size: 15px;
          }

          .info {
            padding: 10px 10px 12px;
          }

          .brand {
            font-size: 10px;
            margin-bottom: 6px;
          }

          .name {
            font-size: 14px;
            min-height: 38px;
          }

          .price {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}