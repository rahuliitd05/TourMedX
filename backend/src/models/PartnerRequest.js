import mongoose from 'mongoose';

const partnerRequestSchema = new mongoose.Schema(
  {
    partnerType: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'in-review', 'approved', 'rejected'],
      default: 'new'
    }
  },
  { timestamps: true }
);

export default mongoose.model('PartnerRequest', partnerRequestSchema);
