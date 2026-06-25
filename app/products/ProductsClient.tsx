"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import ProductCard from "@/components/ProductCard";

const categoryTabs = [
  { label: "ALL", value: "ALL" },
  { label: "NEW", value: "NEW" },
  { label: "MEN", value: "MEN" },
  { label: "WOMEN", value: "WOMEN" },
  { label: "BAG", value: "bag" },
  { label: "WALLET", value: "wallet" },
  { label: "SHOES", value: "shoes" },
  { label: "ACC", value: "accessory" },
  { label: "CLOTHES", value: "clothes" },
];

const sortOptions = [
  { label: "최신순", value: "newest" },
  { label: "낮은가격", value: "low" },
  { label: "높은가격", value: "high" },
];

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState("ALL");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleSearchSubmit = () => {
    const keyword = search.trim();

    if (!keyword) {
      router.push("/products");
      return;
    }

    router.push(`/products?search=${encodeURIComponent(keyword)}`);
  };

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const normalizedStock = product.stock_status
        ?.toLowerCase()
        .replace(/[_-\s]/g, "");

      const isSoldOut =
        normalizedStock === "soldout" ||
        Number(product.stock_quantity || 0) <= 0;

      const matchesSearch =
        keyword === "" ||
        product.name?.toLowerCase().includes(keyword) ||
        product.brand?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword) ||
        product.gender?.toLowerCase().includes(keyword);

      const matchesTab =
        activeTab === "ALL" ||
        (activeTab === "NEW" && !isSoldOut) ||
        product.gender?.toUpperCase() === activeTab ||
        product.category?.toLowerCase() === activeTab.toLowerCase();

      return matchesSearch && matchesTab;
    });

    result = result.sort((a, b) => {
      const aStock = a.stock_status?.toLowerCase().replace(/[_-\s]/g, "");
      const bStock = b.stock_status?.toLowerCase().replace(/[_-\s]/g, "");

      const aSoldOut =
        aStock === "soldout" || Number(a.stock_quantity || 0) <= 0;
      const bSoldOut =
        bStock === "soldout" || Number(b.stock_quantity || 0) <= 0;

      if (aSoldOut !== bSoldOut) return aSoldOut ? 1 : -1;

      if (sort === "low") return Number(a.price || 0) - Number(b.price || 0);
      if (sort === "high") return Number(b.price || 0) - Number(a.price || 0);

      return Number(b.id || 0) - Number(a.id || 0);
    });

    return result;
  }, [products, search, activeTab, sort]);

  if (loading) {
    return <main className="loading-page">상품 불러오는 중...</main>;
  }

  return (
    <main className="products-page">
      <section className="shop-hero">
        <a href="/home" className="home-button">
          ← 메인으로
        </a>

        <p>AETHER COLLECTION</p>
        <h1>SHOP</h1>
        <span>엄선된 프리미엄 명품 셀렉션을 만나보세요.</span>
      </section>

      <section className="shop-control">
        <div className="tab-row">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={activeTab === tab.value ? "active" : ""}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="search-row">
          <input
            placeholder="브랜드, 상품명, 카테고리 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
          />

          <button onClick={handleSearchSubmit}>검색</button>
        </div>

        <div className="result-row">
          <p>
            총 <strong>{filteredProducts.length}</strong>개 상품
          </p>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="product-section">
        {filteredProducts.length === 0 ? (
          <div className="empty-box">검색 결과가 없습니다.</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                brand={product.brand}
                name={product.name}
                price={`₩${Number(product.price).toLocaleString()}`}
                image={product.image}
                href={`/product/${product.id}`}
                stockStatus={product.stock_status}
                stockQuantity={product.stock_quantity}
              />
            ))}
          </div>
        )}
      </section>

      <style>{`
        .products-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #fff 0%, #f7f2ea 100%);
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
          min-height: 300px;
          padding: 68px 20px;
          background:
            linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.76)),
            url("https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=90");
          background-size: cover;
          background-position: center;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }

        .home-button {
          position: absolute;
          top: 18px;
          left: 18px;
          color: #111;
          background: rgba(255,255,255,0.92);
          text-decoration: none;
          padding: 9px 15px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 950;
          box-shadow: 0 10px 24px rgba(0,0,0,0.18);
        }

        .shop-hero p {
          margin: 0 0 14px;
          color: #d8c39f;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 6px;
        }

        .shop-hero h1 {
          margin: 0;
          font-size: clamp(50px, 10vw, 94px);
          font-weight: 950;
          letter-spacing: 12px;
          line-height: 0.9;
        }

        .shop-hero span {
          display: block;
          margin-top: 22px;
          color: rgba(255,255,255,0.78);
          font-size: 15px;
          line-height: 1.8;
          word-break: keep-all;
        }

        .shop-control {
          max-width: 1180px;
          margin: -36px auto 24px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 26px;
          padding: 20px;
          box-shadow: 0 20px 52px rgba(0,0,0,0.08);
          position: relative;
          z-index: 2;
        }

        .tab-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 11px;
          margin-bottom: 15px;
          border-bottom: 1px solid #eee;
        }

        .tab-row::-webkit-scrollbar {
          display: none;
        }

        .tab-row button {
          flex: 0 0 auto;
          padding: 9px 17px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fff;
          color: #111;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 1.2px;
          cursor: pointer;
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
          gap: 8px;
        }

        .search-row input {
          flex: 1;
          height: 46px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fafafa;
          color: #111;
          padding: 0 18px;
          font-size: 13px;
          font-weight: 800;
          outline: none;
          text-align: center;
        }

        .search-row button {
          width: 76px;
          height: 46px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          border: none;
          font-size: 13px;
          font-weight: 950;
          cursor: pointer;
        }

        .result-row {
          margin-top: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
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
          height: 40px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fff;
          color: #111;
          padding: 0 14px;
          font-size: 12px;
          font-weight: 900;
          outline: none;
        }

        .product-section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 14px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
          align-items: start;
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
          box-shadow: 0 18px 50px rgba(0,0,0,0.06);
        }

        @media (max-width: 1180px) {
          .product-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .shop-hero {
            min-height: 230px;
            padding: 48px 18px 56px;
          }

          .home-button {
            top: 12px;
            left: 12px;
            padding: 8px 12px;
            font-size: 11px;
          }

          .shop-hero p {
            font-size: 10px;
            letter-spacing: 4px;
          }

          .shop-hero h1 {
            font-size: 46px;
            letter-spacing: 7px;
          }

          .shop-hero span {
            font-size: 12px;
            margin-top: 18px;
          }

          .shop-control {
            margin: -32px 10px 20px;
            padding: 14px 10px;
            border-radius: 22px;
          }

          .tab-row {
            gap: 6px;
            padding-bottom: 10px;
            margin-bottom: 13px;
          }

          .tab-row button {
            padding: 8px 12px;
            font-size: 10px;
            letter-spacing: 0.8px;
          }

          .search-row {
            gap: 6px;
          }

          .search-row input {
            height: 42px;
            font-size: 11px;
            padding: 0 10px;
          }

          .search-row button {
            width: 60px;
            height: 42px;
            font-size: 12px;
          }

          .result-row {
            margin-top: 14px;
            gap: 10px;
          }

          .result-row p {
            font-size: 12px;
          }

          .result-row select {
            height: 38px;
            font-size: 12px;
            padding: 0 12px;
          }

          .product-section {
            padding: 0 8px;
          }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px 6px;
          }
        }
      `}</style>
    </main>
  );
}