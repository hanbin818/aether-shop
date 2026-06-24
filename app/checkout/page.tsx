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

  const openChatUrl = "#";

  useEffect(() => {
    const savedCart = localStorage.getItem("aether-cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);

    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .maybeSingle();

    if (data) {
      setCustomerName(data.name || "");
      setCustomerPhone(data.phone || "");
      setCustomerAddress(data.address || "");
    }
  };

  const productTotalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const shippingFee =
    productTotalPrice >= FREE_SHIPPING_MINIMUM ? 0 : SHIPPING_FEE;

  const finalTotalPrice = productTotalPrice + shippingFee;

  const createOrderNumber = () => {
    const now = new Date();

    return `AETHER-${now.getFullYear()}${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(now.getDate()).padStart(2, "0")}-${String(
      now.getHours()
    ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
      now.getSeconds()
    ).padStart(2, "0")}`;
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }

    if (!customerName || !customerPhone || !customerAddress || !depositorName) {
      alert("주문자 정보와 입금자명을 모두 입력해 주세요.");
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
        payment_method: "오픈채팅 계좌이체",
        status: "상담대기",
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

    alert("주문이 접수되었습니다. 오픈채팅으로 주문번호를 보내주세요.");
    window.location.href = "/order-complete";
  };

  return (
    <main className="checkout-page">
      <div className="checkout-wrap">
        <a href="/cart" className="back-link">
          ← 장바구니로 돌아가기
        </a>

        <h1>주문하기</h1>

        <div className="checkout-grid">
          <section className="checkout-card">
            <div className="section-title-row">
              <h2>배송 정보</h2>

              <button
                type="button"
                onClick={() => (window.location.href = "/profile")}
                className="profile-button"
              >
                회원정보 수정
              </button>
            </div>

            <input
              placeholder="주문자 이름"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <input
              placeholder="연락처"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />

            <input
              placeholder="배송 주소"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />

            <p className="profile-notice">
              저장된 회원정보가 있으면 이름, 연락처, 배송지가 자동으로 입력됩니다.
            </p>

            <div className="bank-box">
              <h2>결제 방법</h2>

              <p>
                현재 AETHER는 <strong>카카오톡 오픈채팅 상담 후 계좌이체</strong>
                방식으로 주문이 진행됩니다.
              </p>

              <a href={openChatUrl} target="_blank" className="open-chat">
                오픈채팅으로 결제 문의하기
              </a>

              <input
                placeholder="입금자명"
                value={depositorName}
                onChange={(e) => setDepositorName(e.target.value)}
              />

              <p className="notice">
                주문 접수 후 오픈채팅으로 주문번호를 보내주세요. 상담 확인 후
                입금 계좌와 배송 안내를 도와드립니다.
              </p>
            </div>
          </section>

          <section className="checkout-card summary-card">
            <h2>주문 요약</h2>

            <div className="item-list">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <strong>
                    ₩{(Number(item.price) * item.quantity).toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>

            <hr />

            <div className="summary-row">
              <span>상품금액</span>
              <strong>₩{productTotalPrice.toLocaleString()}</strong>
            </div>

            <div className="summary-row">
              <span>배송비</span>
              <strong>
                {shippingFee === 0
                  ? "무료배송"
                  : `₩${shippingFee.toLocaleString()}`}
              </strong>
            </div>

            {shippingFee > 0 && (
              <p className="shipping-notice">
                ₩{(FREE_SHIPPING_MINIMUM - productTotalPrice).toLocaleString()}원
                더 담으면 무료배송
              </p>
            )}

            <hr />

            <p className="total-label">총 결제 예정 금액</p>
            <strong className="total-price">
              ₩{finalTotalPrice.toLocaleString()}
            </strong>

            <button onClick={submitOrder} disabled={loading}>
              {loading ? "주문 접수 중..." : "주문 접수하기"}
            </button>
          </section>
        </div>
      </div>

      <style>{`
        .checkout-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #fff 0%, #f7f1e8 100%);
          color: #111;
          padding: 60px 20px;
        }

        .checkout-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }

        .back-link {
          color: #9b8b73;
          text-decoration: none;
          font-size: 15px;
          font-weight: 900;
        }

        h1 {
          font-size: 44px;
          margin: 38px 0 30px;
          font-weight: 950;
          letter-spacing: -1.4px;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          gap: 30px;
        }

        .checkout-card {
          background: rgba(255,255,255,0.96);
          border-radius: 28px;
          padding: 32px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 24px 70px rgba(0,0,0,0.08);
        }

        .checkout-card h2 {
          margin: 0 0 24px;
          font-size: 28px;
          font-weight: 950;
          letter-spacing: -0.8px;
        }

        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .section-title-row h2 {
          margin: 0;
        }

        .profile-button {
          border: none;
          background: #111;
          color: #fff;
          padding: 10px 15px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 900;
          white-space: nowrap;
        }

        input {
          width: 100%;
          padding: 17px 18px;
          margin-bottom: 14px;
          border-radius: 16px;
          border: 1px solid #ddd;
          font-size: 16px;
          box-sizing: border-box;
          outline: none;
          color: #111;
          background: #fff;
        }

        .profile-notice {
          margin: 0 0 20px;
          color: #9b8b73;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.6;
        }

        .bank-box {
          margin-top: 20px;
          padding: 24px;
          background: #fafafa;
          border: 1px solid #eee;
          border-radius: 22px;
        }

        .bank-box p {
          color: #555;
          line-height: 1.8;
          font-size: 16px;
        }

        .open-chat {
          display: block;
          margin: 18px 0;
          padding: 18px;
          background: #111;
          color: #fff;
          border-radius: 999px;
          text-align: center;
          text-decoration: none;
          font-size: 17px;
          font-weight: 900;
        }

        .notice {
          color: #777 !important;
          font-size: 14px !important;
        }

        .item-list {
          display: grid;
          gap: 14px;
        }

        .summary-item,
        .summary-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          color: #444;
          font-size: 16px;
        }

        .summary-item span {
          max-width: 60%;
          line-height: 1.4;
        }

        .summary-item strong,
        .summary-row strong {
          white-space: nowrap;
        }

        hr {
          margin: 28px 0;
          border: none;
          border-top: 1px solid #eee;
        }

        .shipping-notice {
          margin-top: 10px;
          color: #9a5a00;
          font-weight: 800;
          font-size: 14px;
        }

        .total-label {
          margin-bottom: 8px;
          font-weight: 800;
        }

        .total-price {
          display: block;
          font-size: 32px;
          font-weight: 950;
        }

        .summary-card button {
          width: 100%;
          margin-top: 30px;
          padding: 20px;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 999px;
          font-size: 20px;
          font-weight: 950;
          cursor: pointer;
        }

        .summary-card button:disabled {
          background: #777;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .checkout-page {
            padding: 36px 16px 70px;
          }

          h1 {
            font-size: 40px;
            margin: 30px 0 24px;
          }

          .checkout-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .checkout-card {
            padding: 24px 18px;
            border-radius: 24px;
          }

          .checkout-card h2 {
            font-size: 26px;
          }

          .section-title-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .profile-button {
            width: 100%;
            padding: 13px 15px;
          }

          .summary-item,
          .summary-row {
            font-size: 15px;
          }

          .summary-item {
            align-items: flex-start;
          }

          .total-price {
            font-size: 30px;
          }

          .summary-card button {
            font-size: 22px;
            padding: 20px;
          }
        }
      `}</style>
    </main>
  );
}