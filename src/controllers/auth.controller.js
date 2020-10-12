import User from "../models/User";
import jwt from "jsonwebtoken";
import Role from "../models/Role";

export const singIn = async (req, res) => {
  res.json("hiu");
};
export const singUp = async (req, res) => {
  // const userFound = User.find({email})

  const { username, email, password, roles } = req.body;
  // console.log(req.body)

  const user = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map((r) => r._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    user.roles = [role._id];
  }

  const savedUser = await user.save();
  console.log(savedUser);

  const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};
