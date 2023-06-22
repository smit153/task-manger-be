const express = require("express");

const router = express.Router();

const {
  getAllTasks,
  getTask,
  updateTask,
  createTask,
  deleteTask,
} = require("../controllers/tasks.js");

router.get("/all", getAllTasks);
router.get("/:id", getTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);
router.post("/create", createTask);

module.exports = router;
