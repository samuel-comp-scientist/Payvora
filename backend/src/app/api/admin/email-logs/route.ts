import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import EmailLog from '@/models/EmailLog';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'payvora_admin_2026';

export const GET = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await db();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const logs = await EmailLog.find({})
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await EmailLog.countDocuments({});

    return NextResponse.json({ logs, total, page, limit });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
