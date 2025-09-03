import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL || 'https://blueprint-pwbb.onrender.com'),
        'process.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL || 'https://blueprint-pwbb.onrender.com')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
