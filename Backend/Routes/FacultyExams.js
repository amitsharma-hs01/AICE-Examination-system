const express = require("express");
const ExamSchema = require("../Schemas/ExamSchema");
const StudentResults = require("../Schemas/StudentResults");
let router = express.Router();
router.use(express.json());

router.get("/exams/:facultyName", async (req, res) => {
  try {
    const { facultyName } = req.params;
    const exams = await ExamSchema.find({ facultyName });
    return res.send(exams);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "No Exams Conducted"});
  }
});

router.get("/result/:subjectID/:facultyName", async (req, res) => {
  try {
    const { subjectID, facultyName } = req.params;

    const results = await StudentResults.find(
      {
        "Results.SubjectID": subjectID,
        "Results.facultyName": facultyName,
      },
      { "Results.$": 1 }
    );
    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.json({error: "Server Error"});
  }
});

module.exports = router;
