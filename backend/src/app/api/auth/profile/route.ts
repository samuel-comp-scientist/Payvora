import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import db from '@/lib/db';
import User from '@/models/User';
import { isTrialExpired } from '@/utils/subscription';

export const GET = withAuth(async (req: any) => {
  try {
    await db();
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const trialExpired = isTrialExpired(user);
    return NextResponse.json({
      id: user._id,
      email: user.email,
      businessName: user.businessName,
      logo: user.logo,
      plan: user.plan,
      subscriptionStatus: user.subscriptionStatus,
      trialExpired,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

export const PUT = withAuth(async (req: any) => {
  try {
    await db();
    const updates = await req.json();
    const { businessName, logo } = updates;

    const update: any = {};
    if (businessName !== undefined) update.businessName = businessName;
    if (logo !== undefined) update.logo = logo;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      update,
      { new: true }
    ).select('-password');

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
