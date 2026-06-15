# Cấu trúc thư mục Dự án (Nuxt 3 & Nuxt Content)

Dưới đây là sơ đồ và giải thích chi tiết về cấu trúc thư mục của mã nguồn website.

## 📂 Sơ đồ cấu trúc thư mục

```text
nstcrystal.github.io/
├── .nuxt/                      # Thư mục sinh tự động bởi Nuxt (được bỏ qua trong git)
├── app/                        # Thư mục chứa mã nguồn chính của ứng dụng Vue
│   ├── assets/                 # Các tệp tĩnh cần compile (CSS, SASS, hình ảnh)
│   ├── components/             # Các Vue components có thể tái sử dụng tự động
│   ├── layouts/                # Các file giao diện chung (Default, Admin, v.v.)
│   └── pages/                  # Các trang của website (Tự động tạo tuyến đường/routing)
│       ├── blog/               # Thư mục chứa các trang liên quan đến blog
│       │   └──[...slug].vue    # Catch-all route xử lý nội dung động từ Nuxt Content
│       ├── index.vue           # Trang chủ (/)
│       ├── about.vue           # Trang giới thiệu (/about)
│       └── contact.vue         # Trang liên hệ (/contact)
├── content/                    # Thư mục chứa các bài viết định dạng Markdown (.md)
│   ├── bai-viet-1.md           # Bài viết số 1
│   └── bai-viet-2.md           # Bài viết số 2
├── docs/                       # Thư mục chứa tài liệu hướng dẫn (nếu có)
├── public/                     # Thư mục chứa tệp tĩnh không đổi (Favicon, Robots.txt)
├── app.config.ts               # Cấu hình ứng dụng Nuxt (App định danh, UI theme)
├── app.vue                     # Component gốc (Root) chính của ứng dụng
├── error.vue                   # Giao diện tùy chỉnh hiển thị khi gặp lỗi (404, 500)
├── content.config.ts           # Cấu hình cho module Nuxt Content
├── nuxt.config.ts              # File cấu hình cốt lõi của dự án Nuxt
├── package.json                # Quản lý các dependencies và mã lệnh script chạy dự án
├── tsconfig.json               # Cấu hình TypeScript cho dự án
└── README.md                   # Tệp tài liệu hướng dẫn này
```

## 📝 Giải thích các thành phần quan trọng

- **`content/`**: Nơi quản lý toàn bộ nội dung bài viết bằng Markdown. Nuxt Content sẽ tự động chuyển đổi các file `.md` tại đây thành dữ liệu API để hiển thị lên giao diện.
- **`app/pages/`**: Mỗi file `.vue` trong này tương ứng với một đường dẫn (URL) trên website. Riêng file `[...slug].vue` đóng vai trò bắt các đường dẫn động để hiển thị bài viết từ thư mục `content/`.
- **`nuxt.config.ts`**: Nơi tích hợp các module (như Nuxt Content, TailwindCSS), cấu hình SEO, SSR, và các thiết lập hệ thống khác.
