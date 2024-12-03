const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/feedbackDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  feedback: String,
  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// API Endpoint to Submit Feedback
app.post("/submit-feedback", async (req, res) => {
  const { name, feedback } = req.body;

  try {
    const newFeedback = new Feedback({ name, feedback });
    await newFeedback.save();
    res.status(201).send("Feedback submitted successfully!");
  } catch (err) {
    res.status(500).send("Error saving feedback.");
  }
});

// API Endpoint to Fetch All Feedback
app.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).send("Error fetching feedback.");
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
