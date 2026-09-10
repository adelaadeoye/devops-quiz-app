import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// `base` must match the GitHub Pages sub-path (https://<user>.github.io/<repo>/).
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/devops-quiz-app/',
  plugins: [react(), tailwindcss()],
});
