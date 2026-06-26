const KAKAO_CHANNEL_URL = "http://pf.kakao.com/_FvxexfX";

const events = [
  {
    label: "EVENT 01",
    title: "카카오톡 채널 추가 혜택",
    desc: "AETHER 카카오톡 채널 추가시 전품목 10% 할인 혜택을 드립니다.",
    button: "채널 추가하러 가기",
    href: KAKAO_CHANNEL_URL,
  },
  {
    label: "EVENT 02",
    title: "포토리뷰 작성 혜택",
    desc: "구매 후 포토리뷰 작성시 다음 구매에 사용 가능한 10% 할인 혜택을 드립니다.",
    button: "리뷰 페이지 보기",
    href: "/reviews",
  },
  {
    label: "EVENT 03",
    title: "여름맞이 시즌 프로모션",
    desc: "여름맞이 행사로 일부 상품 전용 3+1 이벤트를 준비하고 있습니다.",
    button: "상품 보러가기",
    href: "/products",
  },
];

export default function EventsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={labelStyle}>AETHER EVENT</p>
        <h1 style={titleStyle}>이벤트</h1>
        <p style={descStyle}>
          AETHER에서 진행되는 혜택과 시즌 프로모션을 확인해보세요.
        </p>
      </section>

      <section style={eventListStyle}>
        {events.map((event) => {
          const isExternal = event.href.startsWith("http");

          return (
            <div key={event.label} style={eventBannerStyle}>
              <div>
                <p style={eventLabelStyle}>{event.label}</p>
                <h2 style={eventTitleStyle}>{event.title}</h2>
                <p style={eventDescStyle}>{event.desc}</p>
              </div>

              <a
                href={event.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                style={eventButtonStyle}
              >
                {event.button}
              </a>
            </div>
          );
        })}
      </section>

      <section style={bottomStyle}>
        <a href="/home" style={homeButtonStyle}>
          홈으로 돌아가기
        </a>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg,#fff 0%,#f7f2ea 100%)",
  padding: "54px 18px 90px",
  color: "#111",
};

const heroStyle = {
  maxWidth: "900px",
  margin: "0 auto 34px",
  textAlign: "center" as const,
};

const labelStyle = {
  color: "#9b8b73",
  letterSpacing: "4px",
  fontWeight: 950,
  fontSize: "12px",
  margin: "0 0 12px",
};

const titleStyle = {
  fontSize: "clamp(42px,8vw,72px)",
  fontWeight: 950,
  margin: "0 0 18px",
  letterSpacing: "-2px",
};

const descStyle = {
  color: "#666",
  lineHeight: 1.8,
  fontSize: "16px",
  margin: 0,
};

const eventListStyle = {
  maxWidth: "920px",
  margin: "0 auto",
  display: "grid",
  gap: "18px",
};

const eventBannerStyle = {
  background: "linear-gradient(135deg,#111 0%,#252525 62%,#3b3024 100%)",
  color: "#fff",
  borderRadius: "28px",
  padding: "30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "22px",
  flexWrap: "wrap" as const,
  boxShadow: "0 22px 60px rgba(0,0,0,.14)",
};

const eventLabelStyle = {
  margin: "0 0 10px",
  color: "#d8c39f",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const eventTitleStyle = {
  margin: "0 0 12px",
  fontSize: "clamp(24px,5vw,36px)",
  fontWeight: 950,
  letterSpacing: "-1px",
};

const eventDescStyle = {
  margin: 0,
  color: "rgba(255,255,255,.72)",
  lineHeight: 1.75,
  fontSize: "15px",
  wordBreak: "keep-all" as const,
};

const eventButtonStyle = {
  flexShrink: 0,
  background: "#fee500",
  color: "#111",
  textDecoration: "none",
  padding: "15px 20px",
  borderRadius: "999px",
  fontWeight: 950,
  fontSize: "14px",
};

const bottomStyle = {
  maxWidth: "920px",
  margin: "28px auto 0",
};

const homeButtonStyle = {
  display: "block",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  padding: "18px",
  borderRadius: "999px",
  fontWeight: 950,
  textAlign: "center" as const,
};