require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

const MAIN_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const MAIN_SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const BACKUP_SUPABASE_URL = process.env.TARGET_SUPABASE_URL;
const BACKUP_SERVICE_KEY = process.env.TARGET_SUPABASE_SERVICE_KEY;

if (!MAIN_SUPABASE_URL || !MAIN_SERVICE_KEY) {
  console.error("NEXT_PUBLIC_SUPABASE_URL 또는 NEXT_PUBLIC_SUPABASE_ANON_KEY가 없습니다.");
  process.exit(1);
}

if (!BACKUP_SUPABASE_URL || !BACKUP_SERVICE_KEY) {
  console.error("TARGET_SUPABASE_URL 또는 TARGET_SUPABASE_SERVICE_KEY가 없습니다.");
  process.exit(1);
}

console.log("MAIN URL:", MAIN_SUPABASE_URL);
console.log("BACKUP URL:", BACKUP_SUPABASE_URL);
console.log("MAIN KEY:", MAIN_SERVICE_KEY ? "있음" : "없음");
console.log("BACKUP KEY:", BACKUP_SERVICE_KEY ? "있음" : "없음");

const main = createClient(MAIN_SUPABASE_URL, MAIN_SERVICE_KEY);
const backup = createClient(BACKUP_SUPABASE_URL, BACKUP_SERVICE_KEY);

async function syncProducts() {
  console.log("상품 백업 시작...");

  const { data: products, error: fetchError } = await main
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (fetchError) {
    console.error("운영 상품 불러오기 실패:", fetchError.message);
    process.exit(1);
  }

  console.log(`운영 상품 ${products.length}개 불러옴`);

  const { data: backupTest, error: backupTestError } = await backup
    .from("products")
    .select("id")
    .limit(1);

  if (backupTestError) {
    console.error("백업 DB 연결 테스트 실패:", backupTestError.message);
    console.error(backupTestError);
    process.exit(1);
  }

  console.log("백업 DB 연결 테스트 성공");

  const { error: deleteError } = await backup
    .from("products")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    console.error("백업 기존 상품 삭제 실패:", deleteError.message);
    console.error(deleteError);
    process.exit(1);
  }

  console.log("백업 기존 상품 삭제 완료");

  const { error: insertError } = await backup
    .from("products")
    .insert(products);

  if (insertError) {
    console.error("백업 상품 복사 실패:", insertError.message);
    console.error(insertError);
    process.exit(1);
  }

  console.log("상품 백업 완료!");
}

syncProducts();