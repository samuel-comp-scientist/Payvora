import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'payvora_secret_key_2026';

export function signJWT(payload: { userId: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch {
    return null;
  }
}
