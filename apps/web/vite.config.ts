import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  plugins:
    command === "serve"
      ? [
          {
            name: "dev-csp",
            transformIndexHtml(html: string) {
              return html
                .replace("style-src 'self';", "style-src 'self' 'unsafe-inline';")
                .replace("connect-src 'none';", "connect-src 'self' ws:;");
            },
          },
        ]
      : [],
}));
