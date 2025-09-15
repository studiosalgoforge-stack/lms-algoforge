// models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track which users have read it
  targetAudience: { type: String, enum: ['all', 'user'], default: 'all' },
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;