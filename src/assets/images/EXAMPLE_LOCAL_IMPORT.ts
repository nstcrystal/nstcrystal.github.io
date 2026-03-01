/**
 * EXAMPLE: How to Use Local Images
 * 
 * This file shows you EXACTLY how to replace the current
 * placeholder URLs with your own local image files.
 * 
 * Copy this structure into /src/assets/images/index.ts
 * once you've added your image files.
 */

// ============================================================
// STEP 1: Add your image files to these directories
// ============================================================
//
// /src/assets/images/profile/avatar.jpg
// /src/assets/images/projects/ecommerce.jpg
// /src/assets/images/projects/task-manager.jpg
// /src/assets/images/projects/weather.jpg
// /src/assets/images/projects/portfolio-cms.jpg
// /src/assets/images/projects/analytics.jpg
// /src/assets/images/projects/recipe-finder.jpg


// ============================================================
// STEP 2: Import your images using relative paths
// ============================================================

// Profile image
import avatarImg from './profile/avatar.jpg';

// Project images
import ecommerceImg from './projects/ecommerce.jpg';
import taskManagerImg from './projects/task-manager.jpg';
import weatherImg from './projects/weather.jpg';
import portfolioCmsImg from './projects/portfolio-cms.jpg';
import analyticsImg from './projects/analytics.jpg';
import recipeFinderImg from './projects/recipe-finder.jpg';


// ============================================================
// STEP 3: Export them with the same names
// ============================================================

// Profile Images
export const profileAvatar = avatarImg;

// Project Images
export const projectImages = {
  ecommerce: ecommerceImg,
  taskManager: taskManagerImg,
  weather: weatherImg,
  portfolioCms: portfolioCmsImg,
  analytics: analyticsImg,
  recipeFinder: recipeFinderImg,
} as const;

// Placeholder (keep this as-is)
export const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'%3E%3Crect width='1200' height='675' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%23999'%3EProject Image%3C/text%3E%3C/svg%3E";


// ============================================================
// THAT'S IT!
// ============================================================
// 
// Once you copy this into /src/assets/images/index.ts,
// your local images will automatically be used throughout
// the entire application.
//
// No need to update any other files!
// ============================================================


// ============================================================
// ALTERNATIVE: Using WebP format (better compression)
// ============================================================
//
// If you convert your images to WebP:
//
// import avatarImg from './profile/avatar.webp';
// import ecommerceImg from './projects/ecommerce.webp';
//
// Everything else stays the same!
// ============================================================


// ============================================================
// TROUBLESHOOTING
// ============================================================
//
// ❌ Import Error: "Cannot find module"
//    → Check that the file exists in the correct directory
//    → Check that the file extension matches (.jpg, .png, .webp)
//    → File names are case-sensitive!
//
// ❌ Image Not Displaying
//    → Open browser DevTools (F12)
//    → Check Console tab for errors
//    → Check Network tab to see if image loads
//
// ❌ Image Too Large (slow loading)
//    → Compress image using TinyPNG or Squoosh
//    → Resize to recommended dimensions (see README.md)
//    → Convert to WebP format
//
// ============================================================
