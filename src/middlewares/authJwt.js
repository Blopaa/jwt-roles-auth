import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    console.log(token);
  
    if (!token) return res.status(403).json({ message: "no token provided" });
  
    const decoded = jwt.verify(token, process.env.SECRET);
  
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) return res.status(404).json({ message: "user not found" });
  
    next();
  } catch (error) {
      return res.status(404).json({message: 'unathorized'})
  }
};
