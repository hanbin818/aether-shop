"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("로그인이 필요한 페이지입니다.");
      window.location.href = "/login";
      return;
    }

    const user = userData.user;

    setUserId(user.id);
    setEmail(user.email || "");

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (data) {
      setName(data.name || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
    }

    setLoading(false);
  };

  const saveProfile = async () => {
    if (!userId) return;

    setSaving(true);

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      email,
      name,
      phone,
      address,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);

    if (error) {
      console.error(error);
      alert("회원정보 저장에 실패했습니다.");
      return;
    }

    alert("회원정보가 저장되었습니다.");
    window.location.href = "/mypage";
  };

  if (loading) {
    return <main style={centerStyle}>회원정보 불러오는 중...</main>;
  }

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <a href="/mypage" style={backStyle}>
          ← 마이페이지로 돌아가기
        </a>

        <p style={labelStyle}>AETHER MEMBERS</p>

        <h1 style={titleStyle}>회원정보 수정</h1>

        <p style={descStyle}>
          주문 시 사용할 이름, 연락처, 기본 배송지를 저장할 수 있습니다.
        </p>

        <div style={formStyle}>
          <label style={fieldStyle}>
            <span style={fieldLabelStyle}>이메일</span>
            <input value={email} disabled style={disabledInputStyle} />
          </label>

          <label style={fieldStyle}>
            <span style={fieldLabelStyle}>이름</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            <span style={fieldLabelStyle}>연락처</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            <span style={fieldLabelStyle}>기본 배송지</span>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소를 입력하세요"
              style={textareaStyle}
            />
          </label>
        </div>

        <button onClick={saveProfile} disabled={saving} style={saveButtonStyle}>
          {saving ? "저장 중..." : "저장하기"}
        </button>
      </section>
    </main>
  );
}

const centerStyle = {
  minHeight: "100vh",
  background: "#fff",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
};

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fff 0%, #f7f1e8 100%)",
  color: "#111",
  padding: "54px 16px 80px",
};

const cardStyle = {
  maxWidth: "720px",
  margin: "0 auto",
  background: "rgba(255,255,255,0.96)",
  borderRadius: "32px",
  padding: "34px 22px",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 26px 80px rgba(0,0,0,0.09)",
};

const backStyle = {
  display: "inline-block",
  color: "#9b8b73",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 900,
  marginBottom: "34px",
};

const labelStyle = {
  margin: 0,
  marginBottom: "12px",
  color: "#9b8b73",
  fontSize: "11px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const titleStyle = {
  fontSize: "40px",
  margin: 0,
  marginBottom: "16px",
  fontWeight: 950,
  letterSpacing: "-1.4px",
};

const descStyle = {
  color: "#666",
  fontSize: "15px",
  lineHeight: "1.8",
  marginBottom: "30px",
};

const formStyle = {
  display: "grid",
  gap: "18px",
  marginBottom: "28px",
};

const fieldStyle = {
  display: "grid",
  gap: "8px",
};

const fieldLabelStyle = {
  fontSize: "13px",
  fontWeight: 950,
  color: "#555",
};

const inputStyle = {
  width: "100%",
  height: "54px",
  borderRadius: "16px",
  border: "1px solid #ddd",
  padding: "0 16px",
  fontSize: "15px",
  fontWeight: 800,
  outline: "none",
  boxSizing: "border-box" as const,
};

const disabledInputStyle = {
  ...inputStyle,
  background: "#f4f4f4",
  color: "#777",
};

const textareaStyle = {
  width: "100%",
  minHeight: "120px",
  borderRadius: "16px",
  border: "1px solid #ddd",
  padding: "16px",
  fontSize: "15px",
  fontWeight: 800,
  outline: "none",
  resize: "vertical" as const,
  boxSizing: "border-box" as const,
};

const saveButtonStyle = {
  width: "100%",
  height: "58px",
  borderRadius: "999px",
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 950,
  cursor: "pointer",
  boxShadow: "0 16px 34px rgba(0,0,0,0.18)",
};