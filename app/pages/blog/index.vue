<script setup lang="ts">
// Gọi toàn bộ danh sách bài viết từ bộ sưu tập 'blog' đã cấu hình
const { data: posts } = await useAsyncData("blog-list", () => {
  return queryCollection("blog")
    .select("title", "description", "path", "date") // Chỉ lấy các thông tin cần thiết để làm thẻ Card
    .all();
});
</script>

<template>
  <div class="blog-list-container">
    <h1 class="page-title">Tất cả bài viết</h1>

    <!-- Nếu chưa có bài viết nào -->
    <div v-if="!posts || posts.length === 0" class="empty-state">
      Chưa có bài viết nào được xuất bản.
    </div>

    <!-- Khu vực hiển thị danh sách dạng lưới (Grid) -->
    <div v-else class="cards-grid">
      <div v-for="post in posts" :key="post.path" class="blog-card">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-description">{{ post.description || "Không có mô tả cho bài viết này." }}</p>

        <!-- Khéo léo thêm tiền tố /blog vào trước đường dẫn gốc của file md -->
        <NuxtLink :to="`/blog${post.path}`" class="read-more-btn"> Đọc bài viết → </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-list-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: system-ui, sans-serif;
}
.page-title {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #222;
}
/* Tạo bố cục Grid chia cột tự động cho các Card */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
/* Thiết kế kiểu dáng cho từng ô Card blog-post */
.blog-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.card-title {
  font-size: 1.3rem;
  margin: 0 0 12px 0;
  color: #1a202c;
}
.card-description {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
}
.read-more-btn {
  display: inline-block;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}
.read-more-btn:hover {
  text-decoration: underline;
}
.empty-state {
  color: #718096;
  text-align: center;
  padding: 40px;
}
</style>
