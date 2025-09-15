// app/admin/notifications/page.tsx or pages/admin/notifications.tsx

import ProtectedRoute from "@/components/ProtectedRoute";
import CreateNotificationForm from "@/components/notifications/CreateNotificationForm";

export default function AdminNotificationPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Admin Dashboard
        </h1>
        <CreateNotificationForm />
      </div>
    </ProtectedRoute>
  );
}