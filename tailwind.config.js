/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf4ea",
        ink: "#21130d",
        gold: "#d6a54b",
        marigold: "#f0c341",
        mehendi: "#466b3b",
        ruby: "#7c1020",
        wine: "#2b0812",
      },
      fontFamily: {
        display: ["'Bodoni Moda'", "serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 80px rgba(214, 165, 75, 0.18)",
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(circle at top, rgba(231, 196, 111, 0.35), transparent 40%)",
      },
    },
  },
  plugins: [],
};
