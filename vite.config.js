import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Original: server: { port: 5173, open: true }
// Replit adjustment: bind to all interfaces and accept the Replit preview host; no browser auto-open.
export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0', port: 5173, allowedHosts: true },
  preview: { host: '0.0.0.0', port: 5173, allowedHosts: true },
});
