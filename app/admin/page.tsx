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
  const [category, setCategory] = useState("bag");
  const [gender, setGender] = useState("MEN");
  const [description, setDescription] = useState("");
  const [stockStatus, setStockStatus] = useState("available");
  const [stockQuantity, setStockQuantity] = useState(1);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    const { data, error } = await supabase.from("orders").select("*");

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

  const soldOutCount = products.filter(
    (product) => product.stock_status === "soldout" || Number(product.stock_quantity || 0) <= 0
  ).length;

  const waitingOrders = orders.filter(
    (order) => (order.status || "입금대기") === "입금대기"
  ).length;

  const paidOrders = orders.filter((order) => order.status === "입금확인").length;

  const preparingOrders = orders.filter(
    (order) => order.status === "배송준비중"
  ).length;

  const shippingOrders = orders.filter((order) => order.status === "배송중").length;

  const completedOrders = orders.filter(
    (order) => order.status === "배송완료"
  ).length;

  const resetForm = () => {
    setName("");
    setBrand("AETHER");
    setPrice("");
    setImageUrl("");
    setCategory("bag");
    setGender("MEN");
    setDescription("");
    setStockStatus("available");
    setStockQuantity(1);
    setSelectedFile(null);
    setEditingProduct(null);
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      alert("먼저 이미지 파일을 선택해줘!");
      return;
    }

    setUploading(true);

    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, selectedFile);

    if (error) {
      console.error(error);
      alert("이미지 업로드 실패 ㅠㅠ");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    setImageUrl(data.publicUrl);
    setUploading(false);
    alert("이미지 업로드 완료!");
  };

  const getAutoStockStatus = () => {
    if (stockQuantity <= 0) return "soldout";
    return stockStatus === "soldout" ? "soldout" : "available";
  };

  const addProduct = async () => {
    if (!name || !brand || !price || !imageUrl || !category || !gender) {
      alert("상품명, 브랜드, 가격, 이미지, 카테고리, 성별은 꼭 입력해줘!");
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        brand,
        price: Number(price),
        image: imageUrl,
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

    if (!name || !brand || !price || !imageUrl || !category || !gender) {
      alert("상품명, 브랜드, 가격, 이미지, 카테고리, 성별은 꼭 입력해줘!");
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name,
        brand,
        price: Number(price),
        image: imageUrl,
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

  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setBrand(product.brand || "AETHER");
    setPrice(String(product.price));
    setImageUrl(product.image);
    setCategory(product.category || "bag");
    setGender(product.gender || "MEN");
    setDescription(product.description || "");
    setStockStatus(product.stock_status || "available");
    setStockQuantity(product.stock_quantity ?? 1);
    setSelectedFile(null);

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
      <div style={topBarStyle}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <h1 style={{ fontSize: "36px", margin: 0 }}>AETHER Admin</h1>

          <a href="/admin/orders" style={linkButtonStyle}>
            주문 관리
          </a>
        </div>

        <button onClick={logout} style={logoutButtonStyle}>
          로그아웃
        </button>
      </div>

      <section style={dashboardGridStyle}>
        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>총 상품 수</p>
          <strong style={dashboardNumberStyle}>{products.length}개</strong>
        </div>

        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>판매중 상품</p>
          <strong style={dashboardNumberStyle}>
            {products.length - soldOutCount}개
          </strong>
        </div>

        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>품절 상품</p>
          <strong style={dashboardNumberStyle}>{soldOutCount}개</strong>
        </div>

        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>총 주문 수</p>
          <strong style={dashboardNumberStyle}>{orders.length}건</strong>
        </div>

        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>총 매출</p>
          <strong style={dashboardNumberStyle}>₩{totalSales.toLocaleString()}</strong>
        </div>

        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>입금대기</p>
          <strong style={dashboardNumberStyle}>{waitingOrders}건</strong>
        </div>

        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>입금확인</p>
          <strong style={dashboardNumberStyle}>{paidOrders}건</strong>
        </div>

        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>배송준비중</p>
          <strong style={dashboardNumberStyle}>{preparingOrders}건</strong>
        </div>

        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>배송중</p>
          <strong style={dashboardNumberStyle}>{shippingOrders}건</strong>
        </div>

        <div style={dashboardCardStyle}>
          <p style={dashboardLabelStyle}>배송완료</p>
          <strong style={dashboardNumberStyle}>{completedOrders}건</strong>
        </div>
      </section>

      <section style={formSectionStyle}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
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
            <option value="wallet">지갑</option>
            <option value="shoes">신발</option>
            <option value="accessory">액세서리</option>
            <option value="clothes">의류</option>
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
          placeholder="상품 설명 ex) 고급스러운 디자인과 실용성을 모두 갖춘 프리미엄 아이템입니다."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
        />

        <div style={imageBoxStyle}>
          <p style={{ marginTop: 0, fontWeight: "700" }}>상품 이미지</p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setSelectedFile(file);
            }}
            style={{ marginBottom: "12px" }}
          />

          <button
            type="button"
            onClick={uploadImage}
            disabled={uploading}
            style={{
              padding: "10px 14px",
              background: uploading ? "#777" : "#111",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: uploading ? "not-allowed" : "pointer",
              marginBottom: "12px",
            }}
          >
            {uploading ? "업로드 중..." : "이미지 업로드"}
          </button>

          <input
            placeholder="이미지 주소"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ ...inputStyle, marginBottom: "0" }}
          />

          {imageUrl && (
            <img
              src={imageUrl}
              alt="미리보기"
              style={{
                width: "160px",
                height: "160px",
                objectFit: "cover",
                borderRadius: "12px",
                marginTop: "14px",
                display: "block",
              }}
            />
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

      <section>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>상품 목록</h2>

        <div style={productGridStyle}>
          {products.map((product) => {
            const quantity = product.stock_quantity ?? 0;
            const isSoldOut =
              product.stock_status === "soldout" || Number(quantity) <= 0;

            return (
              <div key={product.id} style={productCardStyle}>
                <div style={{ position: "relative" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      ...productImageStyle,
                      opacity: isSoldOut ? 0.45 : 1,
                    }}
                  />

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
                  <p style={{ color: "#777", lineHeight: "1.6" }}>
                    {product.description}
                  </p>
                )}

                <strong>{Number(product.price).toLocaleString()}원</strong>

                <button
                  onClick={() => startEditProduct(product)}
                  style={editButtonStyle}
                >
                  수정
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  style={deleteButtonStyle}
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

const mainStyle = {
  padding: "50px",
  background: "#f5f5f5",
  minHeight: "100vh",
  color: "#111",
};

const loadingStyle = {
  minHeight: "100vh",
  background: "#f5f5f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#111",
  fontSize: "24px",
  fontWeight: "700",
};

const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const linkButtonStyle = {
  background: "#111",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "10px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "700",
};

const logoutButtonStyle = {
  padding: "12px 18px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const dashboardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const dashboardCardStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const dashboardLabelStyle = {
  margin: 0,
  color: "#777",
  fontWeight: "700",
};

const dashboardNumberStyle = {
  display: "block",
  marginTop: "12px",
  fontSize: "30px",
};

const formSectionStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "16px",
  marginBottom: "40px",
};

const twoColumnStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
};

const imageBoxStyle = {
  padding: "16px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  marginBottom: "14px",
  background: "#fafafa",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "14px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "15px",
  boxSizing: "border-box" as const,
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "110px",
  resize: "vertical" as const,
};

const mainButtonStyle = {
  width: "100%",
  padding: "16px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  width: "100%",
  padding: "14px",
  background: "#777",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "15px",
  cursor: "pointer",
  marginTop: "10px",
};

const productGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "24px",
};

const productCardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "16px",
};

const productImageStyle = {
  width: "100%",
  height: "260px",
  objectFit: "cover" as const,
  borderRadius: "12px",
  marginBottom: "16px",
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

const editButtonStyle = {
  width: "100%",
  marginTop: "16px",
  padding: "12px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  background: "#d93025",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};