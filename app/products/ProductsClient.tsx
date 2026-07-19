"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import ProductCard from "@/components/ProductCard";

type CategoryTab = {
  label: string;
  value: string;
  gender?: "MEN" | "WOMEN";
  category?: string;
};

const categoryTabs: CategoryTab[] = [
  {
    label: "전체",
    value: "ALL",
  },
  {
    label: "신상품",
    value: "NEW",
  },
  {
    label: "남성",
    value: "MEN",
    gender: "MEN",
  },
  {
    label: "여성",
    value: "WOMEN",
    gender: "WOMEN",
  },
  {
    label: "가방",
    value: "bag",
    category: "bag",
  },
  {
    label: "클러치",
    value: "clutch",
    category: "clutch",
  },
  {
    label: "지갑",
    value: "wallet",
    category: "wallet",
  },
  {
    label: "남성의류",
    value: "MEN_CLOTHING",
    gender: "MEN",
    category: "clothing",
  },
  {
    label: "여성의류",
    value: "WOMEN_CLOTHING",
    gender: "WOMEN",
    category: "clothing",
  },
  {
    label: "신발",
    value: "shoes",
    category: "shoes",
  },
  {
    label: "액세서리",
    value: "accessory",
    category: "accessory",
  },
  {
    label: "선글라스",
    value: "sunglasses",
    category: "sunglasses",
  },
  {
    label: "시계",
    value: "watch",
    category: "watch",
  },
];

