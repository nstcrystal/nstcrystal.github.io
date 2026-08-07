# NSTCrystal Portfolio

Trang web cá nhân của **NSTCrystal (Võ Văn Duy)** - Nơi giới thiệu về tôi, các dự án đã xây dựng và chia sẻ những bài viết về lập trình, công nghệ.

## ✨ Tính năng

- Trang chủ với Hero, giới thiệu, kinh nghiệm, thống kê GitHub, testimonials và FAQ
- Trang Projects giới thiệu các dự án nổi bật
- Trang Blog với bài viết chi tiết
- Trang About mô tả hành trình và tech stack
- Hỗ trợ **Dark mode** / Light mode
- **SEO** và **Open Graph image** tự động cho từng trang
- Nội dung được quản lý bằng file YAML/Markdown thông qua **Nuxt Content**

## 🛠️ Tech Stack

- [Nuxt 4](https://nuxt.com) - Framework Vue full-stack
- [Nuxt UI](https://ui.nuxt.com) - UI components
- [Nuxt Content](https://content.nuxt.com) - CMS dựa trên file
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Nuxt Image](https://image.nuxt.com) - Tối ưu hình ảnh
- [nuxt-og-image](https://github.com/nuxt-modules/og-image) - Open Graph image
- [VueUse](https://vueuse.org) - Utility composables
- [motion-v](https://motion-v.dev) - Animations

## 🚀 Bắt đầu

Clone repo:

```bash
git clone https://github.com/nstcrystal/nstcrystal.github.io.git
```

Yêu cầu: [Node.js](https://nodejs.org) (>= 20) và [pnpm](https://pnpm.io).

```bash
# Cài đặt dependencies
pnpm install

# Chạy môi trường phát triển
pnpm dev
```

Mở http://localhost:3000 để xem kết quả.

## 📦 Scripts

| Script              | Mô tả                              |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Chạy dev server                    |
| `pnpm build`        | Build production                   |
| `pnpm preview`      | Xem thử bản build production       |
| `pnpm lint`         | Kiểm tra code với ESLint           |
| `pnpm typecheck`    | Kiểm tra kiểu TypeScript           |

## 📝 Quản lý nội dung

Tất cả nội dung nằm trong thư mục [`content/`](content), bao gồm:

- [`content/index.yml`](content/index.yml) - dữ liệu trang chủ (hero, about, experience, stats, testimonials, faq)
- [`content/projects/*.yml`](content/projects) - danh sách dự án
- [`content/blog/*.md`](content/blog) - bài viết blog
- [`content/about.yml`](content/about.yml) - nội dung trang about

Schema nội dung được định nghĩa tại [`content.config.ts`](content.config.ts).

## 🌐 Triển khai

Dự án được cấu hình sẵn cho **GitHub Pages** (CNAME: `nstcrystal.is-a.dev`) và **Vercel**.

## 📄 License

[MIT](LICENSE)
