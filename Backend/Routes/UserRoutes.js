const express = require("express");
const UserSchema = require("../Schemas/UserSchema");
let router = express.Router();
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../Middleware/AuthMiddleware");
const StudentResults = require("../Schemas/StudentResults");
const UnitResults = require("../Schemas/UnitResults");
router.use(express.json());
// ! User Registration Route
router.post("/register", async (req, res) => {
  try {
    const {
      userID,
      userName,
      userEmail,
      userBranch,
      userNumber, 
      userPassword,
      confirmPassword,
    } = req.body;
    let exist = await UserSchema.findOne({ userEmail: userEmail });
    if (exist) {
      // return res.status(400).send("User Already Exist");
      return res.status(400).json({ message: "Email already exists" });
    }
    if (userPassword != confirmPassword) {
      return res.status(400).json({message: "Password MisMacth"});
    }
    let NewUser = new UserSchema({
      userID,
      userName,
      userEmail,
      userBranch,
      userNumber,
      userPassword,
      confirmPassword,
    });
    await NewUser.save();
    let newResult = new StudentResults({
      userID,
      userName,
      userEmail,
      userBranch,
    });
    let newUnitResult = new UnitResults({
      userID,
      userName,
      userEmail,
      userBranch,
    });
    await newUnitResult.save();
    await newResult.save();
    return res.status(200).json({message: "User Registration Completed Succesfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json( {error: "Internal Server Error"});
  }
});
// ! User Login Route

router.post("/login", async (req, res) => {
  try {
    const { userID, userPassword } = req.body;
    let exist = await UserSchema.findOne({ userID: userID });
    if (!exist) {
      return res.status(500).josn({error: "user Not found"});
    }
    if (exist.status == "PENDING") {
      return res.status(400).json({ message: "Account under approval" });
    }
    if (exist.userPassword !== userPassword) {
      return res.status(500).json({message: "Invalid password"});
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
    return res.status(500).json({error: "Internal server Error"});
  }
});
// ! user Dashboard Route
router.get("/dashboard", AuthMiddleware, async (req, res) => {
  try {
    let exist = await UserSchema.findById(req.user.id);
    if (!exist) {
      return res.status(400).json({message: "user not found"});
    }
    return res.send(exist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server Error"});
  }
});
module.exports = router;
