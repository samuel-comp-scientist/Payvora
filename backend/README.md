# Payvora Backend - MVP

Next.js TypeScript backend for invoice management system.

## Features

- User Authentication (JWT)
- Create & Manage Invoices
- Invoice Status System (pending, paid, overdue)
- Send Invoices via Email
- Automatic Payment Reminders
- Dashboard Overview

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/payvora
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

3. Run development server:
```bash
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Invoices
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create invoice
- `GET /api/invoices/:id` - Get single invoice
- `PUT /api/invoices/:id` - Update invoice status
- `POST /api/invoices/:id/send` - Send invoice via email

### Dashboard
- `GET /api/dashboard` - Get stats

### Cron
- `POST /api/cron/reminders` - Trigger overdue reminders

## Database

Uses MongoDB with Mongoose ODM.

## Tech Stack

- Next.js 14
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer
- Day.js
