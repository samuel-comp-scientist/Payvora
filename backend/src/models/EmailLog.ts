import mongoose, { Schema, model, models } from 'mongoose';
import { IEmailLog } from '@/types';

const EmailLogSchema = new Schema<IEmailLog>(
  {
    invoiceId: { type: String, required: true },
    userId: { type: String, required: true },
    emailType: {
      type: String,
      enum: ['invoice', 'reminder_3d_before', 'reminder_1d_before', 'reminder_due_today', 'reminder_3d_after', 'reminder_7d_after'],
      required: true,
    },
    recipientEmail: { type: String, required: true },
    status: { type: String, enum: ['sent', 'failed'], required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

EmailLogSchema.index({ userId: 1, sentAt: -1 });

const EmailLog = models.EmailLog || model<IEmailLog>('EmailLog', EmailLogSchema);

export default EmailLog;
