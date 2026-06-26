"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  gender?: string;
  description?: string;
  stock_status?: string;
  stock_quantity?: number;
};

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const images =
        data.images && data.images.length > 0
          ? data.images
          : data.image
          ? [data.image]
          : [];

      setProduct(data);
      setSelectedImage(images[0] || "");
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .neq("id", product.id)
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) {
        console.error(error);
        return;
      }

      setRelatedProducts(data || []);
    };

    fetchRelatedProducts();
  }, [product]);

  useEffect(() => {
    const saveRecentView = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) return;

      await supabase.from("recent_views").upsert(
        {
          user_id: user.id,
          product_id: Number(id),
          viewed_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,product_id",
        }
      );
    };

    saveRecentView();
  }, [id]);

  useEffect(() => {
    const checkWishlist = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) return;

      const { data } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", Number(id))
        .maybeSingle();

      setIsWished(!!data);
    };

    checkWishlist();
  }, [id]);

  const productImages =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  const selectedIndex = productImages.findIndex((img) => img === selectedImage);

  const goPrevImage = () => {
    if (productImages.length <= 1) return;

    const currentIndex = selectedIndex >= 0 ? selectedIndex : 0;
    const prevIndex =
      currentIndex === 0 ? productImages.length - 1 : currentIndex - 1;

    setSelectedImage(productImages[prevIndex]);
  };

  const goNextImage = () => {
    if (productImages.length <= 1) return;

    const currentIndex = selectedIndex >= 0 ? selectedIndex : 0;
    const nextIndex =
      currentIndex === productImages.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(productImages[nextIndex]);
  };

  const handleTouchEnd = (endX: number) => {
    if (touchStartX === null) return;

    const distance = touchStartX - endX;

    if (distance > 45) {
      goNextImage();
    }

    if (distance < -45) {
      goPrevImage();
    }

    setTouchStartX(null);
  };

  const toggleWishlist = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("로그인 후 찜할 수 있습니다.");
      window.location.href = "/login";
      return;
    }

    if (isWished) {
      await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", Number(id));

      setIsWished(false);
      alert("찜 목록에서 삭제되었습니다.");
    } else {
      await supabase.from("wishlists").insert({
        user_id: user.id,
        product_id: Number(id),
      });

      setIsWished(true);
      alert("찜 목록에 추가되었습니다.");
    }
  };

  const normalizedStock = product?.stock_status
    ?.toLowerCase()
    .replace(/[_-\s]/g, "");

  const isSoldOut =
    normalizedStock === "soldout" || Number(product?.stock_quantity || 0) <= 0;

  const addToCart = () => {
    if (!product) return;

    if (isSoldOut) {
      alert("품절 상품은 장바구니에 담을 수 없습니다.");
      return;
    }

    const oldCart = localStorage.getItem("aether-cart");
    const cart = oldCart ? JSON.parse(oldCart) : [];

    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );

      localStorage.setItem("aether-cart", JSON.stringify(updatedCart));
    } else {
      cart.push({
        ...product,
        image: productImages[0] || product.image,
        images: productImages,
        quantity: 1,
      });

      localStorage.setItem("aether-cart", JSON.stringify(cart));
    }

    alert(`${product.name} 장바구니에 담았습니다.`);
  };

  const buyNow = () => {
    if (!product) return;

    if (isSoldOut) {
      alert("품절 상품은 구매할 수 없습니다.");
      return;
    }

    addToCart();
    window.location.href = "/cart";
  };

  if (loading) return <main style={centerStyle}>상품 불러오는 중...</main>;
  if (!product) return <main style={centerStyle}>상품을 찾을 수 없습니다.</main>;

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <a href="/products" style={backLinkStyle}>
          ← 전체상품으로 돌아가기
        </a>

        <div
          style={{
            ...detailGridStyle,
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
            gap: isMobile ? "24px" : "72px",
          }}
        >
          <div>
            <div
              style={{
                ...imageBoxStyle,
                borderRadius: isMobile ? "24px" : "34px",
                minHeight: isMobile ? "390px" : "650px",
              }}
              onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
            >
              <img
                src={selectedImage || product.image}
                alt={product.name}
                style={{
                  ...mainImageStyle,
                  maxHeight: isMobile ? "390px" : "650px",
                  padding: isMobile ? "18px" : "34px",
                  opacity: isSoldOut ? 0.34 : 1,
                }}
              />

              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrevImage}
                    style={{
                      ...slideButtonStyle,
                      left: isMobile ? "12px" : "20px",
                    }}
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={goNextImage}
                    style={{
                      ...slideButtonStyle,
                      right: isMobile ? "12px" : "20px",
                    }}
                  >
                    ›
                  </button>

                  <div style={imageCountStyle}>
                    {(selectedIndex >= 0 ? selectedIndex : 0) + 1} /{" "}
                    {productImages.length}
                  </div>
                </>
              )}

              {isSoldOut && <div style={soldOutOverlayStyle}>품절</div>}
            </div>

            {productImages.length > 1 && (
              <div style={thumbnailWrapStyle}>
                {productImages.map((image, index) => {
                  const active = image === selectedImage;

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      style={{
                        ...thumbnailButtonStyle,
                        border: active ? "2px solid #111" : "1px solid #ddd",
                        opacity: active ? 1 : 0.62,
                      }}
                    >
                      <img
                        src={image}
                        alt={`${product.name} 이미지 ${index + 1}`}
                        style={thumbnailImageStyle}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <section
            style={{
              ...infoCardStyle,
              borderRadius: isMobile ? "24px" : "32px",
              padding: isMobile ? "24px 20px" : "38px",
            }}
          >
            <p style={brandLabelStyle}>{product.brand}</p>

            <h1
              style={{
                ...titleStyle,
                fontSize: isMobile ? "31px" : "46px",
              }}
            >
              {product.name}
            </h1>

            <button onClick={toggleWishlist} style={wishButtonStyle}>
              {isWished ? "❤️ 찜한 상품" : "🤍 찜하기"}
            </button>

            <h2
              style={{
                ...priceStyle,
                fontSize: isMobile ? "30px" : "36px",
              }}
            >
              ₩{Number(product.price).toLocaleString()}
            </h2>

            <p style={descriptionStyle}>
              {product.description ||
                "AETHER가 엄선한 프리미엄 패션 아이템입니다. 세련된 실루엣과 고급스러운 무드로 데일리 룩부터 특별한 스타일까지 완성해줍니다."}
            </p>

            <div style={serviceGridStyle}>
              <div style={serviceCardStyle}>
                <strong>프리미엄 패키징</strong>
                <span>AETHER 감성 포장</span>
              </div>

              <div style={serviceCardStyle}>
                <strong>상담 / 결제</strong>
                <span>오픈채팅 문의</span>
              </div>

              <div style={serviceCardStyle}>
                <strong>상품 검수</strong>
                <span>등록 전 컨디션 확인</span>
              </div>
            </div>

            <div style={buttonWrapStyle}>
              <button
                onClick={addToCart}
                disabled={isSoldOut}
                style={{
                  ...actionButtonStyle,
                  ...cartButtonStyle,
                  opacity: isSoldOut ? 0.45 : 1,
                }}
              >
                {isSoldOut ? "품절된 상품" : "장바구니 담기"}
              </button>

              <button
                onClick={buyNow}
                disabled={isSoldOut}
                style={{
                  ...actionButtonStyle,
                  ...buyButtonStyle,
                  opacity: isSoldOut ? 0.45 : 1,
                }}
              >
                {isSoldOut ? "구매 불가" : "바로 구매"}
              </button>
            </div>
          </section>
        </div>

        {relatedProducts.length > 0 && (
          <section style={relatedSectionStyle}>
            <div style={relatedTitleStyle}>
              <p style={brandLabelStyle}>추천 상품</p>
              <h2 style={relatedHeadingStyle}>함께 보면 좋은 상품</h2>
            </div>

            <div
              style={{
                ...relatedListStyle,
                justifyContent: isMobile ? "flex-start" : "center",
                overflowX: isMobile ? "auto" : "visible",
                flexWrap: isMobile ? "nowrap" : "wrap",
              }}
            >
              {relatedProducts.map((item) => {
                const relatedImages =
                  item.images && item.images.length > 0
                    ? item.images
                    : item.image
                    ? [item.image]
                    : [];

                return (
                  <div
                    key={item.id}
                    style={{
                      flex: isMobile ? "0 0 220px" : "0 0 220px",
                    }}
                  >
                    <ProductCard
                      brand={item.brand}
                      name={item.name}
                      price={`₩${Number(item.price).toLocaleString()}`}
                      image={relatedImages[0] || item.image}
                      href={`/product/${item.id}`}
                      stockStatus={item.stock_status}
                      stockQuantity={item.stock_quantity}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #ffffff 0%, #fafafa 48%, #f4f1eb 100%)",
  color: "#111",
  padding: "56px 18px 100px",
};

const containerStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
};

const centerStyle = {
  minHeight: "70vh",
  background: "#fff",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
};

const backLinkStyle = {
  display: "inline-block",
  marginBottom: "28px",
  color: "#777",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 800,
};

const detailGridStyle = {
  display: "grid",
};

const imageBoxStyle = {
  background: "linear-gradient(145deg, #ffffff 0%, #f4f4f4 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative" as const,
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 28px 80px rgba(0,0,0,0.08)",
};

const mainImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain" as const,
  transition: "0.45s ease",
};

const slideButtonStyle = {
  position: "absolute" as const,
  top: "50%",
  transform: "translateY(-50%)",
  width: "44px",
  height: "44px",
  borderRadius: "999px",
  border: "1px solid rgba(0,0,0,0.1)",
  background: "rgba(255,255,255,0.86)",
  color: "#111",
  fontSize: "34px",
  lineHeight: "34px",
  cursor: "pointer",
  zIndex: 5,
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
};

const imageCountStyle = {
  position: "absolute" as const,
  right: "18px",
  bottom: "18px",
  background: "rgba(0,0,0,0.72)",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: 900,
};

const thumbnailWrapStyle = {
  display: "flex",
  gap: "10px",
  overflowX: "auto" as const,
  padding: "14px 2px 4px",
  WebkitOverflowScrolling: "touch" as const,
};

const thumbnailButtonStyle = {
  flex: "0 0 86px",
  height: "86px",
  padding: "4px",
  borderRadius: "16px",
  background: "#fff",
  cursor: "pointer",
};

const thumbnailImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  borderRadius: "12px",
  display: "block",
};

const infoCardStyle = {
  background: "rgba(255,255,255,0.9)",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
  backdropFilter: "blur(18px)",
};

const brandLabelStyle = {
  fontSize: "13px",
  fontWeight: 950,
  letterSpacing: "3px",
  color: "#9b8b73",
  marginBottom: "14px",
};

const titleStyle = {
  lineHeight: "1.14",
  marginBottom: "18px",
  fontWeight: 950,
  letterSpacing: "-1.5px",
};

const wishButtonStyle = {
  width: "100%",
  height: "54px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  fontSize: "16px",
  fontWeight: 950,
  cursor: "pointer",
  marginBottom: "24px",
};

const priceStyle = {
  marginBottom: "24px",
  fontWeight: 950,
};

const descriptionStyle = {
  color: "#5f5f5f",
  lineHeight: "1.9",
  fontSize: "15px",
  marginBottom: "28px",
  wordBreak: "keep-all" as const,
};

const serviceGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "12px",
  marginBottom: "28px",
};

const serviceCardStyle = {
  background: "#f7f2ea",
  borderRadius: "18px",
  padding: "18px",
  display: "grid",
  gap: "6px",
  color: "#111",
};

const buttonWrapStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "12px",
};

const actionButtonStyle = {
  width: "100%",
  height: "58px",
  borderRadius: "999px",
  fontSize: "18px",
  fontWeight: 950,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cartButtonStyle = {
  border: "2px solid #111",
  background: "#fff",
  color: "#111",
};

const buyButtonStyle = {
  border: "2px solid #111",
  background: "#111",
  color: "#fff",
};

const soldOutOverlayStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.84)",
  color: "#fff",
  padding: "15px 26px",
  borderRadius: "999px",
  fontSize: "17px",
  fontWeight: "950",
  letterSpacing: "2px",
};

const relatedSectionStyle = {
  marginTop: "84px",
};

const relatedTitleStyle = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const relatedHeadingStyle = {
  fontSize: "clamp(32px, 6vw, 54px)",
  fontWeight: 950,
  letterSpacing: "-1.8px",
  margin: 0,
};

const relatedListStyle = {
  display: "flex",
  gap: "18px",
  paddingBottom: "16px",
  WebkitOverflowScrolling: "touch" as const,
};