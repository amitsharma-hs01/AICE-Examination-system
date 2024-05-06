const express = require("express");
const FacultySchema = require("../Schemas/FacultySchema");
let router = express.Router();
router.use(express.json());

router.get("/pending", async (req, res) => {
  try {
    const facultyData = await FacultySchema.find({ status: "PENDING" });

    if (facultyData.length < 1) {
      return res.status(200).json({message: "No Pending Requests Available"});
    }
    return res.send(facultyData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "internal server Error"});
  }
});

router.get("/approved", async (req, res) => {
  try {
    const facultyData = await FacultySchema.find({ status: "approved" });

    if (facultyData.length < 1) {
      return res.status(200).json({message: "No Data Found"});
    }
    return res.send(facultyData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server Error"});
  }
});

module.exports = router;
