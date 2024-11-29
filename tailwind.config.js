// /** @type {import('tailwindcss').Config} */
// import forms from '@tailwindcss/forms'
// import typography from '@tailwindcss/typography'
// import aspectRatio from '@tailwindcss/aspect-ratio'

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           blue: '#2A3390',
//           yellow: '#F9E80E',
//           green: '#5CBA44',
//           red: '#E32124'
//         }
//       },
//       fontFamily: {
//         sans: ['Inter var', 'sans-serif'],
//         handwritten: ['Caveat', 'cursive'],
//       },
//       animation: {
//         'gradient': 'gradient 8s linear infinite',
//         'slide-down': 'slide-down 0.5s ease-out',
//       },
//       keyframes: {
//         gradient: {
//           '0%, 100%': {
//             'background-size': '200% 200%',
//             'background-position': 'left center'
//           },
//           '50%': {
//             'background-size': '200% 200%',
//             'background-position': 'right center'
//           },
//         },
//         'slide-down': {
//           '0%': { transform: 'translateY(-10px)', opacity: 0 },
//           '100%': { transform: 'translateY(0)', opacity: 1 },
//         },
//       },
//     },
//   },
//   plugins: [
//     forms,
//     typography,
//     aspectRatio,
//   ],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

