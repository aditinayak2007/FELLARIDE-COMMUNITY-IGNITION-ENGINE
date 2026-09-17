import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
  },
  base: '/FELLARIDE-COMMUNITY-IGNITION-ENGINE/' ,
  build: {
    outDir: 'dist',
  },
});
