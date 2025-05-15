import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/colon-cancer-detection/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/rf-predict': 'http://localhost:8000',
    },
  },
});