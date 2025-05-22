import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/colon-cancer-detection/',
  plugins: [react()],
  server: {
    proxy: {
      '/predict': 'http://localhost:8000',
      '/classify': 'http://localhost:8000',
    },
  },
});