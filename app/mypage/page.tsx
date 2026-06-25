"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type Order = {
  id: number;
  order_number?: string;
  customer_email?: string;
  total_price?: number;
  status?: string;
  created_at?: string;
};

export default function MyPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
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

      const { data: orderData } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", userEmail)
        .order("created_at", { ascending: false });

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

        <section style={orderSectionStyle}>
          <h2 style={sectionTitleStyle}>내 주문내역</h2>

          {orders.length === 0 ? (
            <p style={emptyStyle}>아직 주문내역이 없습니다.</p>
          ) : (
            <div style={orderListStyle}>
              {orders.map((order) => (
                <div key={order.id} style={orderCardStyle}>
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
                    <span style={statusStyle}>
                      {order.status || "주문접수"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <button onClick={logout} style={logoutButtonStyle}>
          로그아웃
        </button>
      </section>
    </main>
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

const orderSectionStyle: React.CSSProperties = {
  marginTop: "20px",
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
  background: "#0f0f15",
  borderRadius: "18px",
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "18px",
  border: "1px solid rgba(255,255,255,0.08)",
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