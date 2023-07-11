import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#00000",
      "copy-black": "#231F20",
      "galaxy-blue": "#000735",
      "rose-quartz": "#eab8b2",
      "purple-rain": "#440B45",
      "classic-blue": "#0f4c81",
      "orange-red": "#DD5928",
      "chive-green": "#00966d",
      "biscay-green": "#00b3b0",
      "purbeck-stone": "#e3d9d7",
      "light-yellow": "#e3d9d7",
    },
  },
  plugins: [],
  content: [
    "components/**/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "utils/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
    "Error.{js,ts,vue}",
    "error.{js,ts,vue}",
    "app.config.{js,ts}",
  ],
};
