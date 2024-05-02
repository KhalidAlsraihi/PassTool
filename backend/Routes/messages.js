import express from "express";
import {
  getAllMessages,
  postMessage,
  deleteMessage,
} from "../Controlers/messagecontroler.js";

const router = express.Router();

// Get all messages
router.get("/", getAllMessages);

// Post a new message
router.post("/", postMessage);

// Delete a message by ID
router.delete("/:id", deleteMessage);

export default router;
