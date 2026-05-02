import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import db from '@/lib/db';
import Invoice from '@/models/Invoice';
import { isValidEmail, validateInvoiceItems } from '@/utils/validation';

export const GET = withAuth(async (req: any, { params }: { params: { id: string } }) => {
  try {
    await db();
    const invoice = await Invoice.findOne({ _id: params.id, userId: req.user.userId });
    if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

export const PUT = withAuth(async (req: any, { params }: { params: { id: string } }) => {
  try {
    await db();
    const updates = await req.json();
    const { status, clientName, clientEmail, items, dueDate } = updates;

    const updateObj: any = {};

    if (status) {
      if (status === 'unpaid') {
        updateObj.status = 'pending';
      } else if (['pending', 'paid'].includes(status)) {
        updateObj.status = status;
      } else {
        return NextResponse.json({ error: 'Invalid status. Use paid or unpaid' }, { status: 400 });
      }
    }

    if (items) {
      const itemError = validateInvoiceItems(items);
      if (itemError) return NextResponse.json({ error: itemError }, { status: 400 });
    }

    if (clientEmail && !isValidEmail(clientEmail)) {
      return NextResponse.json({ error: 'Invalid client email' }, { status: 400 });
    }

    if (clientName) updateObj.clientName = clientName;
    if (clientEmail) updateObj.clientEmail = clientEmail;
    if (items) updateObj.items = items;
    if (dueDate) updateObj.dueDate = new Date(dueDate);

    const invoice = await Invoice.findOneAndUpdate(
      { _id: params.id, userId: req.user.userId },
      updateObj,
      { new: true }
    );

    if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

export const DELETE = withAuth(async (req: any, { params }: { params: { id: string } }) => {
  try {
    await db();
    const invoice = await Invoice.findOneAndDelete({ 
      _id: params.id, 
      userId: req.user.userId 
    });
    if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
