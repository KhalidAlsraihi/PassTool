import mongoose from "mongoose";
const { Schema } = mongoose;

const strictnessSchema = new Schema({
  level: {
    type: String,
    required: true,
    unique: true,
    enum: ["medium", "strong", "very_strong"],
  },
});

const Strictness = mongoose.model("Strictness", strictnessSchema);
export default Strictness;
