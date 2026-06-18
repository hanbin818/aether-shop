"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type CartItem = {
  id: number;
  brand: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
};

const FREE_SHIPPING_MINIMUM = 100000;
const SHIPPING_FEE = 3000;

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [depositorName, setDepositorName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("aether-cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const productTotalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const shippingFee =
    productTotalPrice >= FREE_SHIPPING_MINIMUM ? 0 : SHIPPING_FEE;

  const finalTotalPrice = productTotalPrice + shippingFee;

  const createOrderNumber = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    return `AETHER-${year}${month}${date}-${hour}${minute}${second}`;
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      alert("장바구니가 비어있어!");
      return;
    }

    if (!customerName || !customerPhone || !customerAddress || !depositorName) {
      alert("주문자 정보와 입금자명을 모두 입력해줘!");
      return;
    }

    setLoading(true);

    const orderNumber = createOrderNumber();

    const { error } = await supabase.from("orders").insert([
      {
        order_number: orderNumber,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        depositor_name: depositorName,
        payment_method: "무통장입금",
        status: "입금대기",
        total_price: finalTotalPrice,
        items: cart,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    localStorage.removeItem("aether-cart");
    localStorage.setItem("aether-last-order-number", orderNumber);

    alert("주문이 접수됐어! 입금 확인 후 배송이 시작돼.");

    window.location.href = "/order-complete";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        padding: "60px 80px",
        color: "#111",
      }}
    >
      <a href="/cart" style={{ color: "#777", textDecoration: "none" }}>
        ← 장바구니로 돌아가기
      </a>

      <h1 style={{ fontSize: "44px", marginTop: "40px" }}>주문하기</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.8fr",
          gap: "30px",
          marginTop: "30px",
          maxWidth: "1100px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginBottom: "24px" }}>배송 정보</h2>

          <input
            placeholder="주문자 이름"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="연락처"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="배송 주소"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            style={inputStyle}
          />

          <div style={bankBoxStyle}>
            <h2 style={{ marginTop: 0 }}>결제 방법</h2>

            <p style={{ color: "#555", lineHeight: "1.7" }}>
              현재 AETHER는 <strong>무통장입금 / 계좌이체</strong> 주문
              방식으로 운영됩니다.
            </p>

            <div style={bankInfoStyle}>
              <p style={{ margin: 0 }}>
                <strong>입금 계좌</strong>
              </p>
              <p style={{ margin: "8px 0 0" }}>국민은행 000000-00-000000</p>
              <p style={{ margin: "4px 0 0" }}>예금주: AETHER</p>
            </div>

            <input
              placeholder="입금자명"
              value={depositorName}
              onChange={(e) => setDepositorName(e.target.value)}
              style={{ ...inputStyle, marginTop: "18px", marginBottom: 0 }}
            />

            <p
              style={{
                color: "#777",
                fontSize: "14px",
                lineHeight: "1.7",
                marginTop: "14px",
              }}
            >
              주문 완료 후 위 계좌로 입금해 주세요. 입금 확인 후 배송 준비가
              시작됩니다.
            </p>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            alignSelf: "start",
          }}
        >
          <h2>주문 요약</h2>

          <div style={{ marginTop: "20px", display: "grid", gap: "14px" }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  color: "#444",
                }}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <strong>
                  ₩{(Number(item.price) * item.quantity).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>

          <hr style={lineStyle} />

          <div style={summaryRowStyle}>
            <span>상품금액</span>
            <strong>₩{productTotalPrice.toLocaleString()}</strong>
          </div>

          <div style={summaryRowStyle}>
            <span>배송비</span>
            <strong>
              {shippingFee === 0
                ? "무료배송"
                : `₩${shippingFee.toLocaleString()}`}
            </strong>
          </div>

          {shippingFee > 0 && (
            <p style={shippingNoticeStyle}>
              ₩{(FREE_SHIPPING_MINIMUM - productTotalPrice).toLocaleString()}원
              더 담으면 무료배송
            </p>
          )}

          <hr style={lineStyle} />

          <p>총 입금금액</p>
          <strong style={{ fontSize: "28px" }}>
            ₩{finalTotalPrice.toLocaleString()}
          </strong>

          <button
            onClick={submitOrder}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "18px",
              background: loading ? "#777" : "#111",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              fontSize: "17px",
              fontWeight: "800",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "주문 접수 중..." : "주문 접수하기"}
          </button>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxSizing: "border-box" as const,
};

const bankBoxStyle = {
  marginTop: "20px",
  padding: "24px",
  background: "#fafafa",
  border: "1px solid #eee",
  borderRadius: "18px",
};

const bankInfoStyle = {
  marginTop: "16px",
  padding: "18px",
  background: "#111",
  color: "#fff",
  borderRadius: "14px",
};

const lineStyle = {
  margin: "28px 0",
  border: "none",
  borderTop: "1px solid #eee",
};

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  fontSize: "16px",
};

const shippingNoticeStyle = {
  marginTop: "10px",
  color: "#9a5a00",
  fontWeight: "800",
  fontSize: "14px",
};