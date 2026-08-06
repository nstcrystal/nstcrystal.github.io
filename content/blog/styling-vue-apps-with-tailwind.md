---
title: "Styling Modern Vue Apps with Tailwind CSS"
description: A practical look at using Tailwind CSS in your Vue projects, with tips on theming, dark mode, and keeping your styles maintainable.
date: 2025-04-10
image: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 5
author:
  name: Võ Văn Duy
  avatar:
    src: https://avatars.githubusercontent.com/u/148052951?v=4
    alt: Võ Văn Duy
---

Tailwind CSS has completely changed how I write styles. Instead of jumping between HTML and CSS files, everything lives right in the markup.

## Utility-First Approach

With utility classes, you build components directly in the template:

```vue
<button class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
  Click me
</button>
```

No more naming classes and hunting through stylesheets.

## Dark Mode

Dark mode is built into Tailwind's class strategy. Just add `dark:` variants:

```vue
<div class="bg-white dark:bg-slate-900">
  <p class="text-slate-700 dark:text-slate-300">Hello</p>
</div>
```

## Pairing with Nuxt UI

The best part is combining Tailwind with Nuxt UI components. You get beautiful, accessible components out of the box, and you can customize them with Tailwind classes.

## Keep It Clean

- Use `@apply` sparingly for repeated patterns
- Create small, focused components
- Use your config file for design tokens

Tailwind made styling fun again. Give it a try in your next Vue project!
