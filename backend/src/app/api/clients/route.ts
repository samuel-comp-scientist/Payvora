import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import db from '@/lib/db';
import Client from '@/models/Client';
import { isValidEmail } from '@/utils/validation';

export const GET = withAuth(async (req: any) => {
  try {
    await db();
    const clients = await Client.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

export const POST = withAuth(async (req: any) => {
  try {
    await db();
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const existing = await Client.findOne({ userId: req.user.userId, email });
    if (existing) {
      return NextResponse.json({ error: 'Client already exists' }, { status: 400 });
    }

    const client = await Client.create({ userId: req.user.userId, name, email });
    return NextResponse.json(client, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Client email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
