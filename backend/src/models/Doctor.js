import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    qualifications: { type: String, default: '' },
    certifications: { type: String, default: '' },
    experience: { type: String, default: '' },
    biography: { type: String, default: '' },
    procedures: [{ type: String, trim: true }],
    hospitals: [{ type: String, trim: true }],
    languages: [{ type: String, trim: true }],
    photo: { type: String, default: '' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
