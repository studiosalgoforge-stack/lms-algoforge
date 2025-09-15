// controllers/notificationController.js
import Notification from '../models/Notification.js';

export const createNotification = async (req, res) => {
  // This route would be restricted to admin/super-user
  try {
    const { message } = req.body;
    const newNotification = new Notification({ message , targetAudience: 'all'});
    await newNotification.save();
    res.status(201).json({ message: 'Notification sent to all users.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({
      $or: [
        { targetAudience: 'all', readBy: { $ne: userId } },
        { targetUser: userId, readBy: { $ne: userId } }
      ]
    }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};