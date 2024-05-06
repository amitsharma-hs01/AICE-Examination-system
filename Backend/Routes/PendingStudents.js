const express = require("express");
const UserSchema = require("../Schemas/UserSchema");
let router = express.Router();
router.use(express.json());

router.get("/student/pending", async (req, res) => {
  try {
    const userData = await UserSchema.find({ status: "PENDING" });

    if (userData.length < 1) {
      return res.status(200).json({message: "No Pending Requests Available"});
    }
    return res.send(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server Error"});
  }
});

router.get("/student/approved", async (req, res) => {
  try {
    const userData = await UserSchema.find({ status: "approved" });

    if (userData.length < 1) {
      return res.status(200).json({message: "No Pending Requests Available"});
    }
    return res.send(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "internal server Error"});
  }
});

module.exports = router;
