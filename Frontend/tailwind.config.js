export default {
  theme: {
    extend: {
      animation: {
        border: "border 4s linear infinite",
        shake: "shake 0.3s ease-in-out",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },
      },
    },
  },
};
