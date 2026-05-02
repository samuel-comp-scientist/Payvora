declare module 'pdfkit' {
  import { EventEmitter } from 'events';
  
  interface PDFDocumentOptions {
    margin?: number;
    size?: string;
    [key: string]: any;
  }
  
  class PDFDocument extends EventEmitter {
    constructor(options?: PDFDocumentOptions);
    on(event: string, listener: Function): this;
    end(): void;
    text(text: string, options?: any): this;
    text(text: string, x?: number, y?: number, options?: any): this;
    moveDown(lines?: number): this;
    moveTo(x: number, y: number): this;
    lineTo(x: number, y: number): this;
    stroke(): this;
    font(fontName: string): this;
    fontSize(size: number): this;
    readonly y: number;
    readonly font: any;
  }
  
  export = PDFDocument;
}
