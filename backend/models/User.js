import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
    avatar: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, default: null },
    passwordChangedAt: { type: Date },

    // ✅ Moved courseProgress here
    courseProgress: [
      {
        courseKey: { type: String, required: true },        // e.g. "Data-Science"
        completedTopics: { type: [String], default: [] },   // e.g. ["0","0.1","0.2"]
        updatedAt: { type: Date, default: Date.now },
      },
    ],
     // ✅ Quiz Progress (overwrite on restart)
    quizProgress: [
      {
        quizId: { type: String, required: true },  // unique quiz identifier
        score: { type: Number, default: 0 },
        correctAnswers: { type: Number, default: 0 },
        totalQuestions: { type: Number, default: 0 },
        completedAt: { type: Date, default: Date.now },
      },
    ],

    // ✅ Video Progress (per course/video)
    videoProgress: [
      {
        videoId: { type: String, required: true },
        watchedDuration: { type: Number, default: 0 }, // in seconds
        totalDuration: { type: Number, default: 0 },
        lastWatchedAt: { type: Date, default: Date.now },
      },
    ],

    // ✅ Study Time Tracking
    studyTime: [
      {
        courseKey: { type: String, required: true },
        totalMinutes: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // options object
);


// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
   this.passwordChangedAt = Date.now(); 
  next();
});

// Compare password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

