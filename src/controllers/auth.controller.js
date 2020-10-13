import User from "../models/User";
import jwt from "jsonwebtoken";
import Role from "../models/Role";

export const singIn = async (req, res) => {
  const userFound  = await User.findOne({email: req.body.email}).populate('roles')

  if(!userFound){
    res.status(404).json({message: 'user not found'})
  }

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)

  if(!matchPassword)return res.status(401).json({token: null, message: "invalid password"})

  console.log(userFound)

  const token = jwt.sign({id: userFound._id}, process.env.SECRET, {
    expiresIn: 86400
  })

  res.json({token: token});
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
    // console.log(user.roles)
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
