import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  // Relative production assets work at the GitHub Pages project path and at
  // a self-hosted root. Dev keeps Vite's normal root-relative module paths.
  base: command === "build" ? "./" : "/",
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
