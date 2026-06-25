"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type OrderItem = {
  id?: number;
  brand?: string;
  name?: string;
  price?: number;
  quantity?: number;
  image?: string;
};

type Order = {
  id: number;
  created_at?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_address?: string;
  customer_email?: string;
  total_price?: number;
  items?: OrderItem[];
  status?: string;
  depositor_name?: string;
  payment_method?: string;
  order_number?: string;
};

export default function MyPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyPage = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        alert("로그인이 필요한 페이지입니다.");
        window.location.href = "/login";
        return;
      }

      const userEmail = data.user.email || "";
      setEmail(userEmail);

      const { data: orderData, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", userEmail)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      }

      setOrders(orderData || []);
      setLoading(false);
    };

    loadMyPage();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    alert("로그아웃되었습니다.");
    window.location.href = "/";
  };

  if (loading) {
    return <main style={centerStyle}>회원정보 확인 중...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <h1 style={titleStyle}>마이페이지</h1>

        <div style={infoBoxStyle}>
          <p style={labelStyle}>로그인 계정</p>
          <p style={emailStyle}>{email}</p>
        </div>

        <section>
          <h2 style={sectionTitleStyle}>내 주문내역</h2>

          {orders.length === 0 ? (
            <p style={emptyStyle}>아직 주문내역이 없습니다.</p>
          ) : (
            <div style={orderListStyle}>
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  style={orderCardStyle}
                >
                  <div>
                    <p style={orderLabelStyle}>주문번호</p>
                    <p style={orderNumberStyle}>
                      {order.order_number || `AETHER-${order.id}`}
                    </p>
                  </div>

                  <div>
                    <p style={orderLabelStyle}>주문일</p>
                    <p style={orderTextStyle}>
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString("ko-KR")
                        : "-"}
                    </p>
                  </div>

                  <div>
                    <p style={orderLabelStyle}>결제금액</p>
                    <p style={orderTextStyle}>
                      ₩{(order.total_price || 0).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p style={orderLabelStyle}>주문상태</p>
                    <span style={statusStyle}>{order.status || "주문접수"}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <button onClick={logout} style={logoutButtonStyle}>
          로그아웃
        </button>
      </section>

      {selectedOrder && (
        <div style={modalOverlayStyle} onClick={() => setSelectedOrder(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedOrder(null)}
              style={closeButtonStyle}
            >
              ×
            </button>

            <h2 style={modalTitleStyle}>주문 상세</h2>

            <div style={detailGridStyle}>
              <Detail label="주문번호" value={selectedOrder.order_number || `AETHER-${selectedOrder.id}`} />
              <Detail
                label="주문일"
                value={
                  selectedOrder.created_at
                    ? new Date(selectedOrder.created_at).toLocaleString("ko-KR")
                    : "-"
                }
              />
              <Detail label="주문자" value={selectedOrder.customer_name || "-"} />
              <Detail label="연락처" value={selectedOrder.customer_phone || "-"} />
              <Detail label="입금자명" value={selectedOrder.depositor_name || "-"} />
              <Detail label="결제방식" value={selectedOrder.payment_method || "-"} />
              <Detail label="배송주소" value={selectedOrder.customer_address || "-"} />
              <Detail label="주문상태" value={selectedOrder.status || "주문접수"} />
            </div>

            <h3 style={productTitleStyle}>주문상품</h3>

            <div style={itemListStyle}>
              {(selectedOrder.items || []).map((item, index) => (
                <div key={index} style={itemCardStyle}>
                  <div>
                    <p style={itemBrandStyle}>{item.brand || "AETHER"}</p>
                    <p style={itemNameStyle}>{item.name || "상품명 없음"}</p>
                    <p style={itemOptionStyle}>
                      수량 {item.quantity || 1}개
                    </p>
                  </div>

                  <p style={itemPriceStyle}>
                    ₩{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div style={totalBoxStyle}>
              <span>총 결제금액</span>
              <strong>₩{(selectedOrder.total_price || 0).toLocaleString()}</strong>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={detailBoxStyle}>
      <p style={detailLabelStyle}>{label}</p>
      <p style={detailValueStyle}>{value}</p>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0b0b0f",
  color: "white",
  padding: "120px 20px 60px",
};

const centerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0b0b0f",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle: React.CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
  background: "#15151d",
  borderRadius: "28px",
  padding: "36px 24px",
  border: "1px solid rgba(255,255,255,0.08)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "32px",
  marginBottom: "28px",
  textAlign: "center",
};

const infoBoxStyle: React.CSSProperties = {
  background: "#0f0f15",
  borderRadius: "18px",
  padding: "22px",
  marginBottom: "36px",
};

const labelStyle: React.CSSProperties = {
  color: "#aaa",
  fontSize: "14px",
  marginBottom: "8px",
};

const emailStyle: React.CSSProperties = {
  fontSize: "17px",
  fontWeight: 700,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "24px",
  marginBottom: "18px",
};

const emptyStyle: React.CSSProperties = {
  color: "#aaa",
  textAlign: "center",
  padding: "40px 0",
};

const orderListStyle: React.CSSProperties = {
  display: "grid",
  gap: "16px",
};

const orderCardStyle: React.CSSProperties = {
  width: "100%",
  background: "#0f0f15",
  color: "white",
  borderRadius: "18px",
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "18px",
  border: "1px solid rgba(255,255,255,0.08)",
  textAlign: "left",
  cursor: "pointer",
};

const orderLabelStyle: React.CSSProperties = {
  color: "#888",
  fontSize: "13px",
  marginBottom: "6px",
};

const orderNumberStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 800,
};

const orderTextStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 600,
};

const statusStyle: React.CSSProperties = {
  display: "inline-block",
  background: "rgba(255,255,255,0.12)",
  color: "#fff",
  padding: "7px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: 700,
};

const logoutButtonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "36px",
  padding: "15px",
  borderRadius: "999px",
  border: "none",
  background: "white",
  color: "#111",
  fontSize: "15px",
  fontWeight: 800,
  cursor: "pointer",
};

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.72)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 9999,
};

const modalStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: "760px",
  maxHeight: "86vh",
  overflowY: "auto",
  background: "#15151d",
  borderRadius: "28px",
  padding: "32px 22px",
  border: "1px solid rgba(255,255,255,0.12)",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "18px",
  right: "20px",
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "32px",
  cursor: "pointer",
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: "26px",
  marginBottom: "24px",
};

const detailGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
};

const detailBoxStyle: React.CSSProperties = {
  background: "#0f0f15",
  borderRadius: "16px",
  padding: "16px",
};

const detailLabelStyle: React.CSSProperties = {
  color: "#888",
  fontSize: "13px",
  marginBottom: "8px",
};

const detailValueStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  lineHeight: 1.5,
};

const productTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  marginTop: "28px",
  marginBottom: "14px",
};

const itemListStyle: React.CSSProperties = {
  display: "grid",
  gap: "12px",
};

const itemCardStyle: React.CSSProperties = {
  background: "#0f0f15",
  borderRadius: "16px",
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
};

const itemBrandStyle: React.CSSProperties = {
  color: "#aaa",
  fontSize: "13px",
  marginBottom: "5px",
};

const itemNameStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 800,
};

const itemOptionStyle: React.CSSProperties = {
  color: "#aaa",
  fontSize: "13px",
  marginTop: "6px",
};

const itemPriceStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 800,
  whiteSpace: "nowrap",
};

const totalBoxStyle: React.CSSProperties = {
  marginTop: "24px",
  background: "white",
  color: "#111",
  borderRadius: "18px",
  padding: "18px",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "17px",
  fontWeight: 800,
};