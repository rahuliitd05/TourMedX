import Admin from '../models/Admin.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { generateToken } from '../middleware/auth.js';

export const login = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  const admin = await Admin.findOne({
    email: String(email || '').toLowerCase()
  }).select('+password');

  if (!admin) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const passwordMatches = await admin.comparePassword(password);

  if (!passwordMatches) {
    throw new ApiError(401, 'Invalid email or password');
  }

  response.json({
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  });
});

export const me = asyncHandler(async (request, response) => {
  response.json({ admin: request.user });
});
