import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    altText: { type: String, default: '' },
    fileUrl: { type: String, required: true },
    mimeType: { type: String, default: '' },
    size: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);
