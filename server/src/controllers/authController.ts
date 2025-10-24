import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters' });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error: unknown) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt for email:', email);

    // Validation
    if (!email || !password) {
      console.log('❌ Missing email or password');
      res.status(400).json({ message: 'Please provide email and password' });
      return;
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found for email:', email);
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    console.log('✅ User found:', user.email);

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', email);
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    console.log('✅ Password valid, generating token...');

    // Generate token
    console.log('🔑 Using JWT_SECRET for signing:', JWT_SECRET.substring(0, 10) + '...');
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    console.log('✅ Token generated:', token.substring(0, 20) + '...');

    console.log('✅ Login successful for:', email);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error: unknown) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as { userId?: string }).userId;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error: unknown) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
