import mongoose, { Schema, model, models } from 'mongoose';
import { IClient } from '@/types';

const ClientSchema = new Schema<IClient>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
  },
  { timestamps: true }
);

ClientSchema.index({ userId: 1, email: 1 }, { unique: true });

const Client = models.Client || model<IClient>('Client', ClientSchema);

export default Client;
