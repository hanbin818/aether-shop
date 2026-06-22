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

    alert("주문이 접수되었습니다. 입금 확인 후 배송이 시작됩니다.");
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
            <h2>배송 정보</h2>

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

            <div className="bank-box">
              <h2>결제 방법</h2>

              <p>
                현재 AETHER는 <strong>무통장입금 / 계좌이체</strong> 주문
                방식으로 운영됩니다.
              </p>

              <div className="bank-info">
                <strong>입금 계좌</strong>
                <span>국민은행 000000-00-000000</span>
                <span>예금주: AETHER</span>
              </div>

              <input
                placeholder="입금자명"
                value={depositorName}
                onChange={(e) => setDepositorName(e.target.value)}
              />

              <p className="notice">
                주문 완료 후 위 계좌로 입금해 주세요. 입금 확인 후 배송 준비가
                시작됩니다.
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

            <p className="total-label">총 입금금액</p>
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
          background: #f7f7f7;
          color: #111;
          padding: 60px 20px;
        }

        .checkout-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }

        .back-link {
          color: #777;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
        }

        h1 {
          font-size: 44px;
          margin: 38px 0 30px;
          font-weight: 900;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          gap: 30px;
        }

        .checkout-card {
          background: #fff;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .checkout-card h2 {
          margin: 0 0 24px;
          font-size: 28px;
          font-weight: 900;
        }

        input {
          width: 100%;
          padding: 17px 18px;
          margin-bottom: 14px;
          border-radius: 14px;
          border: 1px solid #ddd;
          font-size: 16px;
          box-sizing: border-box;
          outline: none;
        }

        .bank-box {
          margin-top: 20px;
          padding: 24px;
          background: #fafafa;
          border: 1px solid #eee;
          border-radius: 18px;
        }

        .bank-box p {
          color: #555;
          line-height: 1.7;
        }

        .bank-info {
          margin: 16px 0 18px;
          padding: 18px;
          background: #111;
          color: #fff;
          border-radius: 14px;
          display: grid;
          gap: 8px;
        }

        .notice {
          color: #777 !important;
          font-size: 14px;
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
          font-weight: 900;
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
          font-weight: 900;
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
            border-radius: 22px;
          }

          .checkout-card h2 {
            font-size: 26px;
          }

          .summary-item,
          .summary-row {
            font-size: 15px;
          }

          .summary-item {
            align-items: flex-start;
          }

          .summary-item strong {
            white-space: nowrap;
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