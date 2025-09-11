// controllers/progressController.js
import User from "../models/User.js";

/**
 * GET /api/progress?courseKey=Data-Science
 * Returns the completedTopics array for the logged in user and course
 */
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user?._id; 
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId).lean();
    if (!user) return res.status(200).json({ courseProgress: {} });

    // Convert array to object for frontend
    const progressObj = {};
    (user.courseProgress || []).forEach((entry) => {
      progressObj[entry.courseKey] = entry.completedTopics || [];
    });

    return res.status(200).json({ courseProgress: progressObj });
  } catch (err) {
    console.error("getUserProgress error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};




/**
 * POST /api/progress
 * Body: { courseKey: "Data-Science", topicPath: "0.3" }
 * Adds topicPath to user's completedTopics (idempotent)
 */
export const addCourseProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseKey, topicPath } = req.body;
    if (!courseKey || !topicPath) {
      return res.status(400).json({ message: "courseKey and topicPath required" });
    }

    // Basic validation on topicPath format: "0" or "0.1.2" etc.
    if (!/^\d+(\.\d+)*$/.test(topicPath)) {
      return res.status(400).json({ message: "Invalid topicPath format" });
    }

    // Try to add to an existing courseProgress entry
    const updateResult = await User.updateOne(
      { _id: userId, "courseProgress.courseKey": courseKey },
      {
        $addToSet: { "courseProgress.$.completedTopics": topicPath }, // idempotent
        $set: { "courseProgress.$.updatedAt": new Date() },
      }
    );

    // If there was no existing array element (matchedCount === 0) push a new entry
    if (updateResult.matchedCount === 0) {
      await User.updateOne(
        { _id: userId },
        {
          $push: {
            courseProgress: { courseKey, completedTopics: [topicPath], updatedAt: new Date() },
          },
        }
      );
    }

    // Return the up-to-date list back to the client
    const user = await User.findById(userId).lean();
    const entry = (user.courseProgress || []).find((c) => c.courseKey === courseKey) || { completedTopics: [] };
    return res.status(200).json({ completedTopics: entry.completedTopics });
  } catch (err) {
    console.error("addCourseProgress error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/progress/migrate
 * Body: { allProgress: { "Data-Science": ["0","0.1"], ... } }
 * Merge localStorage progress into user's server progress (idempotent)
 */
export const migrateProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { allProgress } = req.body;
    if (!allProgress || typeof allProgress !== "object") {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    for (const [courseKey, paths] of Object.entries(allProgress)) {
      if (!Array.isArray(paths)) continue;
      const entry = user.courseProgress.find((c) => c.courseKey === courseKey);
      if (!entry) {
        user.courseProgress.push({ courseKey, completedTopics: Array.from(new Set(paths)), updatedAt: new Date() });
      } else {
        entry.completedTopics = Array.from(new Set([...(entry.completedTopics || []), ...paths]));
        entry.updatedAt = new Date();
      }
    }
    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("migrateProgress error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
