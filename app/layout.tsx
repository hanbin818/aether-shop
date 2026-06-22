import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://aether-shop-sage.vercel.app"),

  title: "AETHER | 명품 패션 셀렉트샵",

  description:
    "AETHER는 남성·여성 명품 의류, 가방, 지갑, 액세서리를 소개하는 프리미엄 패션 셀렉트샵입니다.",

  keywords: [
    "AETHER",
    "명품",
    "명품 쇼핑몰",
    "명품 의류",
    "명품 가방",
    "명품 지갑",
    "명품 액세서리",
    "남성 명품",
    "여성 명품",
    "패션 셀렉트샵",
  ],

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "AETHER | 명품 패션 셀렉트샵",
    description:
      "남성·여성 명품 의류, 가방, 지갑, 액세서리를 만나는 프리미엄 패션 셀렉트샵.",
    url: "/",
    siteName: "AETHER",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AETHER 명품 패션 셀렉트샵",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AETHER | 명품 패션 셀렉트샵",
    description:
      "남성·여성 명품 의류, 가방, 지갑, 액세서리를 만나는 프리미엄 패션 셀렉트샵.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#fff",
        }}
      >
        {children}
      </body>
    </html>
  );
}