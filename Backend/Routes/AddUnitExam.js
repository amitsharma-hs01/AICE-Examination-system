const express = require("express");
const UnitExam = require("../Schemas/UnitExam");
let router = express.Router();
router.use(express.json());

router.post("/add-exam/unit", async (req, res) => {
  try {
    const {
      subjectID,
      subjectName,
      unit,
      Branch,
      TotalQuestions,
      marks,
      time,
      facultyName,
      Questions,
    } = req.body;

    const existingExam = await UnitExam.findOne({ subjectID, unit, Branch });

    if (existingExam) {
      return res.status(400).json({
        message:
          "An exam with the same Subject, Unit, and Branch already exists",
      });
    }

    let Exam = new UnitExam({
      subjectID,
      subjectName,
      unit,
      Branch,
      TotalQuestions,
      marks,
      time,
      facultyName,
      Questions,
    });
    await Exam.save();

    return res
      .status(200)
      .json({ message: "Exam Added Completed Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed To Add Exam" });
  }
});

module.exports = router;
