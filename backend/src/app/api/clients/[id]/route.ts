import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import db from '@/lib/db';
import Client from '@/models/Client';
import Invoice from '@/models/Invoice';

export const GET = withAuth(async (req: any, { params }: { params: { id: string } }) => {
  try {
    await db();
    const client = await Client.findOne({ _id: params.id, userId: req.user.userId });
    if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

export const PUT = withAuth(async (req: any, { params }: { params: { id: string } }) => {
  try {
    await db();
    const { name, email } = await req.json();
    const update: any = {};
    if (name) update.name = name;
    if (email) update.email = email;

    const client = await Client.findOneAndUpdate(
      { _id: params.id, userId: req.user.userId },
      update,
      { new: true }
    );
    if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

export const DELETE = withAuth(async (req: any, { params }: { params: { id: string } }) => {
  try {
    await db();
    const invoiceCount = await Invoice.countDocuments({ clientId: params.id });
    if (invoiceCount > 0) {
      return NextResponse.json({ error: 'Cannot delete client with existing invoices' }, { status: 400 });
    }

    const client = await Client.findOneAndDelete({ _id: params.id, userId: req.user.userId });
    if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Client deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
