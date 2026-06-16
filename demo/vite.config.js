import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
      'framer-motion': path.resolve(__dirname, 'node_modules/framer-motion'),
      'lucide-react': path.resolve(__dirname, 'node_modules/lucide-react'),
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
