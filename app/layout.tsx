import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AETHER | 명품 패션 셀렉트샵",
  description:
    "AETHER는 남성·여성 명품 의류, 가방, 지갑, 액세서리를 소개하는 프리미엄 패션 셀렉트샵입니다.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AETHER | 명품 패션 셀렉트샵",
    description:
      "남성·여성 명품 의류, 가방, 지갑, 액세서리를 만나는 프리미엄 패션 셀렉트샵.",
    siteName: "AETHER",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}