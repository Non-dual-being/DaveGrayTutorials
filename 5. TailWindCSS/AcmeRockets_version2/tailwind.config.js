/** @type {import('tailwindcss').Config} */
module.exports = {
  /** including the js in the build of the css is important */
  content: ['./build/**/*.{html,js}'], /**'./build/*.html', './build/scripts/*.js'*/
  theme: {
    extend: {
      colors: {
        papayawhip: {
          light: '#fef4e4',
          DEFAULT: '#ffefd5',
          dark: '#fee5bc'
        }
      },
      screens: {
        'widescreen' : {'raw' : '(min-aspect-ratio: 3/2)'},
        'tallscreen' : {'raw' : '(max-aspect-ratio: 13/20)'}
      },
      keyframes: {
        'open-menu' : {
          '0%': { transform: 'scaleY(0)'},
          '80%': { transform: 'scaleY(1.2)'},
          '100%': { transform: 'scaleY(1)'}
        }   
      },
      animation: {
        'open-menu' : 'open-menu 0.5s ease-in-out forwards'
      }

    },
  },
  plugins: [],
}

