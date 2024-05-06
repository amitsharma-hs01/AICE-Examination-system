const express = require("express");
const FacultySchema = require("../Schemas/FacultySchema");
let router = express.Router();
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../Middleware/AuthMiddleware");
router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const {
      facultyName,
      facultyNumber,
      facultyEmail,
      password,
      confirmPassword,
    } = req.body;
    let exist = await FacultySchema.findOne({ facultyEmail: facultyEmail });
    if (exist) {
      return res.status(400).json({ message: "Faculty Already Exist" });
    }
    if (password != confirmPassword) {
      return res.status(400).json({ message: "Password Mismacth" });
    }
    let newFaculty = new FacultySchema({
      facultyName,
      facultyNumber,
      facultyEmail,
      password,
      confirmPassword,
    });
    await newFaculty.save();
   return res
      .status(200)
      .json({ message: "Faculty Registration Completed Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { facultyEmail, password } = req.body;
    let exist = await FacultySchema.findOne({ facultyEmail: facultyEmail });
    if (!exist) {
      return res.status(500).json({message: "User not found"});
    }
    if (exist.status == "PENDING") {
      return res.status(400).json({ message: "Account under approval" });
    }
    if (exist.password !== password) {
      return res.status(500).json({ message: "Invalid Password" });
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecure", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error"});
  }
});

router.get("/dashboard", AuthMiddleware, async (req, res) => {
  try {
    let exist = await FacultySchema.findById(req.user.id);
    if (!exist) {
      return res.status(400).json({message: "User not found"});
    }
    return res.send(exist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error"});
  }
});
module.exports = router;
