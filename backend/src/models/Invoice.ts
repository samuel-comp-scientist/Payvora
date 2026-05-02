import mongoose, { Schema, model, models } from 'mongoose';
import { IInvoice } from '@/types';

const InvoiceItemSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const InvoiceSchema = new Schema<IInvoice>(
  {
    userId: { type: String, required: true },
    clientId: { type: String, ref: 'Client' },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    items: { type: [InvoiceItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending',
    },
    remindersSent: { type: [String], default: [] },
  },
  { timestamps: true }
);

InvoiceSchema.pre('save', function (next) {
  if (this.items && this.items.length > 0) {
    this.total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  next();
});

const Invoice = models.Invoice || model<IInvoice>('Invoice', InvoiceSchema);

export default Invoice;
