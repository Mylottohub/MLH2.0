// vite.config.js
import { defineConfig } from "file:///C:/Users/Admin/Documents/mylottohub/MLH_RECAMP/MLH_2.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Admin/Documents/mylottohub/MLH_RECAMP/MLH_2.0/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/Admin/Documents/mylottohub/MLH_RECAMP/MLH_2.0/node_modules/vite-plugin-pwa/dist/index.js";
var manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "React-vite-app",
    short_name: "react-vite-app",
    description: "I am a simple vite app",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};
var vite_config_default = defineConfig({
  // plugins: [react()],
  plugins: [react(), VitePWA(manifestForPlugIn)],
  base: "/"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxEb2N1bWVudHNcXFxcbXlsb3R0b2h1YlxcXFxNTEhfUkVDQU1QXFxcXE1MSF8yLjBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluXFxcXERvY3VtZW50c1xcXFxteWxvdHRvaHViXFxcXE1MSF9SRUNBTVBcXFxcTUxIXzIuMFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQWRtaW4vRG9jdW1lbnRzL215bG90dG9odWIvTUxIX1JFQ0FNUC9NTEhfMi4wL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5cbmNvbnN0IG1hbmlmZXN0Rm9yUGx1Z0luID0ge1xuICByZWdpc3RlclR5cGU6IFwicHJvbXB0XCIsXG4gIGluY2x1ZGVBc3Nlc3RzOiBbXCJmYXZpY29uLmljb1wiLCBcImFwcGxlLXRvdWMtaWNvbi5wbmdcIiwgXCJtYXNrZWQtaWNvbi5zdmdcIl0sXG4gIG1hbmlmZXN0OiB7XG4gICAgbmFtZTogXCJSZWFjdC12aXRlLWFwcFwiLFxuICAgIHNob3J0X25hbWU6IFwicmVhY3Qtdml0ZS1hcHBcIixcbiAgICBkZXNjcmlwdGlvbjogXCJJIGFtIGEgc2ltcGxlIHZpdGUgYXBwXCIsXG4gICAgaWNvbnM6IFtcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9hbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgIHB1cnBvc2U6IFwiZmF2aWNvblwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgIHB1cnBvc2U6IFwiZmF2aWNvblwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9hcHBsZS10b3VjaC1pY29uLnBuZ1wiLFxuICAgICAgICBzaXplczogXCIxODB4MTgwXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgIHB1cnBvc2U6IFwiYXBwbGUgdG91Y2ggaWNvblwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9tYXNrYWJsZV9pY29uLnBuZ1wiLFxuICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgIHB1cnBvc2U6IFwiYW55IG1hc2thYmxlXCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgdGhlbWVfY29sb3I6IFwiIzE3MTcxN1wiLFxuICAgIGJhY2tncm91bmRfY29sb3I6IFwiI2YwZTdkYlwiLFxuICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgIHNjb3BlOiBcIi9cIixcbiAgICBzdGFydF91cmw6IFwiL1wiLFxuICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0XCIsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBWaXRlUFdBKG1hbmlmZXN0Rm9yUGx1Z0luKV0sXG4gIGJhc2U6IFwiL1wiLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtXLFNBQVMsb0JBQW9CO0FBQy9YLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFJeEIsSUFBTSxvQkFBb0I7QUFBQSxFQUN4QixjQUFjO0FBQUEsRUFDZCxnQkFBZ0IsQ0FBQyxlQUFlLHVCQUF1QixpQkFBaUI7QUFBQSxFQUN4RSxVQUFVO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsSUFDQSxhQUFhO0FBQUEsSUFDYixrQkFBa0I7QUFBQSxJQUNsQixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsRUFDZjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsaUJBQWlCLENBQUM7QUFBQSxFQUM3QyxNQUFNO0FBQ1IsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
