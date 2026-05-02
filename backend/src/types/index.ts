export interface IUser {
  _id?: string;
  email: string;
  password: string;
  businessName?: string;
  logo?: string;
  plan: 'free' | 'pro';
  subscriptionStatus: 'trial' | 'active' | 'inactive';
  subscriptionExpiresAt?: Date;
  trialStartedAt: Date;
  createdAt?: Date;
}

export interface IEmailLog {
  _id?: string;
  invoiceId: string;
  userId: string;
  emailType: 'invoice' | 'reminder_3d_before' | 'reminder_1d_before' | 'reminder_due_today' | 'reminder_3d_after' | 'reminder_7d_after';
  recipientEmail: string;
  status: 'sent' | 'failed';
  sentAt: Date;
}

export interface ISubscriptionPlan {
  name: string;
  price: number;
  features: string[];
  invoiceLimit: number | null;
}

export interface IInvoiceItem {
  name: string;
  price: number;
  quantity: number;
}

export interface IClient {
  _id?: string;
  userId: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInvoice {
  _id?: string;
  userId: string;
  clientId?: string;
  clientName: string;
  clientEmail: string;
  items: IInvoiceItem[];
  total: number;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue';
  remindersSent?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDashboardStats {
  totalInvoices: number;
  totalPending: number;
  totalPaid: number;
  totalAmount: number;
}

export interface JWTPayload {
  userId: string;
  email: string;
}
