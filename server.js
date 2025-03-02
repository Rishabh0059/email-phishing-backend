import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  UserID: String,
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.post("/api/recovery", async (req, res) => {
  try {
    const { UserID, name, email } = req.body;

    if (!UserID || !name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new User({ UserID, name, email });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
