import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    quote: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 }
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);
