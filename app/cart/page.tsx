"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  brand: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

const FREE_SHIPPING_MINIMUM = 100000;
const SHIPPING_FEE = 3000;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("aether-cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("aether-cart", JSON.stringify(newCart));
  };

  const increaseQuantity = (id: number) => {
    saveCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    saveCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const productTotalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const shippingFee =
    productTotalPrice >= FREE_SHIPPING_MINIMUM ? 0 : SHIPPING_FEE;

  const finalTotalPrice = productTotalPrice + shippingFee;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        color: "#111",
        padding: "60px 80px",
      }}
    >
      <a href="/" style={{ color: "#777", textDecoration: "none" }}>
        ← 홈으로 돌아가기
      </a>

      <h1 style={{ fontSize: "44px", marginTop: "40px" }}>장바구니</h1>

      {cart.length === 0 ? (
        <div
          style={{
            marginTop: "40px",
            background: "#fff",
            padding: "60px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#777" }}>
            아직 장바구니에 담긴 상품이 없습니다.
          </p>

          <a
            href="/products"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "14px 28px",
              background: "#111",
              color: "#fff",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: "800",
            }}
          >
            쇼핑하러 가기
          </a>
        </div>
      ) : (
        <>
          <div style={{ marginTop: "30px", display: "grid", gap: "20px" }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  borderRadius: "22px",
                  padding: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "24px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "22px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "18px",
                      overflow: "hidden",
                      background: "#fafafa",
                      flexShrink: 0,
                    }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "8px",
                          boxSizing: "border-box",
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#777",
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: "700",
                        letterSpacing: "1px",
                      }}
                    >
                      {item.brand}
                    </p>

                    <h3 style={{ margin: "8px 0", fontSize: "22px" }}>
                      {item.name}
                    </h3>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "6px",
                        fontSize: "18px",
                      }}
                    >
                      ₩{Number(item.price).toLocaleString()}
                    </strong>

                    <div
                      style={{
                        marginTop: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        style={quantityMinusButtonStyle}
                      >
                        −
                      </button>

                      <span
                        style={{
                          minWidth: "30px",
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: "800",
                        }}
                      >
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        style={quantityPlusButtonStyle}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    border: "none",
                    background: "#111",
                    color: "#fff",
                    padding: "12px 20px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>

          <div style={summaryBoxStyle}>
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

            <hr style={summaryLineStyle} />

            <div style={summaryTotalRowStyle}>
              <h2 style={{ margin: 0 }}>총 결제금액</h2>

              <strong style={{ fontSize: "28px" }}>
                ₩{finalTotalPrice.toLocaleString()}
              </strong>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => (window.location.href = "/checkout")}
              style={{
                width: "100%",
                padding: "20px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "22px",
                fontSize: "18px",
                fontWeight: "800",
                cursor: "pointer",
                letterSpacing: "1px",
              }}
            >
              주문하기
            </button>
          </div>
        </>
      )}
    </main>
  );
}

const summaryBoxStyle = {
  marginTop: "30px",
  background: "#111",
  color: "#fff",
  borderRadius: "22px",
  padding: "28px",
};

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  fontSize: "17px",
};

const shippingNoticeStyle = {
  marginTop: "8px",
  marginBottom: "18px",
  color: "#c9a86a",
  fontWeight: "800",
};

const summaryLineStyle = {
  border: "none",
  borderTop: "1px solid rgba(255,255,255,0.18)",
  margin: "20px 0",
};

const summaryTotalRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const quantityMinusButtonStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "700",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const quantityPlusButtonStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "700",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};