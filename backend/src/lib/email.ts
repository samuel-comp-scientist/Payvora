import nodemailer from 'nodemailer';

import db from '@/lib/db';
import EmailLog from '@/models/EmailLog';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string, invoiceId?: string, userId?: string, emailType: string = 'invoice') {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    if (invoiceId && userId) {
      await db();
      await EmailLog.create({
        invoiceId,
        userId,
        emailType,
        recipientEmail: to,
        status: 'sent',
      });
    }

    return true;
  } catch (error) {
    console.error('Email send error:', error);

    if (invoiceId && userId) {
      await db();
      await EmailLog.create({
        invoiceId,
        userId,
        emailType,
        recipientEmail: to,
        status: 'failed',
      });
    }

    return false;
  }
}

export function generateInvoiceEmail(invoice: any, businessName?: string) {
  const brandHeader = businessName ? `<h2 style="color:#333;">${businessName}</h2>` : '';
  const itemsList = invoice.items
    .map((item: any) => `<tr>
      <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">$${item.price.toFixed(2)}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>`)
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      ${brandHeader}
      <h2 style="color:#333;">Invoice from Payvora</h2>
      <p><strong>Client:</strong> ${invoice.clientName}</p>
      <p><strong>Invoice Date:</strong> ${new Date(invoice.createdAt || Date.now()).toLocaleDateString()}</p>
      <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:8px;border:1px solid #ddd;text-align:left;">Item</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:center;">Qty</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>${itemsList}</tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding:8px;border:1px solid #ddd;text-align:right;"><strong>Total:</strong></td>
            <td style="padding:8px;border:1px solid #ddd;text-align:right;"><strong>$${invoice.total.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
      <p style="color:#666;">Please process this payment at your earliest convenience.</p>
    </div>
  `;
}

export function generateReminderEmail(invoice: any, reminderType: string) {
  let message = '';
  let urgencyColor = '#333';

  switch (reminderType) {
    case '3d_before':
      message = 'Your invoice is due in 3 days.';
      urgencyColor = '#2196f3';
      break;
    case '1d_before':
      message = 'Your invoice is due tomorrow.';
      urgencyColor = '#ff9800';
      break;
    case 'due_today':
      message = 'Your invoice is due today.';
      urgencyColor = '#f44336';
      break;
    case '3d_after':
      message = 'Your invoice is 3 days overdue.';
      urgencyColor = '#d32f2f';
      break;
    case '7d_after':
      message = 'Your invoice is 7 days overdue. Immediate payment required.';
      urgencyColor = '#b71c1c';
      break;
    default:
      message = 'Payment reminder for your invoice.';
  }

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:${urgencyColor};">Payment Reminder</h2>
      <p>${message}</p>
      <p><strong>Client:</strong> ${invoice.clientName}</p>
      <p><strong>Invoice Total:</strong> $${invoice.total.toFixed(2)}</p>
      <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
      <p style="color:#666;">Please make the payment as soon as possible to avoid any late fees.</p>
    </div>
  `;
}
