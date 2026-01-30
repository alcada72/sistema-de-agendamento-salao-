const config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        color: "var(--color)",
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
