import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config({ path: 'server/.env' });

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  JWT Configuration Test');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🔑 JWT_SECRET loaded:', JWT_SECRET.substring(0, 20) + '...');
console.log('📏 JWT_SECRET length:', JWT_SECRET.length);
console.log('📝 JWT_SECRET full (for debugging):', JWT_SECRET);
console.log('');

// Test token creation and verification
console.log('🧪 Testing token creation and verification...\n');

const testUserId = '507f1f77bcf86cd799439011';
const token = jwt.sign({ userId: testUserId }, JWT_SECRET, { expiresIn: '7d' });

console.log('✅ Token created successfully');
console.log('📄 Token:', token.substring(0, 50) + '...');
console.log('');

try {
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  console.log('✅ Token verified successfully');
  console.log('👤 Decoded userId:', decoded.userId);
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ✅ JWT configuration is working correctly!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
} catch (error) {
  console.error('❌ Token verification failed:', error);
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ❌ JWT configuration has issues!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

process.exit(0);
