import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '@/types';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    businessName: { type: String, default: '' },
    logo: { type: String, default: '' },
    plan: { type: String, enum: ['free', 'pro'], default: 'free' },
    subscriptionStatus: { type: String, enum: ['trial', 'active', 'inactive'], default: 'trial' },
    subscriptionExpiresAt: { type: Date },
    trialStartedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model<IUser>('User', UserSchema);

export default User;
