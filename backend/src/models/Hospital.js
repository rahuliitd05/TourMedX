import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, default: '' },
    images: [{ type: String, trim: true }],
    about: { type: String, default: '' },
    departments: [{ type: String, trim: true }],
    services: [{ type: String, trim: true }],
    facilities: [{ type: String, trim: true }],
    location: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Hospital', hospitalSchema);
