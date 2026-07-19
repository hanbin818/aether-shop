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
  stock_quantity?: number | null;
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("상품 불러오기 오류:", error);
        setProduct(null);
        setLoading(false);
        return;
      }

      const images =
        Array.isArray(data.images) && data.images.length > 0
          ? data.images.filter(Boolean)
          : data.image
          ? [data.image]
          : [];

      setProduct(data);
      setSelectedImage(images[0] || data.image || "");
      setLoading(false);
    };

    if (id) {
      fetchProduct();
    }
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
        console.error("추천 상품 불러오기 오류:", error);
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

      const { error } = await supabase.from("recent_views").upsert(
        {
          user_id: user.id,
          product_id: Number(id),
          viewed_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,product_id",
        }
      );

      if (error) {
        console.error("최근 본 상품 저장 오류:", error);
      }
    };

    if (id) {
      saveRecentView();
    }
  }, [id]);

  useEffect(() => {
    const checkWishlist = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        setIsWished(false);
        return;
      }

      const { data, error } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", Number(id))
        .maybeSingle();

      if (error) {
        console.error("찜 상태 확인 오류:", error);
        return;
      }

      setIsWished(!!data);
    };

    if (id) {
      checkWishlist();
    }
  }, [id]);

  const productImages =
    product?.images &&
    Array.isArray(product.images) &&
    product.images.length > 0
      ? product.images.filter(Boolean)
      : product?.image
      ? [product.image]
      : [];

  const selectedIndex = productImages.findIndex(
    (image) => image === selectedImage
  );

  const currentImage =
    selectedImage || productImages[0] || product?.image || "";

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
    if (!product) return;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("로그인 후 찜할 수 있습니다.");
      window.location.href = "/login";
      return;
    }

    if (isWished) {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", Number(id));

      if (error) {
        console.error("찜 삭제 오류:", error);
        alert("찜 목록 삭제 중 오류가 발생했습니다.");
        return;
      }

      setIsWished(false);
      alert("찜 목록에서 삭제되었습니다.");
      return;
    }

    const { error } = await supabase.from("wishlists").insert({
      user_id: user.id,
      product_id: Number(id),
    });

    if (error) {
      console.error("찜 추가 오류:", error);
      alert("찜 목록 추가 중 오류가 발생했습니다.");
      return;
    }

    setIsWished(true);
    alert("찜 목록에 추가되었습니다.");
  };

  const normalizedStock = product?.stock_status
    ?.toLowerCase()
    .replace(/[_-\s]/g, "");

  const isSoldOut =
    normalizedStock === "soldout" ||
    (product?.stock_quantity !== null &&
      product?.stock_quantity !== undefined &&
      Number(product.stock_quantity) <= 0);

  const addToCart = () => {
    if (!product) return false;

    if (isSoldOut) {
      alert("품절 상품은 장바구니에 담을 수 없습니다.");
      return false;
    }

    try {
      const oldCart = localStorage.getItem("aether-cart");
      const cart = oldCart ? JSON.parse(oldCart) : [];

      const existingItem = cart.find(
        (item: Product & { quantity?: number }) => item.id === product.id
      );

      if (existingItem) {
        const updatedCart = cart.map(
          (item: Product & { quantity?: number }) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: (item.quantity || 1) + 1,
                }
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

      window.dispatchEvent(new Event("cartUpdated"));

      alert(`${product.name} 장바구니에 담았습니다.`);
      return true;
    } catch (error) {
      console.error("장바구니 저장 오류:", error);
      alert("장바구니에 상품을 담는 중 오류가 발생했습니다.");
      return false;
    }
  };

  const buyNow = () => {
    if (!product) return;

    if (isSoldOut) {
      alert("품절 상품은 구매할 수 없습니다.");
      return;
    }

    const added = addToCart();

    if (added) {
      window.location.href = "/cart";
    }
  };

  if (loading) {
    return <main style={centerStyle}>상품 불러오는 중...</main>;
  }

  if (!product) {
    return <main style={centerStyle}>상품을 찾을 수 없습니다.</main>;
  }

  return (
    <main
      style={{
        ...pageStyle,
        padding: isMobile ? "28px 14px 70px" : "52px 24px 100px",
      }}
    >
      <div style={containerStyle}>
        <a
          href="/products"
          style={{
            ...backLinkStyle,
            marginBottom: isMobile ? "20px" : "28px",
          }}
        >
          ← 전체상품으로 돌아가기
        </a>

        <div
          style={{
            ...detailGridStyle,
            gridTemplateColumns: isMobile
              ? "minmax(0, 1fr)"
              : "minmax(0, 1.08fr) minmax(360px, 0.92fr)",
            gap: isMobile ? "24px" : "42px",
          }}
        >
          <div style={imageSectionStyle}>
            <div
              style={{
                ...imageBoxStyle,
                height: isMobile ? "clamp(390px, 118vw, 560px)" : "650px",
                borderRadius: isMobile ? "22px" : "30px",
              }}
              onTouchStart={(event) =>
                setTouchStartX(event.touches[0].clientX)
              }
              onTouchEnd={(event) =>
                handleTouchEnd(event.changedTouches[0].clientX)
              }
            >
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={product.name}
                  style={{
                    ...mainImageStyle,
                    padding: isMobile ? "6px" : "10px",
                    opacity: isSoldOut ? 0.34 : 1,
                  }}
                />
              ) : (
                <div style={noImageStyle}>등록된 이미지가 없습니다.</div>
              )}

              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrevImage}
                    aria-label="이전 이미지"
                    style={{
                      ...slideButtonStyle,
                      left: isMobile ? "10px" : "18px",
                      width: isMobile ? "40px" : "44px",
                      height: isMobile ? "40px" : "44px",
                    }}
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={goNextImage}
                    aria-label="다음 이미지"
                    style={{
                      ...slideButtonStyle,
                      right: isMobile ? "10px" : "18px",
                      width: isMobile ? "40px" : "44px",
                      height: isMobile ? "40px" : "44px",
                    }}
                  >
                    ›
                  </button>

                  <div
                    style={{
                      ...imageCountStyle,
                      right: isMobile ? "12px" : "18px",
                      bottom: isMobile ? "12px" : "18px",
                    }}
                  >
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
                  const active = image === currentImage;

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      aria-label={`${index + 1}번째 상품 이미지 보기`}
                      style={{
                        ...thumbnailButtonStyle,
                        flex: isMobile ? "0 0 72px" : "0 0 78px",
                        width: isMobile ? "72px" : "78px",
                        height: isMobile ? "72px" : "78px",
                        border: active
                          ? "2px solid #111"
                          : "1px solid #dedede",
                        opacity: active ? 1 : 0.68,
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
              borderRadius: isMobile ? "22px" : "30px",
              padding: isMobile ? "26px 20px" : "36px 34px",
            }}
          >
            <p style={brandLabelStyle}>{product.brand}</p>

            <h1
              style={{
                ...titleStyle,
                fontSize: isMobile
                  ? "clamp(29px, 8vw, 38px)"
                  : "clamp(34px, 3.1vw, 46px)",
              }}
            >
              {product.name}
            </h1>

            <button
              type="button"
              onClick={toggleWishlist}
              style={wishButtonStyle}
            >
              {isWished ? "♥ 찜한 상품" : "♡ 찜하기"}
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
                "AETHER가 엄선한 프리미엄 패션 아이템입니다.\n세련된 실루엣과 고급스러운 무드로 데일리 룩부터 특별한 스타일까지 완성해줍니다."}
            </p>

            <div
              style={{
                ...serviceGridStyle,
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(2, minmax(0, 1fr))",
              }}
            >
              <div style={serviceCardStyle}>
                <strong style={serviceTitleStyle}>프리미엄 패키징</strong>
                <span style={serviceDescriptionStyle}>
                  AETHER 감성 포장
                </span>
              </div>

              <div style={serviceCardStyle}>
                <strong style={serviceTitleStyle}>상담 / 결제</strong>
                <span style={serviceDescriptionStyle}>오픈채팅 문의</span>
              </div>

              <div
                style={{
                  ...serviceCardStyle,
                  gridColumn: isMobile ? "auto" : "1 / -1",
                }}
              >
                <strong style={serviceTitleStyle}>상품 검수</strong>
                <span style={serviceDescriptionStyle}>
                  등록 전 컨디션 확인
                </span>
              </div>
            </div>

            <div style={buttonWrapStyle}>
              <button
                type="button"
                onClick={addToCart}
                disabled={isSoldOut}
                style={{
                  ...actionButtonStyle,
                  ...cartButtonStyle,
                  opacity: isSoldOut ? 0.45 : 1,
                  cursor: isSoldOut ? "not-allowed" : "pointer",
                }}
              >
                {isSoldOut ? "품절된 상품" : "장바구니 담기"}
              </button>

              <button
                type="button"
                onClick={buyNow}
                disabled={isSoldOut}
                style={{
                  ...actionButtonStyle,
                  ...buyButtonStyle,
                  opacity: isSoldOut ? 0.45 : 1,
                  cursor: isSoldOut ? "not-allowed" : "pointer",
                }}
              >
                {isSoldOut ? "구매 불가" : "바로 구매"}
              </button>
            </div>
          </section>
        </div>

        {relatedProducts.length > 0 && (
          <section
            style={{
              ...relatedSectionStyle,
              marginTop: isMobile ? "62px" : "84px",
            }}
          >
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
                  item.images &&
                  Array.isArray(item.images) &&
                  item.images.length > 0
                    ? item.images.filter(Boolean)
                    : item.image
                    ? [item.image]
                    : [];

                return (
                  <div
                    key={item.id}
                    style={{
                      flex: isMobile ? "0 0 190px" : "0 0 220px",
                      minWidth: 0,
                    }}
                  >
                    <ProductCard
                      brand={item.brand}
                      name={item.name}
                      price={`₩${Number(item.price).toLocaleString()}`}
                      image={relatedImages[0] || item.image}
                      href={`/product/${item.id}`}
                      stockStatus={item.stock_status}
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
  width: "100%",
  overflowX: "hidden" as const,
  background:
    "linear-gradient(180deg, #ffffff 0%, #fafafa 48%, #f4f1eb 100%)",
  color: "#111",
  boxSizing: "border-box" as const,
};

const containerStyle = {
  width: "100%",
  maxWidth: "1220px",
  margin: "0 auto",
  boxSizing: "border-box" as const,
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
  color: "#777",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 800,
};

const detailGridStyle = {
  display: "grid",
  width: "100%",
  minWidth: 0,
  alignItems: "start",
  boxSizing: "border-box" as const,
};

const imageSectionStyle = {
  width: "100%",
  minWidth: 0,
  maxWidth: "100%",
  overflow: "hidden",
};

const imageBoxStyle = {
  width: "100%",
  minWidth: 0,
  maxWidth: "100%",
  background: "linear-gradient(145deg, #ffffff 0%, #f6f6f6 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative" as const,
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 24px 65px rgba(0,0,0,0.075)",
  boxSizing: "border-box" as const,
};

const mainImageStyle = {
  display: "block",
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain" as const,
  objectPosition: "center center",
  boxSizing: "border-box" as const,
  transition: "opacity 0.3s ease, transform 0.3s ease",
};

const noImageStyle = {
  color: "#999",
  fontSize: "15px",
  fontWeight: 700,
};

const slideButtonStyle = {
  position: "absolute" as const,
  top: "50%",
  transform: "translateY(-50%)",
  borderRadius: "999px",
  border: "1px solid rgba(0,0,0,0.1)",
  background: "rgba(255,255,255,0.9)",
  color: "#111",
  fontSize: "32px",
  lineHeight: 1,
  cursor: "pointer",
  zIndex: 5,
  boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageCountStyle = {
  position: "absolute" as const,
  background: "rgba(0,0,0,0.74)",
  color: "#fff",
  padding: "7px 11px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: 900,
  zIndex: 5,
};

const thumbnailWrapStyle = {
  display: "flex",
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  gap: "10px",
  overflowX: "auto" as const,
  overflowY: "hidden" as const,
  padding: "14px 2px 5px",
  boxSizing: "border-box" as const,
  WebkitOverflowScrolling: "touch" as const,
  scrollbarWidth: "thin" as const,
};

const thumbnailButtonStyle = {
  padding: "4px",
  borderRadius: "14px",
  background: "#fff",
  cursor: "pointer",
  boxSizing: "border-box" as const,
  overflow: "hidden",
};

const thumbnailImageStyle = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  objectPosition: "center",
  borderRadius: "10px",
};

const infoCardStyle = {
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  overflow: "hidden",
  background: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 58px rgba(0,0,0,0.055)",
  backdropFilter: "blur(18px)",
  boxSizing: "border-box" as const,
};

const brandLabelStyle = {
  fontSize: "13px",
  fontWeight: 950,
  letterSpacing: "3px",
  color: "#9b8b73",
  margin: "0 0 14px",
  wordBreak: "break-word" as const,
};

const titleStyle = {
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  lineHeight: 1.14,
  margin: "0 0 18px",
  fontWeight: 950,
  letterSpacing: "-1.5px",
  wordBreak: "keep-all" as const,
  overflowWrap: "break-word" as const,
};

const wishButtonStyle = {
  width: "100%",
  maxWidth: "100%",
  height: "54px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  fontSize: "16px",
  fontWeight: 950,
  cursor: "pointer",
  marginBottom: "24px",
  boxSizing: "border-box" as const,
};

const priceStyle = {
  width: "100%",
  maxWidth: "100%",
  margin: "0 0 24px",
  fontWeight: 950,
  letterSpacing: "-0.8px",
  wordBreak: "break-word" as const,
};

const descriptionStyle = {
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  color: "#5f5f5f",
  lineHeight: 1.9,
  fontSize: "15px",
  margin: "0 0 28px",
  wordBreak: "keep-all" as const,
  overflowWrap: "break-word" as const,
  whiteSpace: "pre-line" as const,
};

const serviceGridStyle = {
  display: "grid",
  width: "100%",
  minWidth: 0,
  gap: "12px",
  marginBottom: "28px",
};

const serviceCardStyle = {
  minWidth: 0,
  background: "#f7f2ea",
  borderRadius: "18px",
  padding: "18px",
  display: "grid",
  gap: "6px",
  color: "#111",
  boxSizing: "border-box" as const,
};

const serviceTitleStyle = {
  fontSize: "15px",
  fontWeight: 900,
  wordBreak: "keep-all" as const,
};

const serviceDescriptionStyle = {
  fontSize: "14px",
  color: "#444",
  wordBreak: "keep-all" as const,
};

const buttonWrapStyle = {
  display: "grid",
  width: "100%",
  minWidth: 0,
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "12px",
};

const actionButtonStyle = {
  width: "100%",
  maxWidth: "100%",
  height: "58px",
  borderRadius: "999px",
  fontSize: "18px",
  fontWeight: 950,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box" as const,
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
  fontWeight: 950,
  letterSpacing: "2px",
  zIndex: 6,
};

const relatedSectionStyle = {
  width: "100%",
  minWidth: 0,
};

const relatedTitleStyle = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const relatedHeadingStyle = {
  fontSize: "clamp(30px, 5vw, 52px)",
  fontWeight: 950,
  letterSpacing: "-1.8px",
  lineHeight: 1.15,
  margin: 0,
  wordBreak: "keep-all" as const,
};

const relatedListStyle = {
  display: "flex",
  width: "100%",
  minWidth: 0,
  maxWidth: "100%",
  gap: "18px",
  paddingBottom: "16px",
  boxSizing: "border-box" as const,
  WebkitOverflowScrolling: "touch" as const,
};