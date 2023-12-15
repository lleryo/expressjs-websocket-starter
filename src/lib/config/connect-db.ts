import mongoose from 'mongoose';
import { MONGO_URI } from './env';

export const ConnectDatabase = async () => {
    try {
    const connect = await mongoose.connect(String(MONGO_URI));

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
