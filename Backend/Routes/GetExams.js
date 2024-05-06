const express = require("express");
const ExamSchema = require("../Schemas/ExamSchema");
let router = express.Router();
router.use(express.json());

router.get("/get-exams/:Branch", async (req, res) => {
  try {
    const { Branch } = req.params;
    const AvailExams = await ExamSchema.find({ Branch: Branch });
    if (!AvailExams) {
      return res.status(200).json({ message: "No Exam Available" });
    }
    return res.send(AvailExams);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error: "No Exam Available"});
  }
});

router.get("/exam/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ExamData = await ExamSchema.findById(id);
    if (!ExamData) {
      return res.status(200).json({message: "No Exam Available"});
    }
    return res.send(ExamData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/exams/:Branch/subjects", async (req, res) => {
  try {
    const subjects = await ExamSchema.find().distinct("subjectName");
    return res.json(subjects);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({error: "Server Error" });
  }
});

module.exports = router;
