import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  console.log(email);
  try {
    const existingUser = await User.find({ email });
    console.log(existingUser);
    if (existingUser.length !== 0) {
      return res.status(400).json({ message: "email is already exist" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passowrd does not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    console.log(result);
    const token = await jwt.sign(
      { email: result.email, id: result._id },
      "Dark",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  console.log(email);
  try {
    const existingUser = await User.findOne({ email });
    // console.log(existingUser.password);
    if (!existingUser) {
      return res.status(400).json({ message: "No user with this email" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid credential" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "Dark",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
