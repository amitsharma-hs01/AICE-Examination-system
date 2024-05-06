const express = require("express");
const FeedbackSchema = require("../Schemas/FeedbackSchema");
let router = express.Router();
router.use(express.json());

router.post("/post/feedback", async (req, res) => {
  try {
    const { facultyName, feedback } = req.body;

    let newFeedback = new FeedbackSchema({
      facultyName,
      feedback,
    });
    await newFeedback.save();

    return res.status(200).josn({ message: "Feedback Submitted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error"});
  }
});

router.get("/feedback/:facultyName", async (req, res) => {
  const facultyName = req.params.facultyName;
  try {
    const facultyFeedback = await FeedbackSchema.find({
      facultyName: facultyName,
    });
    return res.json(facultyFeedback);
  } catch (error) {
    return res.status(500).json({error: "Server Error"});
  }
});

module.exports = router;
