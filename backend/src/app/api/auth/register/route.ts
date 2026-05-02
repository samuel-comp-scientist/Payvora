import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import User from '@/models/User';
import { signJWT } from '@/lib/jwt';
import { isValidEmail } from '@/utils/validation';

export async function POST(req: NextRequest) {
  try {
    await db();
    const { email, password } = await req.json();

    const fieldError = !email || !password ? 'Email and password required' : null;
    if (fieldError) return NextResponse.json({ error: fieldError }, { status: 400 });

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = await User.create({ email, password });
    const token = signJWT({ userId: user._id.toString(), email: user.email });

    return NextResponse.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
