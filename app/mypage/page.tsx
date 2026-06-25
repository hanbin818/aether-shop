"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type Order = {
  id: number;
  order_number: string;
  customer_email?: string;
  total_price?: number;
  payment_method?: string;
  status?: string;
  items?: any;
  created_at: string;
};

export default function MyPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyPage = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        alert("로그인이 필요한 페이지입니다.");
        window.location.href = "/login";
        return;
      }

      const userEmail = userData.user.email || "";
      setEmail(userEmail);

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", userEmail)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data);
      }

      setLoading(false);
    };

    loadMyPage();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    alert("로그아웃되었습니다.");
    window.location.href = "/";
  };

  const formatPrice = (price?: number) => {
    if (!price) return "0원";
    return `${price.toLocaleString()}원`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ko-KR");
  };

  const getItemNames = (items: any) => {
    if (!items) return "상품 정보 없음";

    if (Array.isArray(items)) {
      return items.map((item) => item.name).join(", ");
    }

    return "상품 정보 있음";
  };

  if (loading) {
    return <main style={centerStyle}>회원정보 확인 중...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={subTitleStyle}>MY PAGE</p>
        <h1 style={titleStyle}>마이페이지</h1>

        <div style={infoBoxStyle}>
          <p style={labelStyle}>이메일</p>
          <p style={valueStyle}>{email}</p>
        </div>

        <div style={sectionHeaderStyle}>
          <h2 style={orderTitleStyle}>내 주문내역</h2>
          <p style={orderDescStyle}>최근 주문한 상품을 확인할 수 있습니다.</p>
        </div>

        {orders.length === 0 ? (
          <div style={emptyStyle}>아직 주문내역이 없습니다.</div>
        ) : (
          <div style={orderListStyle}>
            {orders.map((order) => (
              <div key={order.id} style={orderCardStyle}>
                <div style={rowStyle}>
                  <span style={smallLabelStyle}>주문번호</span>
                  <strong style={orderNumberStyle}>
                    {order.order_number || "-"}
                  </strong>
                </div>

                <div style={rowStyle}>
                  <span style={smallLabelStyle}>주문일</span>
                  <span>{formatDate(order.created_at)}</span>
                </div>

                <div style={rowStyle}>
                  <span style={smallLabelStyle}>상품</span>
                  <span>{getItemNames(order.items)}</span>
                </div>

                <div style={rowStyle}>
                  <span style={smallLabelStyle}>결제방식</span>
                  <span>{order.payment_method || "오픈채팅 상담"}</span>
                </div>

                <div style={rowStyle}>
                  <span style={smallLabelStyle}>총 금액</span>
                  <strong>{formatPrice(order.total_price)}</strong>
                </div>

                <div style={statusStyle}>
                  {order.status || "상담대기"}
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={logout} style={logoutButtonStyle}>
          로그아웃
        </button>
      </section>
    </main>
  );
}

const centerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0b0b0f",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0b0b0f",
  color: "white",
  padding: "90px 20px",
};

const cardStyle: React.CSSProperties = {
  maxWidth: "820px",
  margin: "0 auto",
  background: "#15151d",
  borderRadius: "28px",
  padding: "42px 24px",
  border: "1px solid rgba(255,255,255,0.08)",
};

const subTitleStyle: React.CSSProperties = {
  textAlign: "center",
  letterSpacing: "5px",
  fontSize: "12px",
  color: "#c9a86a",
  marginBottom: "12px",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "34px",
  marginBottom: "32px",
};

const infoBoxStyle: React.CSSProperties = {
  background: "#0f0f15",
  borderRadius: "18px",
  padding: "20px",
  marginBottom: "36px",
};

const labelStyle: React.CSSProperties = {
  color: "#aaa",
  fontSize: "13px",
  marginBottom: "8px",
};

const valueStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
};

const sectionHeaderStyle: React.CSSProperties = {
  marginBottom: "18px",
};

const orderTitleStyle: React.CSSProperties = {
  fontSize: "24px",
  marginBottom: "8px",
};

const orderDescStyle: React.CSSProperties = {
  color: "#aaa",
  fontSize: "14px",
};

const emptyStyle: React.CSSProperties = {
  background: "#0f0f15",
  borderRadius: "18px",
  padding: "40px 20px",
  textAlign: "center",
  color: "#aaa",
};

const orderListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const orderCardStyle: React.CSSProperties = {
  background: "#0f0f15",
  borderRadius: "20px",
  padding: "22px",
  border: "1px solid rgba(255,255,255,0.08)",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  marginBottom: "12px",
  fontSize: "14px",
};

const smallLabelStyle: React.CSSProperties = {
  color: "#aaa",
  minWidth: "80px",
};

const orderNumberStyle: React.CSSProperties = {
  color: "#c9a86a",
  textAlign: "right",
};

const statusStyle: React.CSSProperties = {
  marginTop: "14px",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "rgba(201,168,106,0.14)",
  color: "#c9a86a",
  textAlign: "center",
  fontWeight: 700,
};

const logoutButtonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "34px",
  padding: "16px",
  borderRadius: "999px",
  border: "none",
  background: "#ffffff",
  color: "#111",
  fontSize: "15px",
  fontWeight: 800,
  cursor: "pointer",
};