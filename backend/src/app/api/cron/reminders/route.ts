import { NextRequest, NextResponse } from 'next/server';
import { checkOverdueInvoices } from '@/lib/reminder';

const CRON_SECRET = process.env.CRON_SECRET || 'payvora_cron_secret_2026';

export const POST = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await checkOverdueInvoices();
    return NextResponse.json({ 
      message: 'Reminders processed', 
      processed: result.processed,
      sent: result.sent 
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
