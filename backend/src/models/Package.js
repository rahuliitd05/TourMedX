import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    packageName: { type: String, required: true, trim: true },
    duration: { type: String, default: '' },
    itinerary: [{ type: String, trim: true }],
    includedServices: [{ type: String, trim: true }],
    gallery: [{ type: String, trim: true }],
    price: { type: String, default: '' },
    bookingUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Package', packageSchema);
