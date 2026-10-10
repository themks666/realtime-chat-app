import { connect } from "mongoose";
export const connectDB = async () => {
  try {
    const {DATABASE_URL} = process.env
    if(!DATABASE_URL) {
      throw new Error("NO database url found")
    }
    const result = await connect(DATABASE_URL);
    console.log("Connected to the database: ", result.connection.host);
  } catch (error) {
    console.log(error);
  }
};
