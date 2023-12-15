import dotenv from 'dotenv';

// Enable us to use environment variable throughout our application
dotenv.config({ path: '.env' });


export const MONGO_URI = process.env.MONGO_URI;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;