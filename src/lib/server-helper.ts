import { db } from './db';

export const connectToDatabase = async () => {
  try {
    await db.$connect();
  } catch (error) {
    console.error('unable to connect to connect to databse');
    throw new Error('unable to connect to connect to databse');
  }
};
