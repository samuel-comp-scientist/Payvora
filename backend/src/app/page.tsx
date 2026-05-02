import { NextResponse } from 'next/server';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Payvora API - MVP Backend</h1>
      <p>Backend is running successfully.</p>
      <h2>API Endpoints:</h2>
      <ul>
        <li><strong>Auth:</strong> /api/auth/register, /api/auth/login</li>
        <li><strong>Invoices:</strong> /api/invoices, /api/invoices/[id], /api/invoices/[id]/send</li>
        <li><strong>Dashboard:</strong> /api/dashboard</li>
        <li><strong>Cron:</strong> /api/cron/reminders (POST)</li>
      </ul>
    </div>
  );
}
