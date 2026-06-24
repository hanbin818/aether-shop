"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import ProductCard from "../components/ProductCard";

type Product = {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  stock_status?: string;
};

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data: wishlist } = await supabase
      .from("wishlists")
      .select("product_id")
      .eq("user_id", userData.user.id);

    if (!wishlist || wishlist.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const ids = wishlist.map((item) => item.product_id);

    const { data: productData } = await supabase
      .from("products")
      .select("*")
      .in("id", ids);

    setProducts((productData as Product[]) || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
        }}
      >
        불러오는 중...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: "50px 20px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            color: "#9b8b73",
            letterSpacing: "4px",
            fontWeight: 900,
            fontSize: "12px",
            marginBottom: "10px",
          }}
        >
          AETHER MEMBERS
        </p>

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "40px",
          }}
        >
          찜한 상품
        </h1>

        {products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              color: "#777",
            }}
          >
            아직 찜한 상품이 없습니다.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                brand={product.brand}
                name={product.name}
                price={product.price}
                image={product.image}
                href={`/product/${product.id}`}
                stockStatus={product.stock_status}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}