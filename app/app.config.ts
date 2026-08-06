export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://avatars.githubusercontent.com/u/148052951?v=4',
      light: 'https://avatars.githubusercontent.com/u/148052951?v=4',
      alt: 'Võ Văn Duy profile picture'
    },
    // meetingLink: 'https://github.com/nstcrystal',
    email: 'nstcrystal@gmail.com',
    available: true,
    github: {
      username: 'nstcrystal'
    }
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `© ${new Date().getFullYear()} • NSTCrystal. All rights reserved`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/nstcrystal',
        'target': '_blank',
        'aria-label': 'GitHub'
      },
      {
        'icon': 'i-simple-icons-facebook',
        'to': 'https://www.facebook.com/nst.crystal.1',
        'target': '_blank',
        'aria-label': 'Facebook'
      },
      {
        'icon': 'i-simple-icons-gmail',
        'to': 'mailto:nstcrystal@gmail.com',
        'target': '_blank',
        'aria-label': 'Email'
      },
      // {
      //   'icon': 'i-simple-icons-nuxt',
      //   'to': 'https://nuxt.com/',
      //   'target': '_blank',
      //   'aria-label': 'Nuxt'
      // }
    ]
  }
})
