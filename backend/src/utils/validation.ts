export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRequiredFields(data: Record<string, any>, required: string[]): string | null {
  for (const field of required) {
    if (!data[field]) return `Missing required field: ${field}`;
  }
  return null;
}

export function validateInvoiceItems(items: any[]): string | null {
  if (!Array.isArray(items) || items.length === 0) return 'At least one item is required';
  
  for (const item of items) {
    if (!item.name || typeof item.price !== 'number' || item.price <= 0 || 
        typeof item.quantity !== 'number' || item.quantity <= 0) {
      return 'Invalid item: name, positive price, and positive quantity required';
    }
  }
  return null;
}
