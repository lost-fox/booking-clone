import config from "config";
import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
const router = Router();

// /register

router.post(
  "/register",
  [
    check("email", "Error in email").isEmail(),
    check("password", "Error in password").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), massage: "Error in data" });
      }

      const { email, password, name, phone, surname } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ massage: "Person exist!" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword, name, phone, surname });

      await user.save();

      res.status(201).json({ message: "creating user accounts" });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
);

// /login

router.post(
  "/login",
  [
    check("email", "Please enter a valid email address")
      .normalizeEmail()
      .isEmail(),
    check("password", "Please enter a valid password").exists(),
  ],
  async (req: Request, res: Response) => {   
    try {       
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), massage: "ko-ko-ko-ko" });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ massage: "User is not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrond password. Try again" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Error. Try again" });
    }
  }
);

export default router;
