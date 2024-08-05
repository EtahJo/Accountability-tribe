import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'home-bg-image': "url('/stacked-waves-haikei.svg')",
        'home-bg-image-phone': "url('/wave-haikei.svg')",
      },
      colors: {
        lightPink: '#F2ADEF',
        purple: '#9352E6',
        lighterPink: 'rgba(242,173,239,0.3)',
          dark: {
          background: '#090809',
          text: '#EEE5E9',
          primary: '#B87333',
          secondary: '#03dac6',
        },
      },
      boxShadow: {
        '3xl': '0px 4px 4px 0px #00000040',
        buttonInner: '0px 4px 4px 0px #00000040 inset',
        roundright: '-10px 10px 0 #F2ADEF',
        roundleft: '10px 10px 0px #F2ADEF',
        roundTleft: '10px -10px 0px #F2ADEF',
        roundTright: '-10px -10px 0px #F2ADEF',
      },
      borderRadius: {
        '5xl': '50px',
      },
      screens: {
        phone: '374px',
        medPhone: '439px',
        largePhone: '582px',
        '350': '350px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        moveHorizontal: {
          '0%, 100%': {
            left: '0%',
            // opacity: '1',
          },
          '50%': {
            left: '100%',
            // opacity: '0',
          },
        },
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },

        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        moveHori: ' moveHorizontal 10s ease-in-out infinite ',
        wiggle: 'wiggle 1s ease-in-out infinite',
        zoom: 'zoom 2s infinite',
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '3px 3px 6px rgba(225, 225, 225, 0.8)',
        xl: '4px 4px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 6px rgba(225, 225, 225, 0.8)',
        },
        '.text-shadow-xl': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.custom-spin-buttons': {
          '&::-webkit-outer-spin-button': {
            opacity: '1',
            padding: '5px',
            margin: '10px 0 0 0',
            color: '#F2ADEF',
            'background-color': 'white',
          },
          '&::-webkit-inner-spin-button': {
            opacity: '1',
            padding: '5px',
            margin: '10px 0 0 0',
            color: '#F2ADEF important',
            'background-color': 'white',
          },
        },
        '.styled-spin-buttons': {
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            opacity: '1',
            'background-color': 'white',
            width: '1rem',
            height: '1rem',
            border: '3px solid black important',
            'border-radius': '50%',
          },
        },
        '.no-spin': {
          '-webkit-appearance': 'none',

          margin: '0',
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',

            margin: '0',
          },
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',

            margin: '0',
          },
        },
        '.break-inside-avoid': {
          'break-inside': 'avoid',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
} satisfies Config;

export default config;
