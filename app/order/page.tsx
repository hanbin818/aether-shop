"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function OrderPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const searchOrder = async () => {
    if (!phone.trim()) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_phone", phone)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("주문 조회 중 오류가 발생했습니다.");
      return;
    }

    if (!data || data.length === 0) {
      setOrders([]);
      setMessage("조회된 주문이 없습니다.");
      return;
    }

    setOrders(data);
    setMessage("");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        padding: "60px 20px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>주문조회</h1>

        <p style={{ color: "#777", marginBottom: "30px" }}>
          주문 시 입력한 전화번호로 주문 내역을 확인할 수 있습니다.
        </p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호 입력"
            style={{
              flex: 1,
              height: "48px",
              border: "1px solid #ddd",
              borderRadius: "999px",
              padding: "0 18px",
              fontSize: "15px",
            }}
          />

          <button
            onClick={searchOrder}
            style={{
              width: "90px",
              height: "48px",
              borderRadius: "999px",
              background: "#111",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            조회
          </button>
        </div>

        {message && <p style={{ color: "#777" }}>{message}</p>}

        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "18px",
              padding: "22px",
              marginBottom: "16px",
              background: "#fafafa",
            }}
          >
            <p>
              <b>주문번호:</b> {order.id}
            </p>
            <p>
              <b>주문자:</b> {order.customer_name}
            </p>
            <p>
              <b>전화번호:</b> {order.customer_phone}
            </p>
            <p>
              <b>주문상태:</b> {order.status || "주문접수"}
            </p>
            <p>
              <b>총 금액:</b>{" "}
              {Number(order.total_price || 0).toLocaleString()}원
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}