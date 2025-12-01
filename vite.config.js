import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base:'/React-Weather-App/',
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0')
  }
});
