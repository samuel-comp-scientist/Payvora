import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import db from '@/lib/db';
import Invoice from '@/models/Invoice';

export const GET = withAuth(async (req: any) => {
  await db();
  const userId = req.user.userId;

  const [totalInvoices, pendingInvoices, paidInvoices, overdueInvoices] = await Promise.all([
    Invoice.countDocuments({ userId }),
    Invoice.countDocuments({ userId, status: { $in: ['pending', 'overdue'] } }),
    Invoice.countDocuments({ userId, status: 'paid' }),
    Invoice.find({ userId, status: 'overdue' }),
  ]);

  const allInvoices = await Invoice.find({ userId });
  const totalAmount = allInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalOverdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.total, 0);

  return NextResponse.json({
    totalInvoices,
    totalPending: pendingInvoices,
    totalPaid: paidInvoices,
    totalAmount,
    totalOverdueAmount,
  });
});
