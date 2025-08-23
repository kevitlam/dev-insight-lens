#!/usr/bin/env node

/**
 * Production startup script
 * Ensures all environment variables are set correctly for production
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set production environment variables
process.env.NODE_ENV = 'production';
process.env.VITE_NODE_ENV = 'production';
process.env.VITE_API_URL = process.env.VITE_API_URL || 'https://artemis-backend-mx4u.onrender.com';

console.log('🚀 Starting oncode developer analysis in production mode...');
console.log('📡 Backend URL:', process.env.VITE_API_URL);
console.log('🌍 Environment:', process.env.VITE_NODE_ENV);

// Start Vite in production mode
const vite = spawn('npm', ['run', 'start'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

vite.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Production server exited with code ${code}`);
    process.exit(code);
  }
});

vite.on('error', (error) => {
  console.error('❌ Failed to start production server:', error);
  process.exit(1);
});
