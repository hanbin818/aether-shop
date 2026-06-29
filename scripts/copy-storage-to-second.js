const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env.local"),
});

const { createClient } = require("@supabase/supabase-js");

const TARGET_URL = process.env.TARGET_SUPABASE_URL;
const TARGET_SERVICE_KEY = process.env.TARGET_SUPABASE_SERVICE_KEY;

const BUCKET = "product-images";
const OLD_BUCKET_MARK = "/storage/v1/object/public/product-images/";

if (!TARGET_URL || !TARGET_SERVICE_KEY) {
  console.error("TARGET_SUPABASE_URL 또는 TARGET_SUPABASE_SERVICE_KEY가 없습니다.");
  console.error(".env.local 파일에 TARGET_SUPABASE_URL, TARGET_SUPABASE_SERVICE_KEY가 있는지 확인해줘.");
  process.exit(1);
}

if (TARGET_URL.includes("/rest/v1")) {
  console.error("TARGET_SUPABASE_URL에 /rest/v1 이 들어가면 안 됩니다.");
  console.error("예: https://koqjubdgticgasltnvsi.supabase.co 까지만 넣어줘.");
  process.exit(1);
}

const supabase = createClient(TARGET_URL, TARGET_SERVICE_KEY);

function getStoragePath(url) {
  if (!url || !url.includes(OLD_BUCKET_MARK)) return null;
  return decodeURIComponent(url.split(OLD_BUCKET_MARK)[1].split("?")[0]);
}

async function copyImage(oldUrl) {
  const storagePath = getStoragePath(oldUrl);
  if (!storagePath) return oldUrl;

  const publicUrl = `${TARGET_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(
    storagePath
  ).replace(/%2F/g, "/")}`;

  const response = await fetch(oldUrl);

  if (!response.ok) {
    console.log("다운로드 실패:", oldUrl);
    return oldUrl;
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = response.headers.get("content-type") || "image/jpeg";

  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, buffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    console.log("업로드 실패:", storagePath, error.message);
    return oldUrl;
  }

  return publicUrl;
}

async function run() {
  console.log("이미지 복사 시작");

  const { data: products, error } = await supabase
    .from("products")
    .select("id,image,images");

  if (error) {
    console.error("products 조회 실패:", error.message);
    process.exit(1);
  }

  console.log(`상품 ${products.length}개 확인 시작`);

  for (const product of products) {
    const newImage = await copyImage(product.image);

    let newImages = product.images;

    if (Array.isArray(product.images)) {
      newImages = [];

      for (const url of product.images) {
        newImages.push(await copyImage(url));
      }
    }

    const { error: updateError } = await supabase
      .from("products")
      .update({
        image: newImage,
        images: newImages,
      })
      .eq("id", product.id);

    if (updateError) {
      console.log("DB 업데이트 실패:", product.id, updateError.message);
    } else {
      console.log("완료:", product.id);
    }
  }

  console.log("전체 이미지 복사 및 URL 변경 완료!");
}

run();