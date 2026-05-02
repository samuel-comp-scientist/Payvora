import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import db from '@/lib/db';
import Invoice from '@/models/Invoice';
import PDFDocument from 'pdfkit';

export const GET = withAuth(async (req: any, { params }: { params: { id: string } }) => {
  try {
    await db();
    const invoice = await Invoice.findOne({ _id: params.id, userId: req.user.userId });
    if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text('INVOICE', { align: 'center' });
    doc.moveDown(0.5);

    // Invoice Info
    doc.fontSize(10).font('Helvetica')
       .text(`Invoice #: ${invoice._id}`)
       .text(`Date: ${new Date(invoice.createdAt || Date.now()).toLocaleDateString()}`)
       .text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`)
       .text(`Status: ${invoice.status.toUpperCase()}`);
    doc.moveDown();

    // Client Info
    doc.fontSize(12).font('Helvetica-Bold').text('Bill To:');
    doc.fontSize(10).font('Helvetica').text(invoice.clientName).text(invoice.clientEmail);
    doc.moveDown();

    // Items Table
    const tableTop = doc.y;
    doc.fontSize(9).font('Helvetica-Bold')
       .text('Description', 50, tableTop)
       .text('Price', 300, tableTop, { width: 90, align: 'right' })
       .text('Qty', 390, tableTop, { width: 90, align: 'right' })
       .text('Total', 480, tableTop, { width: 90, align: 'right' });

    doc.moveTo(50, tableTop + 12).lineTo(550, tableTop + 12).stroke();
    doc.font('Helvetica').fontSize(9);

    let y = tableTop + 20;
    invoice.items.forEach((item: any) => {
      doc.text(item.name, 50, y)
         .text(`$${item.price.toFixed(2)}`, 300, y, { width: 90, align: 'right' })
         .text(item.quantity.toString(), 390, y, { width: 90, align: 'right' })
         .text(`$${(item.price * item.quantity).toFixed(2)}`, 480, y, { width: 90, align: 'right' });
      y += 18;
    });

    // Total
    doc.moveTo(50, y).lineTo(550, y).stroke();
    y += 8;
    doc.fontSize(11).font('Helvetica-Bold')
       .text('TOTAL:', 390, y, { width: 90, align: 'right' })
       .text(`$${invoice.total.toFixed(2)}`, 480, y, { width: 90, align: 'right' });

    doc.end();

    return new Promise<NextResponse>((resolve) => {
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(
          new NextResponse(pdfBuffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename="invoice-${invoice._id}.pdf"`,
            },
          })
        );
      });
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
});
