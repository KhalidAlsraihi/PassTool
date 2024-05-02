import express from "express";
import {
  getStrictness,
  postStrictness,
} from "../Controlers/strictnesscontroler.js";

const router = express.Router();

// Get strictness
router.get("/", getStrictness);

// Post strictness
router.post("/", postStrictness);

export default router;
