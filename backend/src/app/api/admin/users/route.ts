import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import User from '@/models/User';
import Invoice from '@/models/Invoice';

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
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const users = await User.find({}).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 });

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const [invoiceCount, lastInvoice] = await Promise.all([
          Invoice.countDocuments({ userId: user._id.toString() }),
          Invoice.findOne({ userId: user._id.toString() }).sort({ createdAt: -1 }),
        ]);
        return {
          id: user._id,
          email: user.email,
          businessName: user.businessName,
          plan: user.plan,
          subscriptionStatus: user.subscriptionStatus,
          invoiceCount,
          lastActive: lastInvoice?.createdAt || user.createdAt,
          createdAt: user.createdAt,
        };
      })
    );

    const total = await User.countDocuments({});

    return NextResponse.json({ users: usersWithStats, total, page, limit });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
