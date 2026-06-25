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
          min-height: 320px;
          padding: 72px 20px;
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
          top: 20px;
          left: 20px;
          color: #111;
          background: rgba(255,255,255,0.92);
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 13px;
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
          font-size: clamp(52px, 10vw, 100px);
          font-weight: 950;
          letter-spacing: 12px;
          line-height: 0.9;
        }

        .shop-hero span {
          display: block;
          margin-top: 24px;
          color: rgba(255,255,255,0.78);
          font-size: 15px;
          line-height: 1.8;
          word-break: keep-all;
        }

        .shop-control {
          max-width: 1180px;
          margin: -38px auto 28px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 28px;
          padding: 22px;
          box-shadow: 0 22px 58px rgba(0,0,0,0.09);
          position: relative;
          z-index: 2;
        }

        .tab-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 16px;
          border-bottom: 1px solid #eee;
        }

        .tab-row::-webkit-scrollbar {
          display: none;
        }

        .tab-row button {
          flex: 0 0 auto;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fff;
          color: #111;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 1.3px;
          cursor: pointer;
        }

        .tab-row button.active {
          background: #111;
          color: #fff;
          border-color: #111;
        }

        .search-row {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          gap: 8px;
        }

        .search-row input {
          flex: 1;
          height: 48px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fafafa;
          color: #111;
          padding: 0 18px;
          font-size: 14px;
          font-weight: 800;
          outline: none;
          text-align: center;
        }

        .search-row button {
          width: 80px;
          height: 48px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          border: none;
          font-size: 14px;
          font-weight: 950;
          cursor: pointer;
        }

        .result-row {
          margin-top: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .result-row p {
          margin: 0;
          color: #777;
          font-size: 14px;
          font-weight: 800;
        }

        .result-row strong {
          color: #111;
        }

        .result-row select {
          height: 42px;
          border-radius: 999px;
          border: 1px solid #ddd;
          background: #fff;
          color: #111;
          padding: 0 15px;
          font-size: 13px;
          font-weight: 900;
          outline: none;
        }

        .product-section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 18px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 18px;
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
            min-height: 250px;
            padding: 54px 18px 64px;
          }

          .home-button {
            top: 14px;
            left: 14px;
            padding: 9px 13px;
            font-size: 12px;
          }

          .shop-hero p {
            font-size: 11px;
            letter-spacing: 4px;
          }

          .shop-hero h1 {
            font-size: 50px;
            letter-spacing: 8px;
          }

          .shop-hero span {
            font-size: 13px;
            margin-top: 20px;
          }

          .shop-control {
            margin: -36px 12px 24px;
            padding: 18px 12px;
            border-radius: 24px;
          }

          .tab-row {
            gap: 7px;
          }

          .tab-row button {
            padding: 9px 14px;
            font-size: 11px;
            letter-spacing: 1px;
          }

          .search-row input {
            height: 44px;
            font-size: 12px;
            padding: 0 12px;
          }

          .search-row button {
            width: 66px;
            height: 44px;
            font-size: 13px;
          }

          .result-row {
            margin-top: 16px;
          }

          .product-section {
            padding: 0 10px;
          }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px 9px;
          }
        }
      `}</style>
    </main>
  );
}