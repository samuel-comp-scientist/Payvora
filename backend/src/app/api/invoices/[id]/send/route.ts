import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import db from '@/lib/db';
import Invoice from '@/models/Invoice';
import { sendEmail, generateInvoiceEmail } from '@/lib/email';

export const POST = withAuth(async (req: any, { params }: { params: { id: string } }) => {
  try {
    await db();
    const invoice = await Invoice.findOne({ 
      _id: params.id, 
      userId: req.user.userId 
    });
    
    if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const sent = await sendEmail(
      invoice.clientEmail,
      `Invoice from Payvora - ${invoice.clientName}`,
      generateInvoiceEmail(invoice)
    );

    if (!sent) return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    return NextResponse.json({ message: 'Invoice sent successfully' });
  } catch (error) {
    console.error('Send invoice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
