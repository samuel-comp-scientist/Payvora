import db from '@/lib/db';
import Invoice from '@/models/Invoice';
import { sendEmail, generateReminderEmail } from '@/lib/email';
import dayjs from 'dayjs';

const REMINDER_RULES = [
  { key: '3d_before', daysBefore: 3, subject: 'Invoice Due in 3 Days' },
  { key: '1d_before', daysBefore: 1, subject: 'Invoice Due Tomorrow' },
  { key: 'due_today', daysBefore: 0, subject: 'Invoice Due Today' },
  { key: '3d_after', daysAfter: 3, subject: 'Invoice 3 Days Overdue' },
  { key: '7d_after', daysAfter: 7, subject: 'Invoice 7 Days Overdue' },
];

export async function checkOverdueInvoices() {
  try {
    await db();
    const now = dayjs();
    let totalSent = 0;

    const pendingInvoices = await Invoice.find({
      status: { $in: ['pending', 'overdue'] },
    });

    for (const invoice of pendingInvoices) {
      if (invoice.status === 'paid') continue;

      const dueDate = dayjs(invoice.dueDate);
      const daysDiff = dueDate.diff(now, 'day');

      for (const rule of REMINDER_RULES) {
        if (invoice.remindersSent?.includes(rule.key)) continue;

        let shouldSend = false;
        if (rule.daysBefore !== undefined && daysDiff === rule.daysBefore) {
          shouldSend = true;
        }
        if (rule.daysAfter !== undefined && daysDiff === -rule.daysAfter) {
          shouldSend = true;
          if (invoice.status === 'pending') {
            invoice.status = 'overdue';
          }
        }

        if (shouldSend) {
          const sent = await sendEmail(
            invoice.clientEmail,
            rule.subject,
            generateReminderEmail(invoice, rule.key),
            invoice._id.toString(),
            invoice.userId,
            rule.key
          );
          if (sent) {
            invoice.remindersSent = [...(invoice.remindersSent || []), rule.key];
            totalSent++;
          }
        }
      }

      await invoice.save();
    }

    return { processed: pendingInvoices.length, sent: totalSent };
  } catch (error) {
    console.error('Reminder check error:', error);
    throw error;
  }
}
