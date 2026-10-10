import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
  const {JWT_SECRET } =process.env
  if(!JWT_SECRET){
    throw new Error("JWT secret not found")
  }
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    httpOnly: true, 
    secure: process.env.NODE_ENV != "development",
  });
  return token
};
