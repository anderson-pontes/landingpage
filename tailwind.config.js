/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        dark: "#1F2937",
        light: "#F9FAFB",
        // Cores personalizadas para o gradiente do nome
        nameStart: "#2E7D32", // Verde escuro
        nameEnd: "#64DD17",   // Verde limão
      },
      backgroundImage: {
        'name-gradient': 'linear-gradient(90deg, var(--tw-gradient-stops))',
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 1.5s ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}