const sortOptions = [
  {
    label: "최신순",
    value: "newest",
  },
  {
    label: "낮은가격",
    value: "low",
  },
  {
    label: "높은가격",
    value: "high",
  },
];

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialGender = searchParams.get("gender") || "";
  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState("ALL");
  const [sort, setSort] = useState("newest");

  const [urlGender, setUrlGender] = useState(initialGender);
  const [urlCategory, setUrlCategory] = useState(initialCategory);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const normalizedGender = initialGender.toUpperCase();
    const normalizedCategory = initialCategory.toLowerCase();

    setUrlGender(normalizedGender);
    setUrlCategory(normalizedCategory);

    if (
      normalizedGender === "MEN" &&
      normalizedCategory === "clothing"
    ) {
      setActiveTab("MEN_CLOTHING");
      return;
    }

    if (
      normalizedGender === "WOMEN" &&
      normalizedCategory === "clothing"
    ) {
      setActiveTab("WOMEN_CLOTHING");
      return;
    }

    if (normalizedGender === "MEN") {
      setActiveTab("MEN");
      return;
    }

    if (normalizedGender === "WOMEN") {
      setActiveTab("WOMEN");
      return;
    }

    if (normalizedCategory) {
      setActiveTab(normalizedCategory);
      return;
    }

    setActiveTab("ALL");
  }, [initialGender, initialCategory]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error("상품 조회 오류:", error);
        setProducts([]);
        setLoading(false);
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizeGender = (gender?: string) => {
    return gender?.trim().toUpperCase() || "";
  };

  const normalizeCategory = (category?: string) => {
    return category?.trim().toLowerCase() || "";
  };

  const isBagFamily = (category: string) => {
    return category === "bag" || category === "clutch";
  };

  const isGenderMatchWithUnisex = (
    productGender: string,
    targetGender: string
  ) => {
    return (
      productGender === targetGender ||
      productGender === "UNISEX"
    );
  };

  const getStockInformation = (product: any) => {
    const normalizedStock =
      product.stock_status
        ?.toLowerCase()
        .replace(/[_-\s]/g, "") || "";

    const hasStockQuantity =
      product.stock_quantity !== null &&
      product.stock_quantity !== undefined &&
      product.stock_quantity !== "";

    const stockQuantity = hasStockQuantity
      ? Number(product.stock_quantity)
      : null;

    const isSoldOut =
      normalizedStock === "soldout" ||
      normalizedStock === "품절" ||
      (stockQuantity !== null &&
        !Number.isNaN(stockQuantity) &&
        stockQuantity <= 0);

    return {
      normalizedStock,
      isSoldOut,
    };
  };

  const handleTabClick = (tab: CategoryTab) => {
    setActiveTab(tab.value);
    setSearch("");

    if (tab.value === "ALL") {
      setUrlGender("");
      setUrlCategory("");

      router.replace("/products", {
        scroll: false,
      });

      return;
    }

    if (tab.value === "NEW") {
      setUrlGender("");
      setUrlCategory("");

      router.replace("/products", {
        scroll: false,
      });

      return;
    }

    const nextGender = tab.gender || "";
    const nextCategory = tab.category || "";

    setUrlGender(nextGender);
    setUrlCategory(nextCategory);

    const params = new URLSearchParams();

    if (nextCategory) {
      params.set("category", nextCategory);
    }

    if (nextGender) {
      params.set("gender", nextGender.toLowerCase());
    }

    const queryString = params.toString();

    router.replace(
      queryString ? `/products?${queryString}` : "/products",
      {
        scroll: false,
      }
    );
  };

  const handleSearchSubmit = () => {
    const keyword = search.trim();

    if (!keyword) {
      setUrlGender("");
      setUrlCategory("");
      setActiveTab("ALL");

      router.push("/products");
      return;
    }

    setUrlGender("");
    setUrlCategory("");
    setActiveTab("ALL");

    router.push(
      `/products?search=${encodeURIComponent(keyword)}`
    );
  };

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const productGender = normalizeGender(product.gender);
      const productCategory = normalizeCategory(product.category);
      const targetGender = normalizeGender(urlGender);
      const targetCategory = normalizeCategory(urlCategory);

      const { isSoldOut } = getStockInformation(product);

      const productName =
        typeof product.name === "string"
          ? product.name.toLowerCase()
          : "";

      const productBrand =
        typeof product.brand === "string"
          ? product.brand.toLowerCase()
          : "";

      const productDescription =
        typeof product.description === "string"
          ? product.description.toLowerCase()
          : "";

      const matchesSearch =
        keyword === "" ||
        productName.includes(keyword) ||
        productBrand.includes(keyword) ||
        productDescription.includes(keyword) ||
        productCategory.includes(keyword) ||
        productGender.toLowerCase().includes(keyword);

      const matchesGender =
        !targetGender ||
        isGenderMatchWithUnisex(
          productGender,
          targetGender
        );

      const matchesCategory =
        !targetCategory ||
        (targetCategory === "bag"
          ? isBagFamily(productCategory)
          : productCategory === targetCategory);

      const matchesNewTab =
        activeTab !== "NEW" || !isSoldOut;

      return (
        matchesSearch &&
        matchesGender &&
        matchesCategory &&
        matchesNewTab
      );
    });

    result = [...result].sort((a, b) => {
      const aStock = getStockInformation(a);
      const bStock = getStockInformation(b);

      if (aStock.isSoldOut !== bStock.isSoldOut) {
        return aStock.isSoldOut ? 1 : -1;
      }

      if (sort === "low") {
        return Number(a.price || 0) - Number(b.price || 0);
      }

      if (sort === "high") {
        return Number(b.price || 0) - Number(a.price || 0);
      }

      const aCreatedAt = a.created_at
        ? new Date(a.created_at).getTime()
        : 0;

      const bCreatedAt = b.created_at
        ? new Date(b.created_at).getTime()
        : 0;

      if (aCreatedAt !== bCreatedAt) {
        return bCreatedAt - aCreatedAt;
      }

      return Number(b.id || 0) - Number(a.id || 0);
    });

    return result;
  }, [
    products,
    search,
    activeTab,
    sort,
    urlGender,
    urlCategory,
  ]);

  const normalizedPageGender = normalizeGender(urlGender);
  const normalizedPageCategory =
    normalizeCategory(urlCategory);

  const pageTitle = (() => {
    if (
      normalizedPageGender === "MEN" &&
      normalizedPageCategory === "clothing"
    ) {
      return "남성 의류";
    }

    if (
      normalizedPageGender === "WOMEN" &&
      normalizedPageCategory === "clothing"
    ) {
      return "여성 의류";
    }

    if (
      normalizedPageGender === "WOMEN" &&
      normalizedPageCategory === "bag"
    ) {
      return "여성 가방";
    }

    if (
      normalizedPageGender === "MEN" &&
      normalizedPageCategory === "bag"
    ) {
      return "남성 가방";
    }

    if (normalizedPageGender === "WOMEN") {
      return "여성 상품";
    }

    if (normalizedPageGender === "MEN") {
      return "남성 상품";
    }

    if (normalizedPageCategory === "bag") {
      return "가방";
    }

    if (normalizedPageCategory === "clutch") {
      return "클러치";
    }

    if (normalizedPageCategory === "wallet") {
      return "지갑";
    }

    if (normalizedPageCategory === "clothing") {
      return "의류";
    }

    if (normalizedPageCategory === "shoes") {
      return "신발";
    }

    if (normalizedPageCategory === "watch") {
      return "시계";
    }

    if (normalizedPageCategory === "accessory") {
      return "액세서리";
    }

    if (normalizedPageCategory === "sunglasses") {
      return "선글라스";
    }

    return "전체 상품";
  })();

  const pageDescription = (() => {
    if (
      normalizedPageGender === "MEN" &&
      normalizedPageCategory === "clothing"
    ) {
      return "남성 의류와 공용 의류 컬렉션을 함께 만나보세요.";
    }

    if (
      normalizedPageGender === "WOMEN" &&
      normalizedPageCategory === "clothing"
    ) {
      return "여성 의류와 공용 의류 컬렉션을 함께 만나보세요.";
    }

    if (
      normalizedPageGender === "WOMEN" &&
      normalizedPageCategory === "bag"
    ) {
      return "여성 가방과 클러치, 공용 상품까지 함께 만나보세요.";
    }

    if (
      normalizedPageGender === "MEN" &&
      normalizedPageCategory === "bag"
    ) {
      return "남성 가방과 클러치, 공용 상품까지 함께 만나보세요.";
    }

    if (normalizedPageGender === "WOMEN") {
      return "여성 상품과 공용 상품을 함께 만나보세요.";
    }

    if (normalizedPageGender === "MEN") {
      return "남성 상품과 공용 상품을 함께 만나보세요.";
    }

    if (normalizedPageCategory === "clothing") {
      return "에테르가 엄선한 프리미엄 의류 컬렉션을 만나보세요.";
    }

    return "엄선된 프리미엄 명품 셀렉션을 만나보세요.";
  })();

  if (loading) {
    return (
      <main className="loading-page">
        상품 불러오는 중...
      </main>
    );
  }

  return (
    <main className="products-page">
      <section className="shop-hero">
        <a href="/home" className="home-button">
          ← 메인으로
        </a>

        <div className="hero-content">
          <p>에테르 컬렉션</p>
          <h1>{pageTitle}</h1>
          <span>{pageDescription}</span>
        </div>
      </section>

      <section className="shop-control">
        <div className="tab-row">
          {categoryTabs.map((tab) => (
            <button
              type="button"
              key={tab.value}
              onClick={() => handleTabClick(tab)}
              className={
                activeTab === tab.value ? "active" : ""
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="search-row">
          <input
            type="search"
            placeholder="브랜드, 상품명, 카테고리 검색"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />

          <button
            type="button"
            onClick={handleSearchSubmit}
          >
            검색
          </button>
        </div>

        <div className="result-row">
          <p>
            총{" "}
            <strong>{filteredProducts.length}</strong>개 상품
          </p>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            aria-label="상품 정렬"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="product-section">
        {filteredProducts.length === 0 ? (
          <div className="empty-box">
            검색 결과가 없습니다.
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => {
              const productImages =
                Array.isArray(product.images) &&
                product.images.length > 0
                  ? product.images
                  : product.image
                  ? [product.image]
                  : [];

              const mainImage =
                productImages[0] || product.image || "";

              return (
                <ProductCard
                  key={product.id}
                  brand={product.brand}
                  name={product.name}
                  price={`₩${Number(
                    product.price || 0
                  ).toLocaleString()}`}
                  image={mainImage}
                  href={`/product/${product.id}`}
                  stockStatus={product.stock_status}
                />
              );
            })}
          </div>
        )}
      </section>

      <style>{`
        .products-page {
          min-height: 100vh;
          background: linear-gradient(
            180deg,
            #fff 0%,
            #f7f2ea 100%
          );
          color: #111;
          padding-bottom: 90px;
          overflow-x: hidden;
        }

        .loading-page {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          color: #111;
          font-size: 17px;
          font-weight: 900;
        }

        .shop-hero {
          position: relative;
          width: 100%;
          min-height: 230px;
          padding: 54px 18px;
          background:
            linear-gradient(
              rgba(0, 0, 0, 0.58),
              rgba(0, 0, 0, 0.76)
            ),
            url("https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=90");
          background-size: cover;
          background-position: center;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
        }

        .home-button {
          position: absolute;
          top: 14px;
          left: 14px;
          color: #111;
          background: rgba(255, 255, 255, 0.92);
          text-decoration: none;
          padding: 8px 13px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 950;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
          z-index: 3;
        }

        .hero-content {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }

        .hero-content p {
          margin: 0 0 12px;
          color: #d8c39f;
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 5px;
        }

        .hero-content h1 {
          margin: 0 auto;
          font-size: clamp(34px, 7vw, 76px);
          font-weight: 950;
          letter-spacing: 3px;
          line-height: 1.05;
          word-break: keep-all;
        }

        .hero-content span {
          display: block;
          margin-top: 16px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 14px;
          line-height: 1.7;
          word-break: keep-all;
        }

        .shop-control {
          max-width: 1180px;
          margin: -30px auto 18px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 24px;
          padding: 16px;
          box-shadow: 0 20px 52px rgba(0, 0, 0, 0.08);
          position: relative;
          z-index: 2;
        }

        .tab-row {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 10px;
          margin-bottom: 13px;
          border-bottom: 1px solid #eee;
          scrollbar-width: none;
        }

        .tab-row::-webkit-scrollbar {
          display: none;
        }

        .tab-row button {
          flex: 0 0 auto;
          padding: 8px 15px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fff;
          color: #111;
          font-size: 12px;
          font-weight: 950;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        .tab-row button.active {
          background: #111;
          color: #fff;
          border-color: #111;
        }

        .search-row {
          max-width: 580px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .search-row input {
          flex: 1;
          min-width: 0;
          height: 43px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fafafa;
          color: #111;
          padding: 0 16px;
          font-size: 13px;
          font-weight: 800;
          outline: none;
          text-align: center;
        }

        .search-row input:focus {
          border-color: #111;
          background: #fff;
        }

        .search-row button {
          width: 72px;
          height: 43px;
          flex-shrink: 0;
          border-radius: 999px;
          background: #111;
          color: #fff;
          border: none;
          font-size: 13px;
          font-weight: 950;
          cursor: pointer;
        }

        .result-row {
          margin-top: 13px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .result-row p {
          margin: 0;
          color: #777;
          font-size: 13px;
          font-weight: 800;
        }

        .result-row strong {
          color: #111;
        }

        .result-row select {
          height: 36px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fff;
          color: #111;
          padding: 0 12px;
          font-size: 12px;
          font-weight: 900;
          outline: none;
        }

        .product-section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 12px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(
            5,
            minmax(0, 1fr)
          );
          gap: 14px;
          align-items: start;
        }

        .product-grid > * {
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }

        .empty-box {
          margin-top: 20px;
          padding: 60px 20px;
          background: #fff;
          border-radius: 28px;
          text-align: center;
          color: #777;
          font-size: 15px;
          font-weight: 900;
          border: 1px solid #eee;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 1180px) {
          .product-grid {
            grid-template-columns: repeat(
              4,
              minmax(0, 1fr)
            );
          }

          .tab-row {
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .shop-hero {
            min-height: 130px;
            padding: 34px 12px 36px;
          }

          .home-button {
            top: 10px;
            left: 10px;
            padding: 7px 10px;
            font-size: 10px;
          }

          .hero-content p {
            font-size: 8px;
            letter-spacing: 2px;
            margin-bottom: 7px;
          }

          .hero-content h1 {
            font-size: 24px;
            letter-spacing: 1px;
          }

          .hero-content span {
            font-size: 10px;
            margin-top: 8px;
            line-height: 1.4;
          }

          .shop-control {
            margin: -20px 6px 12px;
            padding: 9px 7px;
            border-radius: 17px;
          }

          .tab-row {
            justify-content: flex-start;
            gap: 5px;
            padding-bottom: 7px;
            margin-bottom: 8px;
          }

          .tab-row button {
            padding: 6px 9px;
            font-size: 9px;
            letter-spacing: 0;
          }

          .search-row {
            gap: 5px;
          }

          .search-row input {
            height: 34px;
            font-size: 10px;
            padding: 0 8px;
          }

          .search-row button {
            width: 50px;
            height: 34px;
            font-size: 10px;
          }

          .result-row {
            margin-top: 9px;
            gap: 6px;
          }

          .result-row p {
            font-size: 10px;
          }

          .result-row select {
            height: 30px;
            font-size: 10px;
            padding: 0 8px;
          }

          .product-section {
            padding: 0 8px;
          }

          .product-grid {
            grid-template-columns: repeat(
              3,
              minmax(0, 1fr)
            );
            gap: 8px;
          }
        }

        @media (max-width: 390px) {
          .product-section {
            padding: 0 6px;
          }

          .product-grid {
            gap: 7px;
          }
        }
      `}</style>
    </main>
  );
}