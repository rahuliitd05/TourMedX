import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { _id: false }
);

const treatmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, default: '' },
    overview: { type: String, default: '' },
    benefits: [{ type: String, trim: true }],
    procedure: { type: String, default: '' },
    recovery: { type: String, default: '' },
    faqs: [faqSchema],
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Treatment', treatmentSchema);
