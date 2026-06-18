"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const ORDER_STATUSES = [
  "입금대기",
  "입금확인",
  "배송준비중",
  "배송중",
  "배송완료",
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

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("주문 상태 변경 실패 ㅠㅠ");
      setUpdatingId(null);
      return;
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );

    setUpdatingId(null);
  };

  const getStatusStyle = (status: string) => {
    if (status === "배송완료") {
      return { background: "#e8f7ee", color: "#167a3a" };
    }

    if (status === "배송중") {
      return { background: "#eaf1ff", color: "#2359c4" };
    }

    if (status === "배송준비중") {
      return { background: "#fff4df", color: "#9a5a00" };
    }

    if (status === "입금확인") {
      return { background: "#eef8ff", color: "#0069a8" };
    }

    if (status === "입금대기") {
      return { background: "#111", color: "#fff" };
    }

    return { background: "#111", color: "#fff" };
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "50px",
        color: "#111",
      }}
    >
      <a href="/admin" style={backLinkStyle}>
        ← 관리자 홈으로
      </a>

      <h1
        style={{
          fontSize: "40px",
          marginTop: "20px",
          marginBottom: "8px",
        }}
      >
        주문 관리
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        고객 주문과 입금 정보를 확인하고 배송 상태를 변경할 수 있어.
      </p>

      {loading ? (
        <p>주문 불러오는 중...</p>
      ) : orders.length === 0 ? (
        <p>아직 주문이 없어.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "22px",
          }}
        >
          {orders.map((order) => {
            const currentStatus = order.status || "입금대기";
            const displayOrderNumber =
              order.order_number || `주문번호 #${order.id}`;

            return (
              <div key={order.id} style={orderCardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={smallLabelStyle}>주문번호</p>

                    <h3
                      style={{
                        fontSize: "26px",
                        marginTop: "4px",
                        marginBottom: "8px",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {displayOrderNumber}
                    </h3>

                    <p
                      style={{
                        color: "#999",
                        fontSize: "13px",
                        margin: 0,
                        fontWeight: "700",
                      }}
                    >
                      DB ID #{order.id}
                    </p>

                    {order.created_at && (
                      <p
                        style={{
                          color: "#777",
                          fontSize: "14px",
                          marginTop: "8px",
                          marginBottom: 0,
                        }}
                      >
                        주문일시:{" "}
                        {new Date(order.created_at).toLocaleString("ko-KR")}
                      </p>
                    )}
                  </div>

                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "800",
                      ...getStatusStyle(currentStatus),
                    }}
                  >
                    {currentStatus}
                  </span>
                </div>

                <div style={statusAreaStyle}>
                  {ORDER_STATUSES.map((status) => (
                    <button
                      key={status}
                      disabled={updatingId === order.id}
                      onClick={() => updateStatus(order.id, status)}
                      style={{
                        ...statusButtonStyle,
                        background:
                          currentStatus === status ? "#111" : "#f7f7f7",
                        color: currentStatus === status ? "#fff" : "#111",
                        border:
                          currentStatus === status
                            ? "1px solid #111"
                            : "1px solid #ddd",
                        opacity: updatingId === order.id ? 0.5 : 1,
                        cursor:
                          updatingId === order.id ? "not-allowed" : "pointer",
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div style={infoGridStyle}>
                  <p>
                    <strong>주문자</strong>
                    <br />
                    {order.customer_name}
                  </p>

                  <p>
                    <strong>연락처</strong>
                    <br />
                    {order.customer_phone}
                  </p>

                  <p>
                    <strong>주소</strong>
                    <br />
                    {order.customer_address}
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
                    <strong>총 입금금액</strong>
                    <br />₩{Number(order.total_price || 0).toLocaleString()}
                  </p>
                </div>

                <hr
                  style={{
                    margin: "22px 0",
                    border: "none",
                    borderTop: "1px solid #eee",
                  }}
                />

                <h4 style={{ marginBottom: "12px" }}>주문 상품</h4>

                {Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item: any, index: number) => (
                    <div key={index} style={itemRowStyle}>
                      <div>
                        <strong>{item.name}</strong>
                      </div>

                      <div style={{ color: "#666" }}>
                        {item.quantity}개 × ₩
                        {Number(item.price).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#777" }}>주문 상품 정보가 없어.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

const backLinkStyle = {
  textDecoration: "none",
  color: "#666",
  fontWeight: "700",
};

const orderCardStyle = {
  background: "#fff",
  padding: "26px",
  borderRadius: "18px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
};

const smallLabelStyle = {
  margin: 0,
  color: "#777",
  fontSize: "13px",
  fontWeight: "900",
  letterSpacing: "1px",
};

const statusAreaStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap" as const,
  marginTop: "22px",
  marginBottom: "22px",
};

const statusButtonStyle = {
  padding: "10px 14px",
  borderRadius: "999px",
  fontWeight: "800",
};

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  background: "#fafafa",
  padding: "18px",
  borderRadius: "14px",
};

const itemRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  padding: "12px 0",
  borderBottom: "1px solid #eee",
};