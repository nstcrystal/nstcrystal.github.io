<script setup lang="ts">
const route = useRoute();

// Lấy chính xác tên bài viết từ URL (ví dụ: ['bai-viet-1'] từ /blog/bai-viet-1)
const slugParams = route.params.slug as string[];
const cleanPath = "/" + slugParams.join("/");

// Truy vấn dữ liệu từ bộ sưu tập 'blog' đã khai báo ở Bước 1
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(cleanPath).first();
});
</script>

<template>
  <main style="max-width: 800px; margin: 40px auto; padding: 0 15px; font-family: sans-serif">
    <!-- Nếu tìm thấy bài viết, render nội dung Markdown ra HTML -->
    <div v-if="page">
      <h1 style="font-size: 2rem; margin-bottom: 20px">{{ page.title }}</h1>
      <ContentRenderer :value="page" />
    </div>

    <!-- Nếu không tìm thấy, hiển thị thông báo lỗi rõ ràng thay vì để màn hình trắng -->
    <div v-else style="color: red; text-align: center; margin-top: 50px">
      <h2>⚠️ Không tìm thấy bài viết!</h2>
      <p>Vui lòng kiểm tra lại file .md trong thư mục content của bạn.</p>
    </div>
  </main>
</template>
