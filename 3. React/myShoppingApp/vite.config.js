import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/MyShoppingApp/"  // Gebruik de exacte naam van je repository
});
