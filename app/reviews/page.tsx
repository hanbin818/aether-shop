"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Review = {
  id: number;
  title: string;
  content: string;
  image: string;
  rating: number;
  created_at?: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setReviews(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={labelStyle}>AETHER REVIEW</p>
        <h1 style={titleStyle}>구매후기</h1>
        <p style={descStyle}>
          AETHER 고객님들의 프리미엄 구매후기를 확인해보세요.
        </p>
      </section>

      {loading ? (
        <p style={emptyStyle}>리뷰 불러오는 중...</p>
      ) : reviews.length === 0 ? (
        <section style={emptyCardStyle}>
          <p style={emptyTitleStyle}>아직 등록된 리뷰가 없습니다.</p>
          <p style={emptyTextStyle}>관리자 페이지에서 리뷰를 등록해 주세요.</p>
          <a href="/home" style={buttonStyle}>홈으로 돌아가기</a>
        </section>
      ) : (
        <section style={gridStyle}>
          {reviews.map((review) => (
            <article key={review.id} style={cardStyle}>
              <img src={review.image} alt={review.title} style={imageStyle} />

              <div style={cardBodyStyle}>
                <div style={starStyle}>
                  {"★".repeat(review.rating || 5)}
                </div>

                <h2 style={reviewTitleStyle}>{review.title}</h2>
                <p style={reviewContentStyle}>{review.content}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg,#fff,#f8f5ef)",
  padding: "34px 14px 80px",
};

const heroStyle = {
  maxWidth: "980px",
  margin: "0 auto 30px",
  textAlign: "center" as const,
};

const labelStyle = {
  color: "#9b8b73",
  letterSpacing: "4px",
  fontWeight: 900,
  fontSize: "12px",
};

const titleStyle = {
  fontSize: "clamp(38px,7vw,64px)",
  fontWeight: 950,
  margin: "12px 0 14px",
};

const descStyle = {
  color: "#666",
  lineHeight: 1.8,
  fontSize: "16px",
};

const gridStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "18px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 18px 50px rgba(0,0,0,.08)",
  border: "1px solid rgba(0,0,0,.06)",
};

const imageStyle = {
  width: "100%",
  aspectRatio: "1 / 1",
  objectFit: "cover" as const,
  display: "block",
};

const cardBodyStyle = {
  padding: "18px",
};

const starStyle = {
  color: "#b8975a",
  fontSize: "15px",
  letterSpacing: "2px",
  marginBottom: "10px",
};

const reviewTitleStyle = {
  margin: "0 0 10px",
  fontSize: "18px",
  fontWeight: 950,
};

const reviewContentStyle = {
  margin: 0,
  color: "#666",
  lineHeight: 1.7,
  fontSize: "14px",
  whiteSpace: "pre-line" as const,
};

const emptyStyle = {
  textAlign: "center" as const,
  fontWeight: 900,
  color: "#777",
};

const emptyCardStyle = {
  maxWidth: "620px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "28px",
  padding: "44px 24px",
  textAlign: "center" as const,
  boxShadow: "0 20px 60px rgba(0,0,0,.08)",
};

const emptyTitleStyle = {
  fontSize: "22px",
  fontWeight: 950,
  margin: "0 0 10px",
};

const emptyTextStyle = {
  color: "#777",
  marginBottom: "24px",
};

const buttonStyle = {
  display: "block",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  padding: "16px",
  borderRadius: "999px",
  fontWeight: 900,
};