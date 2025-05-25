import mongoose from 'mongoose';

async function connectDB() {
  try {
    if (!process.env.MONGODB_URI || !process.env.MONGODB_URI_LOCAL) {
      throw new Error('MongoDB connection string is not defined');
    }
    await mongoose.connect(
      process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI_LOCAL,
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
export default connectDB;
