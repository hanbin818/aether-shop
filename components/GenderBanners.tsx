"use client";

export default function GenderBanners() {
  const banners = [
    {
      title: "MEN",
      subtitle: "남성 컬렉션",
      desc: "감각적인 남성 럭셔리 패션을 만나보세요.",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=90",
      href: "/men",
    },
    {
      title: "WOMEN",
      subtitle: "여성 컬렉션",
      desc: "우아한 여성 명품 컬렉션을 경험해보세요.",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90",
      href: "/women",
    },
  ];

  return (
    <section
      style={{
        background: "#fff",
        padding: "90px 18px",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <p
            style={{
              color: "#9b8b73",
              letterSpacing: "5px",
              fontSize: "12px",
              fontWeight: 950,
              marginBottom: "14px",
            }}
          >
            COLLECTION
          </p>

          <h2
            style={{
              fontSize: "clamp(38px,6vw,60px)",
              margin: 0,
              fontWeight: 950,
              letterSpacing: "-1.5px",
            }}
          >
            MEN & WOMEN
          </h2>

          <p
            style={{
              marginTop: "18px",
              color: "#666",
              fontSize: "16px",
              lineHeight: "1.8",
            }}
          >
            취향에 맞는 컬렉션을 선택해보세요.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "26px",
          }}
        >
          {banners.map((banner) => (
            <a
              key={banner.title}
              href={banner.href}
              style={{
                position: "relative",
                height: "480px",
                borderRadius: "34px",
                overflow: "hidden",
                textDecoration: "none",
                color: "#fff",
                backgroundImage: `linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.72)),url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "flex-end",
                boxShadow: "0 28px 80px rgba(0,0,0,.16)",
              }}
            >
              <div
                style={{
                  padding: "36px",
                  width: "100%",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#d8c59f",
                    letterSpacing: "4px",
                    fontSize: "12px",
                    fontWeight: 900,
                  }}
                >
                  {banner.subtitle}
                </p>

                <h2
                  style={{
                    margin: "10px 0 14px",
                    fontSize: "54px",
                    fontWeight: 950,
                    letterSpacing: "-2px",
                  }}
                >
                  {banner.title}
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,.82)",
                    lineHeight: "1.8",
                    maxWidth: "320px",
                    marginBottom: "26px",
                  }}
                >
                  {banner.desc}
                </p>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "52px",
                    padding: "0 28px",
                    borderRadius: "999px",
                    background: "#fff",
                    color: "#111",
                    fontWeight: 950,
                    fontSize: "15px",
                  }}
                >
                  컬렉션 보기 →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}