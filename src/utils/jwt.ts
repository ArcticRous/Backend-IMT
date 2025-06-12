import { sign, verify, Secret } from 'jsonwebtoken';

const SECRET_KEY: Secret = 'your_secret_key'; // Replace with your actual secret key

export const generateToken = (
  payload: object,
  expiresIn: string = '1h'
): string => {
  return sign(payload, SECRET_KEY, { expiresIn } as any);
};

export const verifyToken = (token: string): object | string => {
  try {
    return verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid token');
  }
};



