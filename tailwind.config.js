const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./public/*.html'],
  mode: 'jit',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    minHeight: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    extend: {
      fontSize: {
        xxxs: ['0.55rem', '9px'],
        xxs: ['0.7rem', '11px'],
        xs: ['0.75rem', '13px'],
      },
      dropShadow: {
        '3xl': '0 10px 20px rgba(0, 0, 0, 0.45)',
        '4xl': '0 35px 35px rgba(0, 0, 0, 0.65)',
        '5xl': '0 35px 35px rgba(0, 0, 0, 0.85)',
      },
      boxShadow: {
        '3xl': '0 10px 20px rgba(0, 0, 0, 0.45)',
        '4xl': '0 35px 35px rgba(0, 0, 0, 0.65)',
        '5xl': '0 35px 35px rgba(0, 0, 0, 0.85)',
      },
      screens: {
        portrait: { raw: '(orientation: portrait)' },
        portraitmd: { raw: '(orientation: portrait) and (min-width: 768px)' },
        tablet: { raw: '(orientation: portrait) and (max-width: 1023px)' },
        mobile: { raw: '(orientation: portrait) and (max-width: 768px)' },
      },
      fontFamily: {
        mono: ['ui-monospace', ...fontFamily.mono],
      },
      keyframes: {
        showat50: {
          '0%, 35%, 100%': { opacity: '0' },
          '40%, 95%': { opacity: '1' },
        },
        showat75: {
          '0%, 67%, 100%': { opacity: '0' },
          '70%, 95%': { opacity: '1' },
        },
        scaleinout: {
          '0%, 5%, 65%, 100%': { transform: 'scale(1) translateY(0)' },
          '10%, 60%': { transform: 'scale(2.3) translateY(40px)' },
        },
        fadeinout: {
          '0%, 100%': { opacity: '0' },
          '30%, 80%': { opacity: '1' },
        },
        fadeinoutfast: {
          '0%, 100%': { opacity: '0' },
          '30%, 90%': { opacity: '1' },
        },
        darkinout: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(0.2)' },
        },
      },
      animation: {
        showat50: 'showat50 8s ease-in-out 3s infinite',
        showat75: 'showat75 8s ease-in-out 3s infinite',
        fadeinout: 'fadeinout 10s ease-in-out 3s infinite',
        fadeinoutfast: 'fadeinoutfast 10s ease-in-out 3s infinite',
        scaleinout: 'scaleinout 8s ease-out 3s infinite',
        darkinout: 'darkinout 5s ease-in-out infinite',
      },
      colors: {
        gray: {
          ...colors.stone,
          black: '#363434',
          white: '#FFEAD7',
        },
        yellow: {
          ...colors.yellow,
          lunar: '#FFD586',
          lunarP3: 'color(display-p3 1 0.786 0.432 / 1)',
          bright: '#FFB500',
          sunflower: '#F7CE68',
          nice: '#F69200',
          gold: '#F0D1AD',
          peach: '#FFC895',
        },
        orange: {
          ...colors.orange,
          dot: '#FE9500',
          bright: '#F96332',
          peach: '#FBAB7E',
          bmac: '#FF813F',
        },
        red: {
          ...colors.red,
          bright: '#F23343',
          brightP3: 'color(display-p3 1 0.721 0 / 1)',
          hot: '#FF1536',
          hotP3: 'color(display-p3 1 0.043 0.131 / 1)',
          mars: '#862833',
          dull: '#C75764',
          low: '#4B171D',
        },
        pink: {
          ...colors.pink,
          magenta: '#E14283',
          magentish: '#811A4C',
        },
        maroon: '#AA9483',
        sepia: '#B97F64',
        mauve: {
          default: '#3D304C',
          gray: '#4D3E56',
          lightgray: '#352A3C',
          darkgray: '#2A252A',
          dark: '#2E2236',
          blackish: '#120d13',
          black: '#201D22',
          blue: '#161122',
        },
        green: {
          ...colors.green,
          spotify: '#70B069',
          weird: '#46BD62',
          muted: '#54D381',
        },
        blue: {
          ...colors.blue,
          calm: '#6488B9',
          gray: '#B1B2DD',
          muted: '#2977FF',
          facebook: '#3B5998',
          twitter: '#1DA1F2',
          linkedin: '#0077b5',
          dark: '#050129',
        },
        github: '#ffffff',
        reddit: '#FF4500',
      },
    },
  },
  variants: {},
  plugins: [
    require('tailwind-css-variables')(
      {
        // modules
      },
      {
        // options
      }
    ),
  ],
}
