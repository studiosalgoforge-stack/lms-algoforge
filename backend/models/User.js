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
<<<<<<< HEAD

    // ✅ Moved courseProgress here
    courseProgress: [
      {
        courseKey: { type: String, required: true },        // e.g. "Data-Science"
        completedTopics: { type: [String], default: [] },   // e.g. ["0","0.1","0.2"]
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // options object
);

=======
    
  },

  { timestamps: true }
);
>>>>>>> 554c5343c23f350e1a8699831b9f7e0b95b864ba

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

