const express = require("express");
const FeedbackSchema = require("../Schemas/FeedbackSchema");
let router = express.Router();
router.use(express.json());

router.post("/post/feedback", async (req, res) => {
  try {
    const { facultyName, feedback, facultyId } = req.body;

    let newFeedback = new FeedbackSchema({
      facultyName,
      feedback,
      facultyId,
    });
    await newFeedback.save();

    return res.status(200).json({ message: "Feedback Submitted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error"});
  }
});

// router.get("/feedback/:facultyId", async (req, res) => {
//   const facultyID = req.params.facultyId;
//   try {
//     const facultyFeedback = await FeedbackSchema.find({
//       facultyId: facultyID,
//     });
//     return res.json(facultyFeedback);
//   } catch (error) {
//     return res.status(500).json({error: "Server Error"});
//   }
// });

router.post("/feedback", async (req, res) => {
  const { facultyId } = req.body;
  try {
    console.log("collected ---<",facultyId)
    const facultyFeedback = await FeedbackSchema.find({ facultyId });
    console.log(facultyFeedback)
    return res.json(facultyFeedback);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
