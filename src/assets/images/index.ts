import avatarImg from './profile/avatar.jpg';

import flappy_birdImg from './projects/flappy_bird.jpg';


// Profile Images
export const profileAvatar = avatarImg;

// Project Images
export const projectImages = {
  flappy_bird: flappy_birdImg,
} as const;

// Placeholder image for fallback
export const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'%3E%3Crect width='1200' height='675' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%23999'%3EProject Image%3C/text%3E%3C/svg%3E";

/**
 * HOW TO REPLACE WITH LOCAL IMAGES:
 * 
 * 1. Add your images to /src/assets/images/projects/
 * 
 * 2. Import them like this:
 *    import ecommerceImg from './projects/ecommerce.jpg';
 *    import taskManagerImg from './projects/task-manager.jpg';
 *    // ... etc
 * 
 * 3. Export them:
 *    export const projectImages = {
 *      ecommerce: ecommerceImg,
 *      taskManager: taskManagerImg,
 *      // ... etc
 *    };
 * 
 * 4. Same for profile image:
 *    import avatarImg from './profile/avatar.jpg';
 *    export const profileAvatar = avatarImg;
 */
