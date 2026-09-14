import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://adrianeyre.github.io/battleships-game/, so every asset URL
// needs the repository name in front of it. A root base would emit `/assets/...`,
// which on Pages resolves to the user site and 404s.
export default defineConfig({
  base: '/battleships-game/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
