"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const ORDER_STATUSES = [
  "입금대기",
  "입금확인",
  "배송준비중",
  "배송중",
  "배송완료",
  "주문취소",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id);

    const { error } = await supabase.from("orders").update({ status }).eq("id", id);

    if (error) {
      console.error(error);
      alert("주문 상태 변경에 실패했습니다.");
      setUpdatingId(null);
      return;
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );

    setUpdatingId(null);
  };

  const getStatusStyle = (status: string) => {
    if (status === "배송완료") return { background: "#e8f7ee", color: "#167a3a" };
    if (status === "배송중") return { background: "#eaf1ff", color: "#2359c4" };
    if (status === "배송준비중") return { background: "#fff4df", color: "#9a5a00" };
    if (status === "입금확인") return { background: "#eef8ff", color: "#0069a8" };
    if (status === "주문취소") return { background: "#ffecec", color: "#c62828" };
    return { background: "#111", color: "#fff" };
  };

  return (
    <main style={pageStyle}>
      <a href="/admin" style={backLinkStyle}>
        ← 관리자 홈으로
      </a>

      <p style={labelStyle}>AETHER ADMIN</p>

      <h1 style={titleStyle}>주문 관리</h1>

      <p style={descStyle}>
        고객 주문 정보를 확인하고 주문 상태를 변경할 수 있습니다.
      </p>

      {loading ? (
        <p style={noticeStyle}>주문 불러오는 중...</p>
      ) : orders.length === 0 ? (
        <p style={noticeStyle}>아직 주문이 없습니다.</p>
      ) : (
        <div style={listStyle}>
          {orders.map((order) => {
            const currentStatus = order.status || "입금대기";
            const displayOrderNumber =
              order.order_number || `주문번호 #${order.id}`;

            return (
              <section key={order.id} style={orderCardStyle}>
                <div style={topAreaStyle}>
                  <div>
                    <p style={smallLabelStyle}>주문번호</p>

                    <h3 style={orderNumberStyle}>{displayOrderNumber}</h3>

                    <p style={dbIdStyle}>DB ID #{order.id}</p>

                    {order.created_at && (
                      <p style={dateStyle}>
                        주문일시: {new Date(order.created_at).toLocaleString("ko-KR")}
                      </p>
                    )}
                  </div>

                  <span
                    style={{
                      ...statusBadgeStyle,
                      ...getStatusStyle(currentStatus),
                    }}
                  >
                    {currentStatus}
                  </span>
                </div>

                <div style={statusBoxStyle}>
                  <label style={selectLabelStyle}>주문상태 변경</label>

                  <select
                    value={currentStatus}
                    disabled={updatingId === order.id}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={selectStyle}
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  {updatingId === order.id && (
                    <p style={updatingTextStyle}>상태 변경 중...</p>
                  )}
                </div>

                <div style={infoGridStyle}>
                  <p>
                    <strong>주문자</strong>
                    <br />
                    {order.customer_name || "-"}
                  </p>

                  <p>
                    <strong>연락처</strong>
                    <br />
                    {order.customer_phone || "-"}
                  </p>

                  <p>
                    <strong>주소</strong>
                    <br />
                    {order.customer_address || "-"}
                  </p>

                  <p>
                    <strong>입금자명</strong>
                    <br />
                    {order.depositor_name || "-"}
                  </p>

                  <p>
                    <strong>결제방법</strong>
                    <br />
                    {order.payment_method || "-"}
                  </p>

                  <p>
                    <strong>총 결제금액</strong>
                    <br />₩{Number(order.total_price || 0).toLocaleString()}
                  </p>
                </div>

                <hr style={lineStyle} />

                <h4 style={itemsTitleStyle}>주문 상품</h4>

                {Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item: any, index: number) => (
                    <div key={index} style={itemRowStyle}>
                      <div>
                        <strong>{item.brand ? `${item.brand} · ` : ""}{item.name}</strong>
                      </div>

                      <div style={{ color: "#666", fontWeight: 800 }}>
                        {item.quantity}개 × ₩{Number(item.price).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#777" }}>주문 상품 정보가 없습니다.</p>
                )}
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fff 0%, #f7f1e8 100%)",
  padding: "48px 18px 90px",
  color: "#111",
};

const backLinkStyle = {
  display: "inline-block",
  textDecoration: "none",
  color: "#9b8b73",
  fontSize: "13px",
  fontWeight: 900,
  marginBottom: "30px",
};

const labelStyle = {
  maxWidth: "1100px",
  margin: "0 auto 10px",
  color: "#9b8b73",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const titleStyle = {
  maxWidth: "1100px",
  margin: "0 auto 10px",
  fontSize: "42px",
  fontWeight: 950,
  letterSpacing: "-1.5px",
};

const descStyle = {
  maxWidth: "1100px",
  margin: "0 auto 34px",
  color: "#666",
  lineHeight: "1.7",
  fontSize: "15px",
};

const noticeStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  background: "#fff",
  padding: "40px",
  borderRadius: "24px",
  fontWeight: 900,
  color: "#777",
};

const listStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gap: "22px",
};

const orderCardStyle = {
  background: "rgba(255,255,255,0.96)",
  padding: "26px",
  borderRadius: "26px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 22px 70px rgba(0,0,0,0.08)",
};

const topAreaStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  flexWrap: "wrap" as const,
  alignItems: "center",
};

const smallLabelStyle = {
  margin: 0,
  color: "#9b8b73",
  fontSize: "12px",
  fontWeight: "950",
  letterSpacing: "2px",
};

const orderNumberStyle = {
  fontSize: "25px",
  marginTop: "6px",
  marginBottom: "8px",
  letterSpacing: "-0.7px",
};

const dbIdStyle = {
  color: "#999",
  fontSize: "13px",
  margin: 0,
  fontWeight: "800",
};

const dateStyle = {
  color: "#777",
  fontSize: "14px",
  marginTop: "8px",
  marginBottom: 0,
};

const statusBadgeStyle = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "900",
};

const statusBoxStyle = {
  marginTop: "24px",
  marginBottom: "22px",
  background: "#fafafa",
  border: "1px solid #eee",
  borderRadius: "20px",
  padding: "18px",
};

const selectLabelStyle = {
  display: "block",
  marginBottom: "10px",
  color: "#777",
  fontSize: "13px",
  fontWeight: 900,
};

const selectStyle = {
  width: "100%",
  height: "54px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  padding: "0 18px",
  fontSize: "15px",
  fontWeight: 900,
  cursor: "pointer",
};

const updatingTextStyle = {
  margin: "10px 0 0",
  color: "#9b8b73",
  fontSize: "13px",
  fontWeight: 900,
};

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  background: "#fafafa",
  padding: "18px",
  borderRadius: "20px",
  color: "#333",
  lineHeight: "1.6",
};

const lineStyle = {
  margin: "24px 0",
  border: "none",
  borderTop: "1px solid #eee",
};

const itemsTitleStyle = {
  marginBottom: "12px",
  fontSize: "18px",
};

const itemRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  padding: "13px 0",
  borderBottom: "1px solid #eee",
  flexWrap: "wrap" as const,
};