import Link from 'next/link';

export default function StudentsPage() {
  const sampleStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      courses: ["Introduction to Web Development", "Advanced JavaScript"],
      status: "Active",
      progress: 78
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      courses: ["React Fundamentals", "Database Design"],
      status: "Active",
      progress: 92
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      courses: ["Introduction to Web Development"],
      status: "Active",
      progress: 45
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      courses: ["Advanced JavaScript", "React Fundamentals"],
      status: "Active",
      progress: 67
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@email.com",
      courses: ["Database Design"],
      status: "Active",
      progress: 83
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-500">Quantum</h1>
        </div>
        <nav className="mt-8">
          <Link href="/" className="block px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </div>
          </Link>
          <div className="px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Projects
            </div>
          </div>
          <Link href="/courses" className="block px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              My Courses
            </div>
          </Link>
          <div className="px-6 py-3 bg-orange-500 text-white">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Students
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Students</h1>
              <p className="text-gray-400">Manage student information and progress</p>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Add New Student
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-sm font-medium text-gray-400">Total Students</h3>
              <p className="text-2xl font-bold text-white">{sampleStudents.length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-sm font-medium text-gray-400">Active Students</h3>
              <p className="text-2xl font-bold text-green-500">{sampleStudents.filter(s => s.status === 'Active').length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-sm font-medium text-gray-400">Avg. Progress</h3>
              <p className="text-2xl font-bold text-blue-500">
                {Math.round(sampleStudents.reduce((sum, student) => sum + student.progress, 0) / sampleStudents.length)}%
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-sm font-medium text-gray-400">Total Enrollments</h3>
              <p className="text-2xl font-bold text-white">{sampleStudents.reduce((sum, student) => sum + student.courses.length, 0)}</p>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">All Students</h2>
            </div>
            <div className="divide-y divide-gray-700">
              {sampleStudents.map((student) => (
                <div key={student.id} className="px-6 py-4 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">{student.name}</h3>
                      <p className="text-sm text-gray-400">{student.email}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-400 mr-4">{student.courses.length} courses</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          student.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {student.status}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Enrolled in:</p>
                        <p className="text-sm text-gray-300">{student.courses.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Progress</p>
                        <p className="text-lg font-semibold text-blue-500">{student.progress}%</p>
                      </div>
                      <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
