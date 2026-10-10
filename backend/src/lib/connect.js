import { connect } from "mongoose";
export const connectDB = async () => {
  try {
    const result = await connect(process.env.DATABASE_URL);
    console.log("Connected to the database: ", result.connection.host);
  } catch (error) {
    console.log(error);
  }
};
