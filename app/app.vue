<template>
  <div>
    <!-- Thanh menu điều hướng đơn giản -->
    <nav style="display: flex; gap: 20px; padding: 10px; background: #eee">
      <NuxtLink to="/">Trang chủ</NuxtLink>
      <NuxtLink to="/about">Giới thiệu</NuxtLink>
      <NuxtLink to="/blog/">Blog</NuxtLink>
      <NuxtLink to="/contact">Liên hệ</NuxtLink>
    </nav>

    <!-- Khu vực hiển thị nội dung các trang tự động -->
    <NuxtPage />
  </div>
</template>
