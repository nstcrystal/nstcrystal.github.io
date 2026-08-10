---
title: "Styling Modern Vue Apps with Tailwind CSS"
description: Cái nhìn thực tế về việc sử dụng Tailwind CSS trong các dự án Vue, cùng các mẹo về tùy biến giao diện, chế độ tối dark mode và cách duy trì mã nguồn CSS dễ bảo trì.
date: 2026-06-10
image: /images/css.png
minRead: 5
author:
  name: NSTCrystal
  avatar:
    src: https://avatars.githubusercontent.com/u/148052951?v=4
    alt: NSTCrystal
---

Tailwind CSS đã thay đổi hoàn toàn cách tôi viết style. Thay vì phải chuyển đổi qua lại giữa các tệp HTML và CSS, mọi thứ đều nằm ngay trong phần mã đánh dấu markup.

## Utility-First Approach

Với các lớp tiện ích utility classes, bạn có thể xây dựng các thành phần trực tiếp như trong template.

```vue
<button class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
  Click me
</button>
```

Không còn cảnh phải đặt tên class và lục lọi trong các file stylesheet nữa.

## Dark Mode

Chế độ Dark mode được tích hợp sẵn trong cơ chế sử dụng class của Tailwind. Chỉ cần thêm các biến thể `dark:`:

```vue
<div class="bg-white dark:bg-slate-900">
  <p class="text-slate-700 dark:text-slate-300">Hello</p>
</div>
```

## Pairing with Nuxt UI

Điểm tuyệt vời nhất là việc kết hợp Tailwind với các thành phần Nuxt UI. Bạn sẽ có ngay những thành phần đẹp mắt, đảm bảo accessible mà không cần cấu hình nhiều, đồng thời có thể tùy biến chúng bằng các class của Tailwind.

## Keep It Clean

- Hãy sử dụng `@apply` một cách tiết chế cho các mẫu lặp lại.
- Tạo các thành phần nhỏ, tập trung.
- Sử dụng tệp cấu hình của bạn cho các design token.

Tailwind đã biến việc tạo kiểu giao diện trở nên thú vị trở lại. Hãy thử dùng nó trong dự án Vue tiếp theo của bạn nhé!
