import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import User from '@/models/User';
import Invoice from '@/models/Invoice';
import EmailLog from '@/models/EmailLog';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'payvora_admin_2026';

export const GET = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await db();

    const [totalUsers, proUsers, trialUsers, totalInvoices, revenueLogs] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ plan: 'pro', subscriptionStatus: 'active' }),
      User.countDocuments({ plan: 'free' }),
      Invoice.countDocuments({}),
      EmailLog.countDocuments({}),
    ]);

    const activeUsers = await User.countDocuments({
      _id: { $in: await Invoice.distinct('userId') },
    });

    const monthlyRevenue = proUsers * 29;

    return NextResponse.json({
      totalUsers,
      activeUsers,
      proUsers,
      trialUsers,
      totalInvoices,
      emailsSent: revenueLogs,
      estimatedMonthlyRevenue: monthlyRevenue,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
