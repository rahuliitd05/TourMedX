import mongoose from 'mongoose';

export async function connectDatabase() {
  const connectionString =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tourmedx';

  await mongoose.connect(connectionString);
}
