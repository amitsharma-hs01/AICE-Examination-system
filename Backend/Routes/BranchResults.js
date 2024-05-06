const express = require("express");
const StudentResults = require("../Schemas/StudentResults");
let router = express.Router();
router.use(express.json());

router.get("/results/:branch", async (req, res) => {
  try {
    const { branch } = req.params;
    const results = await StudentResults.find({ userBranch: branch });
    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:studentID/:branch/:subject", async (req, res) => {
  try {
    const { branch, studentID, subject } = req.params;
    let result;
    if (subject === "all") {
      result = await StudentResults.find(
        {
          userBranch: branch,
          userID: studentID,
        },
        { Results: 1, _id: 0 }
      );
    } else {
      result = await StudentResults.find(
        {
          userBranch: branch,
          userID: studentID,
          "Results.SubjectName": subject,
        },
        { "Results.$": 1, _id: 0 }
      );
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
