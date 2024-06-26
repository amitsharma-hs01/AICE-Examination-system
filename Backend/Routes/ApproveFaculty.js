const express = require("express");
const FacultySchema = require("../Schemas/FacultySchema");
let router = express.Router();
router.use(express.json());

router.put("/admin/:id/approve/faculty", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await FacultySchema.findByIdAndUpdate(id, {
      status: "approved",
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to approve user" });
  }
});

router.put("/admin/:id/reject/faculty", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await FacultySchema.findByIdAndUpdate(id, {
      status: "Rejected",
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to approve user" });
  }
});



module.exports = router;
