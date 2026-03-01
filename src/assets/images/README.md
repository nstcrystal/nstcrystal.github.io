# Image Assets Directory

This directory contains all local image assets for the portfolio website.

## 📁 Structure

```
/src/assets/images/
├── profile/
│   └── avatar.jpg          # Profile photo for About page
├── projects/
│   ├── ecommerce.jpg       # E-Commerce Platform screenshot
│   ├── task-manager.jpg    # Task Management App screenshot
│   ├── weather.jpg         # Weather Dashboard screenshot
│   ├── portfolio-cms.jpg   # Portfolio CMS screenshot
│   ├── analytics.jpg       # Social Media Analytics screenshot
│   └── recipe-finder.jpg   # Recipe Finder screenshot
└── placeholder.jpg         # Fallback placeholder image
```

## 🖼️ Image Guidelines

### Project Images
- **Format**: `.jpg`, `.png`, or `.webp`
- **Size**: Optimized for web (recommended < 200KB)
- **Dimensions**: 1200x675px (16:9 aspect ratio) recommended
- **Quality**: 80-85% compression for JPG

### Profile Image
- **Format**: `.jpg` or `.png`
- **Size**: < 100KB
- **Dimensions**: 400x400px (square)
- **Quality**: High quality for professional appearance

## 📝 How to Replace Images

### 1. Add Your Images
Đặt các tập tin hình ảnh của bạn vào thư mục con thích hợp.

### 2. Import in Components
```tsx
import ecommerceImg from '@/assets/images/projects/ecommerce.jpg';
```

### 3. Use in JSX
```tsx
<img src={ecommerceImg} alt="E-Commerce Platform" />
```

## 🚀 Optimization Tips

1. **Use WebP format** when possible (better compression)
2. **Compress images** before adding (use tools like TinyPNG)
3. **Use appropriate dimensions** (no need for 4K images)
4. **Add descriptive alt text** for accessibility

## 🔧 Tools for Image Optimization

- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Online image optimizer
- [ImageOptim](https://imageoptim.com/) - Mac app
- [GIMP](https://www.gimp.org/) - Free image editor

## ⚠️ Important Notes

- **Never commit** very large images (> 500KB)
- **Always use** descriptive filenames (lowercase, hyphenated)
- **Include alt text** for accessibility
- **Test images** on different screen sizes

---

**To replace placeholder images with your actual screenshots:**

1. Take screenshots of your projects
2. Optimize them using tools above
3. Rename them appropriately
4. Place them in `/src/assets/images/projects/`
5. The imports will automatically use your images
