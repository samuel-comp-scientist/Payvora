import dayjs from 'dayjs';

export const PLANS = {
  free: {
    name: 'Free Trial',
    price: 0,
    features: ['3 invoices only', 'Basic email', 'Manual reminders'],
    invoiceLimit: 3,
    trialDays: 14,
  },
  pro: {
    name: 'Pro',
    price: 29,
    features: ['Unlimited invoices', 'Auto reminders', 'PDF download', 'Branding', 'Client management'],
    invoiceLimit: null,
    trialDays: 14,
  },
};

export function isTrialExpired(user: any): boolean {
  if (user.plan === 'pro' && user.subscriptionStatus === 'active') return false;
  const trialEnd = dayjs(user.trialStartedAt).add(PLANS.free.trialDays, 'day');
  return dayjs().isAfter(trialEnd);
}

export function canCreateInvoice(user: any): { allowed: boolean; reason?: string } {
  if (user.plan === 'pro' && user.subscriptionStatus === 'active') {
    return { allowed: true };
  }

  if (isTrialExpired(user)) {
    return { allowed: false, reason: 'Trial expired. Upgrade to Pro for $29/month.' };
  }

  return { allowed: true };
}
