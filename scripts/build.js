import fs from 'fs';
import { execSync } from 'child_process';

const isRender = process.env.RENDER === 'true';

// Auto-install dependencies if node_modules is missing
if (!fs.existsSync('./node_modules')) {
  console.log('📦 node_modules not found. Running npm install...');
  execSync('npm install', { stdio: 'inherit' });
}

if (isRender) {
  console.log('🚀 Render environment detected: Building server...');
  try {
    execSync('npx tsc -p server/tsconfig.json', { stdio: 'inherit' });
    console.log('✅ Server build completed successfully for Render!');
  } catch (error) {
    console.error('❌ Server build failed:', error);
    process.exit(1);
  }
} else {
  console.log('🚀 Building client for production...');
  try {
    execSync('tsc -b && vite build', { stdio: 'inherit' });
    console.log('✅ Client build completed successfully!');
  } catch (error) {
    console.error('❌ Client build failed:', error);
    process.exit(1);
  }
}
