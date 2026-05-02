import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import db from '@/lib/db';
import Invoice from '@/models/Invoice';
import { isValidEmail, validateInvoiceItems } from '@/utils/validation';

export const GET = withAuth(async (req: any) => {
  try {
    await db();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const clientId = searchParams.get('clientId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const query: any = { userId: req.user.userId };
    if (status && ['pending', 'paid', 'overdue'].includes(status)) {
      query.status = status;
    }
    if (clientId) query.clientId = clientId;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    const invoices = await Invoice.find(query).sort({ createdAt: -1 });
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

export const POST = withAuth(async (req: any) => {
  try {
    await db();
    const body = await req.json();
    const { clientName, clientEmail, items, dueDate } = body;

    const fieldError = !clientName || !clientEmail || !items || !dueDate
      ? 'Missing required fields: clientName, clientEmail, items, dueDate'
      : null;
    if (fieldError) return NextResponse.json({ error: fieldError }, { status: 400 });

    if (!isValidEmail(clientEmail)) {
      return NextResponse.json({ error: 'Invalid client email' }, { status: 400 });
    }

    const itemError = validateInvoiceItems(items);
    if (itemError) return NextResponse.json({ error: itemError }, { status: 400 });

    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      return NextResponse.json({ error: 'Invalid due date' }, { status: 400 });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const { allowed, reason } = canCreateInvoice(user);
    if (!allowed) {
      return NextResponse.json({ error: reason }, { status: 403 });
    }

    const invoiceCount = await Invoice.countDocuments({ userId: req.user.userId });
    if (user.plan === 'free' && invoiceCount >= 3) {
      return NextResponse.json({ error: 'Free trial limited to 3 invoices. Upgrade to Pro.' }, { status: 403 });
    }

    const invoice = await Invoice.create({
      userId: req.user.userId,
      clientId: body.clientId || undefined,
      clientName,
      clientEmail,
      items,
      dueDate: parsedDueDate,
      status: 'pending',
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error: any) {
    console.error('Create invoice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
