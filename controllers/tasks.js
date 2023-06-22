const express = require("express");
const Task = require("../models/task");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific task by ID
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title, description);
    const task = new Task({ title, description });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllTasks, getTask, deleteTask, updateTask, createTask };
