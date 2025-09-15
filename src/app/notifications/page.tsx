// app/notifications/page.js
import ProtectedRoute from "@/components/ProtectedRoute";
import NotificationsList from "@/components/notifications/NotificationsList";

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <NotificationsList />
    </ProtectedRoute>
  );
}