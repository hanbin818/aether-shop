"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

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

type Order = {
  id: number;
  total_price: number;
  status?: string;
  created_at?: string;
  order_number?: string;
  customer_name?: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [checkingLogin, setCheckingLogin] = useState(true);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("AETHER");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [category, setCategory] = useState("bag");
  const [gender, setGender] = useState("MEN");
  const [description, setDescription] = useState("");
  const [stockStatus, setStockStatus] = useState("available");
  const [stockQuantity, setStockQuantity] = useState(1);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const checkLogin = async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      alert("관리자 로그인이 필요해!");
      router.push("/login");
      return;
    }

    setCheckingLogin(false);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setOrders(data || []);
  };

  useEffect(() => {
    checkLogin();
    fetchProducts();
    fetchOrders();
  }, []);

  const totalSales = orders.reduce(
    (sum, order) => sum + Number(order.total_price || 0),
    0
  );

  const today = new Date().toDateString();

  const todayOrders = orders.filter((order) => {
    if (!order.created_at) return false;
    return new Date(order.created_at).toDateString() === today;
  });

  const todaySales = todayOrders.reduce(
    (sum, order) => sum + Number(order.total_price || 0),
    0
  );

  const soldOutCount = products.filter((product) => {
    const status = product.stock_status?.toLowerCase().replace(/[_-\s]/g, "");
    return status === "soldout" || Number(product.stock_quantity || 0) <= 0;
  }).length;

  const activeProductCount = products.length - soldOutCount;

  const waitingOrders = orders.filter(
    (order) => (order.status || "상담대기") === "상담대기"
  ).length;

  const paidOrders = orders.filter((order) => order.status === "입금확인").length;

  const preparingOrders = orders.filter(
    (order) => order.status === "배송준비중"
  ).length;

  const shippingOrders = orders.filter(
    (order) => order.status === "배송중"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "배송완료"
  ).length;

  const recentOrders = orders.slice(0, 5);

  const resetForm = () => {
    setName("");
    setBrand("AETHER");
    setPrice("");
    setImageUrl("");
    setImageUrls([]);
    setCategory("bag");
    setGender("MEN");
    setDescription("");
    setStockStatus("available");
    setStockQuantity(1);
    setSelectedFiles([]);
    setEditingProduct(null);
  };

  const getCleanImages = () => {
    const urls = [...imageUrls];

    if (imageUrl && !urls.includes(imageUrl)) {
      urls.unshift(imageUrl);
    }

    return urls.filter((url) => url.trim() !== "");
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      alert("먼저 이미지 파일을 선택해줘!");
      return;
    }

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of selectedFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) {
        console.error(error);
        alert("이미지 업로드 중 일부 실패했어 ㅠㅠ");
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      uploadedUrls.push(data.publicUrl);
    }

    const mergedImages = [...imageUrls, ...uploadedUrls];

    setImageUrls(mergedImages);
    setImageUrl(mergedImages[0] || "");
    setSelectedFiles([]);
    setUploading(false);

    alert("이미지 업로드 완료!");
  };

  const removeImage = (url: string) => {
    const filtered = imageUrls.filter((image) => image !== url);
    setImageUrls(filtered);

    if (imageUrl === url) {
      setImageUrl(filtered[0] || "");
    }
  };

  const setMainImage = (url: string) => {
    const filtered = imageUrls.filter((image) => image !== url);
    const reordered = [url, ...filtered];

    setImageUrls(reordered);
    setImageUrl(url);
  };

  const getAutoStockStatus = () => {
    if (stockQuantity <= 0) return "soldout";
    return stockStatus === "soldout" ? "soldout" : "available";
  };

  const addProduct = async () => {
    const cleanImages = getCleanImages();

    if (
      !name ||
      !brand ||
      !price ||
      cleanImages.length === 0 ||
      !category ||
      !gender
    ) {
      alert("상품명, 브랜드, 가격, 이미지, 카테고리, 성별은 꼭 입력해줘!");
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        brand,
        price: Number(price),
        image: cleanImages[0],
        images: cleanImages,
        category,
        gender,
        description,
        stock_status: getAutoStockStatus(),
        stock_quantity: stockQuantity,
      },
    ]);

    if (error) {
      console.error(error);
      alert("상품 등록 실패 ㅠㅠ");
      return;
    }

    alert("상품 등록 완료!");
    resetForm();
    fetchProducts();
  };

  const updateProduct = async () => {
    if (!editingProduct) return;

    const cleanImages = getCleanImages();

    if (
      !name ||
      !brand ||
      !price ||
      cleanImages.length === 0 ||
      !category ||
      !gender
    ) {
      alert("상품명, 브랜드, 가격, 이미지, 카테고리, 성별은 꼭 입력해줘!");
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name,
        brand,
        price: Number(price),
        image: cleanImages[0],
        images: cleanImages,
        category,
        gender,
        description,
        stock_status: getAutoStockStatus(),
        stock_quantity: stockQuantity,
      })
      .eq("id", editingProduct.id);

    if (error) {
      console.error(error);
      alert("상품 수정 실패 ㅠㅠ");
      return;
    }

    alert("상품 수정 완료!");
    resetForm();
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    const ok = confirm("정말 이 상품을 삭제할까?");
    if (!ok) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("삭제 실패 ㅠㅠ");
      return;
    }

    alert("삭제 완료!");
    fetchProducts();
  };

  const changeStock = async (id: number, quantity: number) => {
    const safeQuantity = Math.max(Number(quantity || 0), 0);
    const status = safeQuantity <= 0 ? "soldout" : "available";

    const { error } = await supabase
      .from("products")
      .update({
        stock_quantity: safeQuantity,
        stock_status: status,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("재고 변경 실패 ㅠㅠ");
      return;
    }

    fetchProducts();
  };

  const startEditProduct = (product: Product) => {
    const productImages =
      product.images && product.images.length > 0
        ? product.images
        : product.image
        ? [product.image]
        : [];

    setEditingProduct(product);
    setName(product.name);
    setBrand(product.brand || "AETHER");
    setPrice(String(product.price));
    setImageUrls(productImages);
    setImageUrl(productImages[0] || "");
    setCategory(product.category || "bag");
    setGender(product.gender || "MEN");
    setDescription(product.description || "");
    setStockStatus(product.stock_status || "available");
    setStockQuantity(product.stock_quantity ?? 1);
    setSelectedFiles([]);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    alert("로그아웃 완료!");
    router.push("/login");
  };

  if (checkingLogin) {
    return <main style={loadingStyle}>로그인 확인 중...</main>;
  }

  return (
    <main style={mainStyle}>
      <section style={heroStyle}>
        <div>
          <p style={heroLabelStyle}>AETHER ADMIN</p>
          <h1 style={heroTitleStyle}>Luxury Management Dashboard</h1>
          <p style={heroTextStyle}>
            상품, 주문, 재고, 매출을 한눈에 관리하는 AETHER 운영 화면입니다.
          </p>
        </div>

        <div style={heroButtonWrapStyle}>
          <a href="/" style={outlineButtonStyle}>
            사이트 보기
          </a>

          <a href="/admin/orders" style={whiteButtonStyle}>
            주문 관리
          </a>

          <button onClick={logout} style={logoutButtonStyle}>
            로그아웃
          </button>
        </div>
      </section>

      <section style={dashboardGridStyle}>
        <DashboardCard label="오늘 주문" value={`${todayOrders.length}건`} />
        <DashboardCard label="오늘 매출" value={`₩${todaySales.toLocaleString()}`} />
        <DashboardCard label="총 주문" value={`${orders.length}건`} />
        <DashboardCard label="총 매출" value={`₩${totalSales.toLocaleString()}`} />
        <DashboardCard label="판매중 상품" value={`${activeProductCount}개`} />
        <DashboardCard label="품절 상품" value={`${soldOutCount}개`} />
        <DashboardCard label="상담대기" value={`${waitingOrders}건`} />
        <DashboardCard label="배송준비중" value={`${preparingOrders}건`} />
      </section>

      <section style={quickSectionStyle}>
        <a href="#product-form" style={quickButtonStyle}>
          상품 등록
        </a>
        <a href="/admin/orders" style={quickButtonStyle}>
          주문 관리
        </a>
        <a href="#product-list" style={quickButtonStyle}>
          상품 목록
        </a>
        <a href="/" style={quickButtonStyle}>
          쇼핑몰 보기
        </a>
      </section>

      <section style={panelGridStyle}>
        <div style={panelStyle}>
          <div style={panelTitleRowStyle}>
            <div>
              <p style={panelLabelStyle}>RECENT ORDERS</p>
              <h2 style={panelTitleStyle}>최근 주문</h2>
            </div>

            <a href="/admin/orders" style={smallLinkStyle}>
              전체보기
            </a>
          </div>

          {recentOrders.length === 0 ? (
            <p style={emptyTextStyle}>최근 주문이 없습니다.</p>
          ) : (
            <div style={recentListStyle}>
              {recentOrders.map((order) => (
                <div key={order.id} style={recentOrderStyle}>
                  <div>
                    <strong>{order.order_number || `ORDER-${order.id}`}</strong>
                    <p>{order.customer_name || "주문자 정보 없음"}</p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <strong>₩{Number(order.total_price || 0).toLocaleString()}</strong>
                    <p>{order.status || "상담대기"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={panelStyle}>
          <div style={panelTitleRowStyle}>
            <div>
              <p style={panelLabelStyle}>ORDER STATUS</p>
              <h2 style={panelTitleStyle}>주문 상태</h2>
            </div>
          </div>

          <div style={statusGridStyle}>
            <StatusBox label="상담대기" value={waitingOrders} />
            <StatusBox label="입금확인" value={paidOrders} />
            <StatusBox label="배송준비중" value={preparingOrders} />
            <StatusBox label="배송중" value={shippingOrders} />
            <StatusBox label="배송완료" value={completedOrders} />
          </div>
        </div>
      </section>

      <section id="product-form" style={formSectionStyle}>
        <p style={sectionLabelStyle}>PRODUCT MANAGEMENT</p>
        <h2 style={sectionTitleStyle}>
          {editingProduct ? "상품 수정" : "상품 등록"}
        </h2>

        <input
          placeholder="브랜드 ex) CHANEL, Louis Vuitton"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="상품명"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="가격"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <div style={twoColumnStyle}>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={inputStyle}
          >
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="bag">가방</option>
            <option value="clutch">클러치</option>
            <option value="wallet">지갑</option>
            <option value="shoes">신발</option>
            <option value="accessory">액세서리</option>
            <option value="sunglasses">선글라스</option>
          </select>
        </div>

        <div style={twoColumnStyle}>
          <input
            type="number"
            placeholder="재고 수량"
            value={stockQuantity}
            min={0}
            onChange={(e) => {
              const value = Number(e.target.value);
              setStockQuantity(value);

              if (value <= 0) {
                setStockStatus("soldout");
              } else if (stockStatus === "soldout") {
                setStockStatus("available");
              }
            }}
            style={inputStyle}
          />

          <select
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
            style={inputStyle}
          >
            <option value="available">판매중</option>
            <option value="soldout">품절</option>
          </select>
        </div>

        <textarea
          placeholder="상품 설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
        />

        <div style={imageBoxStyle}>
          <p style={{ marginTop: 0, fontWeight: 900 }}>상품 이미지</p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setSelectedFiles(files);
            }}
            style={{ marginBottom: "12px" }}
          />

          <button
            type="button"
            onClick={uploadImages}
            disabled={uploading}
            style={uploadButtonStyle}
          >
            {uploading ? "업로드 중..." : "선택한 이미지 업로드"}
          </button>

          <input
            placeholder="대표 이미지 주소"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);

              if (e.target.value && !imageUrls.includes(e.target.value)) {
                setImageUrls([e.target.value, ...imageUrls]);
              }
            }}
            style={{ ...inputStyle, marginBottom: "12px" }}
          />

          {imageUrls.length > 0 && (
            <div style={previewGridStyle}>
              {imageUrls.map((url, index) => (
                <div key={`${url}-${index}`} style={previewCardStyle}>
                  <img src={url} alt="상품 이미지" style={previewImageStyle} />

                  {imageUrl === url && <span style={mainBadgeStyle}>대표</span>}

                  <div style={previewButtonWrapStyle}>
                    <button
                      type="button"
                      onClick={() => setMainImage(url)}
                      style={smallBlackButtonStyle}
                    >
                      대표
                    </button>

                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      style={smallRedButtonStyle}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={editingProduct ? updateProduct : addProduct}
          style={mainButtonStyle}
        >
          {editingProduct ? "상품 수정하기" : "상품 등록하기"}
        </button>

        {editingProduct && (
          <button onClick={resetForm} style={cancelButtonStyle}>
            수정 취소
          </button>
        )}
      </section>

      <section id="product-list">
        <div style={panelTitleRowStyle}>
          <div>
            <p style={sectionLabelStyle}>PRODUCT LIST</p>
            <h2 style={sectionTitleStyle}>상품 목록</h2>
          </div>

          <button onClick={fetchProducts} style={refreshButtonStyle}>
            새로고침
          </button>
        </div>

        <div style={productGridStyle}>
          {products.map((product) => {
            const quantity = product.stock_quantity ?? 0;
            const normalizedStock = product.stock_status
              ?.toLowerCase()
              .replace(/[_-\s]/g, "");

            const isSoldOut =
              normalizedStock === "soldout" || Number(quantity) <= 0;

            const productImages =
              product.images && product.images.length > 0
                ? product.images
                : product.image
                ? [product.image]
                : [];

            return (
              <div key={product.id} style={productCardStyle}>
                <div style={{ position: "relative" }}>
                  <img
                    src={productImages[0]}
                    alt={product.name}
                    style={{
                      ...productImageStyle,
                      opacity: isSoldOut ? 0.45 : 1,
                    }}
                  />

                  {productImages.length > 1 && (
                    <div style={imageCountBadgeStyle}>
                      사진 {productImages.length}장
                    </div>
                  )}

                  {isSoldOut && <div style={soldOutOverlayStyle}>SOLD OUT</div>}
                </div>

                <p style={badgeStyle}>
                  {product.gender || "MEN"} · {product.category}
                </p>

                <p
                  style={{
                    ...stockBadgeStyle,
                    background: isSoldOut ? "#111" : "#e8f7ee",
                    color: isSoldOut ? "#fff" : "#167a3a",
                  }}
                >
                  {isSoldOut ? "품절" : "판매중"}
                </p>

                <p style={quantityStyle}>재고 : {quantity}개</p>

                <h3>{product.name}</h3>
                <p>{product.brand}</p>

                {product.description && (
                  <p style={descStyle}>{product.description}</p>
                )}

                <strong>{Number(product.price).toLocaleString()}원</strong>

                <div style={stockControlWrapStyle}>
                  <button
                    onClick={() => startEditProduct(product)}
                    style={editButtonStyle}
                  >
                    수정
                  </button>

                  <button
                    onClick={() => changeStock(product.id, quantity + 1)}
                    style={stockButtonStyle}
                  >
                    재고 +1
                  </button>

                  <button
                    onClick={() => changeStock(product.id, quantity - 1)}
                    style={stockButtonStyle}
                  >
                    재고 -1
                  </button>

                  <button
                    onClick={() => changeStock(product.id, 0)}
                    style={soldOutButtonStyle}
                  >
                    품절 처리
                  </button>

                  <button
                    onClick={() => changeStock(product.id, 1)}
                    style={restoreButtonStyle}
                  >
                    재고 복구
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={deleteButtonStyle}
                  >
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function DashboardCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={dashboardCardStyle}>
      <p style={dashboardLabelStyle}>{label}</p>
      <strong style={dashboardNumberStyle}>{value}</strong>
    </div>
  );
}

function StatusBox({ label, value }: { label: string; value: number }) {
  return (
    <div style={statusBoxStyle}>
      <span>{label}</span>
      <strong>{value}건</strong>
    </div>
  );
}

const mainStyle = {
  padding: "36px 18px 90px",
  background: "linear-gradient(180deg, #0b0b0f 0%, #f5f1ea 360px, #f5f5f5 100%)",
  minHeight: "100vh",
  color: "#111",
};

const loadingStyle = {
  minHeight: "100vh",
  background: "#0b0b0f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "24px",
  fontWeight: "900",
};

const heroStyle = {
  maxWidth: "1180px",
  margin: "0 auto 28px",
  padding: "42px",
  borderRadius: "32px",
  background:
    "radial-gradient(circle at top right, rgba(216,195,159,0.22), transparent 32%), #111",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  flexWrap: "wrap" as const,
  boxShadow: "0 28px 90px rgba(0,0,0,0.28)",
};

const heroLabelStyle = {
  margin: "0 0 12px",
  color: "#d8c39f",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "5px",
};

const heroTitleStyle = {
  margin: 0,
  fontSize: "clamp(34px, 5vw, 58px)",
  fontWeight: 950,
  letterSpacing: "-1.6px",
};

const heroTextStyle = {
  margin: "16px 0 0",
  color: "rgba(255,255,255,0.72)",
  lineHeight: 1.8,
};

const heroButtonWrapStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
  flexWrap: "wrap" as const,
};

const whiteButtonStyle = {
  background: "#fff",
  color: "#111",
  padding: "13px 18px",
  borderRadius: "999px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 950,
};

const outlineButtonStyle = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  padding: "13px 18px",
  borderRadius: "999px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 950,
  border: "1px solid rgba(255,255,255,0.25)",
};

const logoutButtonStyle = {
  padding: "13px 18px",
  background: "#d93025",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 950,
};

const dashboardGridStyle = {
  maxWidth: "1180px",
  margin: "0 auto 28px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
};

const dashboardCardStyle = {
  background: "rgba(255,255,255,0.94)",
  padding: "22px",
  borderRadius: "22px",
  boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.06)",
};

const dashboardLabelStyle = {
  margin: 0,
  color: "#777",
  fontWeight: "900",
  fontSize: "13px",
};

const dashboardNumberStyle = {
  display: "block",
  marginTop: "10px",
  fontSize: "28px",
  fontWeight: 950,
};

const quickSectionStyle = {
  maxWidth: "1180px",
  margin: "0 auto 28px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "12px",
};

const quickButtonStyle = {
  background: "#111",
  color: "#fff",
  padding: "16px",
  borderRadius: "999px",
  textAlign: "center" as const,
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 950,
};

const panelGridStyle = {
  maxWidth: "1180px",
  margin: "0 auto 32px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "18px",
};

const panelStyle = {
  background: "#fff",
  borderRadius: "28px",
  padding: "26px",
  boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.06)",
};

const panelTitleRowStyle = {
  maxWidth: "1180px",
  margin: "0 auto 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap" as const,
};

const panelLabelStyle = {
  margin: "0 0 8px",
  color: "#9b8b73",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const panelTitleStyle = {
  margin: 0,
  fontSize: "26px",
  fontWeight: 950,
};

const smallLinkStyle = {
  color: "#111",
  fontSize: "13px",
  fontWeight: 950,
};

const emptyTextStyle = {
  color: "#777",
  fontWeight: 900,
};

const recentListStyle = {
  display: "grid",
  gap: "12px",
};

const recentOrderStyle = {
  background: "#f7f2ea",
  padding: "16px",
  borderRadius: "18px",
  display: "flex",
  justifyContent: "space-between",
  gap: "14px",
};

const statusGridStyle = {
  display: "grid",
  gap: "10px",
};

const statusBoxStyle = {
  background: "#f7f2ea",
  padding: "15px",
  borderRadius: "16px",
  display: "flex",
  justifyContent: "space-between",
  fontWeight: 900,
};

const formSectionStyle = {
  maxWidth: "1180px",
  margin: "0 auto 40px",
  background: "#fff",
  padding: "30px",
  borderRadius: "28px",
  boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
};

const sectionLabelStyle = {
  margin: "0 0 8px",
  color: "#9b8b73",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const sectionTitleStyle = {
  fontSize: "28px",
  margin: "0 0 22px",
  fontWeight: 950,
};

const twoColumnStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
};

const imageBoxStyle = {
  padding: "18px",
  border: "1px solid #ddd",
  borderRadius: "18px",
  marginBottom: "14px",
  background: "#fafafa",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "14px",
  border: "1px solid #ddd",
  borderRadius: "14px",
  fontSize: "15px",
  boxSizing: "border-box" as const,
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "120px",
  resize: "vertical" as const,
};

const uploadButtonStyle = {
  padding: "11px 15px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  marginBottom: "12px",
  fontWeight: 900,
};

const previewGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: "14px",
  marginTop: "14px",
};

const previewCardStyle = {
  position: "relative" as const,
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "16px",
  padding: "10px",
};

const previewImageStyle = {
  width: "100%",
  height: "130px",
  objectFit: "cover" as const,
  borderRadius: "12px",
  display: "block",
};

const mainBadgeStyle = {
  position: "absolute" as const,
  top: "16px",
  left: "16px",
  background: "#111",
  color: "#fff",
  padding: "5px 9px",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 900,
};

const previewButtonWrapStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "6px",
  marginTop: "8px",
};

const smallBlackButtonStyle = {
  padding: "8px",
  border: "none",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: "12px",
};

const smallRedButtonStyle = {
  padding: "8px",
  border: "none",
  background: "#d93025",
  color: "#fff",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: "12px",
};

const mainButtonStyle = {
  width: "100%",
  padding: "17px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  fontSize: "16px",
  fontWeight: 950,
  cursor: "pointer",
};

const cancelButtonStyle = {
  width: "100%",
  padding: "15px",
  background: "#777",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  fontSize: "15px",
  fontWeight: 900,
  cursor: "pointer",
  marginTop: "10px",
};

const refreshButtonStyle = {
  padding: "12px 18px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 950,
};

const productGridStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "24px",
};

const productCardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "24px",
  boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
};

const productImageStyle = {
  width: "100%",
  height: "260px",
  objectFit: "cover" as const,
  borderRadius: "18px",
  marginBottom: "16px",
};

const imageCountBadgeStyle = {
  position: "absolute" as const,
  right: "12px",
  top: "12px",
  background: "rgba(0,0,0,0.72)",
  color: "#fff",
  padding: "7px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 900,
};

const soldOutOverlayStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.82)",
  color: "#fff",
  padding: "12px 18px",
  borderRadius: "999px",
  fontWeight: "900",
  letterSpacing: "1px",
};

const badgeStyle = {
  display: "inline-block",
  padding: "6px 10px",
  background: "#f1f1f1",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "800",
  color: "#333",
  marginRight: "6px",
};

const stockBadgeStyle = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "800",
};

const quantityStyle = {
  margin: "10px 0 0",
  color: "#666",
  fontSize: "13px",
  fontWeight: "900",
};

const descStyle = {
  color: "#777",
  lineHeight: "1.6",
};

const stockControlWrapStyle = {
  display: "grid",
  gap: "8px",
  marginTop: "16px",
};

const editButtonStyle = {
  width: "100%",
  padding: "12px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 900,
};

const stockButtonStyle = {
  width: "100%",
  padding: "12px",
  background: "#1b5e20",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 900,
};

const soldOutButtonStyle = {
  width: "100%",
  padding: "12px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 900,
};

const restoreButtonStyle = {
  width: "100%",
  padding: "12px",
  background: "#1565c0",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 900,
};

const deleteButtonStyle = {
  width: "100%",
  padding: "12px",
  background: "#d93025",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 900,
};