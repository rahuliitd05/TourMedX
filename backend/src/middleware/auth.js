import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';
import Admin from '../models/Admin.js';

export function generateToken(adminId) {
  return jwt.sign({ adminId }, process.env.JWT_SECRET || 'tourmedx-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

export async function protect(request, response, next) {
  const header = request.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || 'tourmedx-secret'
    );
    const admin = await Admin.findById(payload.adminId).select('-password');

    if (!admin) {
      return next(new ApiError(401, 'Invalid authentication token'));
    }

    request.user = admin;
    return next();
  } catch (_error) {
    return next(new ApiError(401, 'Authentication failed'));
  }
}
