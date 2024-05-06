const express = require("express");
const FacultySchema = require("../Schemas/FacultySchema");
let router = express.Router();
router.use(express.json());

router.patch("/add-subject/faculty/:id", async (req, res) => {
  const facultyId = req.params.id;
  const newSubject = req.body.Subjects[0];
  try {
    const updatedFaculty = await FacultySchema.findOneAndUpdate(
      { _id: facultyId },
      { $push: { Subjects: newSubject } },
      { new: true }
    );

    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty member not found" });
    }
    res.json(updatedFaculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id/subjects", async (req, res) => {
  try {
    const faculty = await FacultySchema.findById(req.params.id).populate(
      "Subjects"
    );

    const subjectList = faculty.Subjects.map((subject) => ({
      subjectID: subject.SubjectID,
      subjectName: subject.SubjectName,
    }));

    res.json({ subjectList });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
