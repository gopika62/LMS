import { JsonWebTokenError } from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'; // Make sure this is installed: npm install bcryptjs


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid Credentials" });
    }

    const token = JsonWebTokenError.sign({_id, role: user.role})
       process.env.JWT_KEY, {expiresIn: "10d"}

       res.status(200).json({success: true,
       token,
       user: {_id: user._id, name: user.name, role: user.role }})

    // If all good, return success
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name // Add other fields if needed
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export { login };
