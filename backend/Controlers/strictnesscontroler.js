import Strictness from "../Models/strictness.js";

export const getStrictness = async (req, res) => {
  try {
    const strictness = await Strictness.findOne();
    res
      .status(200)
      .json({ message: "Strictness retrieved successfully", strictness });
  } catch (error) {
    res.status(404).json({ message: "Error retrieving strictness" });
  }
};

export const postStrictness = async (req, res) => {
  const { strength } = req.body;

  try {
    // Find the existing strictness document
    const existingStrictness = await Strictness.findOne();

    // If it exists, update the level; otherwise, create a new document
    if (existingStrictness) {
      existingStrictness.level = strength;
      await existingStrictness.save();
      res.status(200).json({
        message: "Strictness updated successfully",
        existingStrictness,
      });
    } else {
      const newStrictness = new Strictness({
        level: strength,
      });
      await newStrictness.save();
      res
        .status(201)
        .json({ message: "Strictness posted successfully", newStrictness });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error posting/updating strictness", error });
  }
};
