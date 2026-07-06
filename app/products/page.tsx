import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>상품 불러오는 중...</div>}>
      <ProductsClient />
    </Suspense>
  );
}