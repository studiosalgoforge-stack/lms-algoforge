import Link from 'next/link';

export default function TaskBoardPage() {
  const columns = [
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        {
          id: 1,
          title: 'Research FAQ page UX Case study',
          tag: 'UI/UX Design',
          tagColor: 'green',
          image: '💻',
          attachments: 2,
          comments: 5,
          assignees: ['👤', '👤', '👤', '+18']
        },
        {
          id: 2,
          title: 'Research FAQ page UX Case study',
          tag: 'Code Review',
          tagColor: 'red',
          image: '🖥️',
          attachments: 1,
          comments: 3,
          assignees: ['👤', '👤', '👤', '+18']
        }
      ]
    },
    {
      id: 'in-review',
      title: 'In Review',
      tasks: [
        {
          id: 3,
          title: 'Research FAQ page UX Case study',
          tag: 'UI/UX Design',
          tagColor: 'green',
          image: '🏙️',
          attachments: 1,
          comments: 4,
          assignees: ['👤', '👤', '👤', '+18']
        }
      ]
    },
    {
      id: 'completed',
      title: 'Completed',
      tasks: [
        {
          id: 4,
          title: 'Research FAQ page UX Case study',
          tag: 'UI/UX Design',
          tagColor: 'green',
          image: '📱',
          attachments: 1,
          comments: 2,
          assignees: ['👤', '👤', '👤', '+18']
        }
      ]
    },
    {
      id: 'add-new',
      title: 'Add New Task',
      tasks: []
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
          <Link href="/projects" className="block px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Projects
            </div>
          </Link>
          <Link href="/courses" className="block px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              My Courses
            </div>
          </Link>
          <Link href="/faq" className="block px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </div>
          </Link>
          <Link href="/profile" className="block px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </div>
          </Link>
          <div className="px-6 py-3 bg-orange-500 text-white">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Task Board
            </div>
          </div>
          <Link href="/students" className="block px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Students
            </div>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Task Board</h1>
          </div>

          {/* Kanban Board */}
          <div className="flex gap-6 overflow-x-auto">
            {columns.map((column) => (
              <div key={column.id} className="flex-shrink-0 w-80">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">{column.title}</h3>
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {column.tasks.map((task) => (
                      <div key={task.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        <div className="mb-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.tagColor === 'green' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                          }`}>
                            {task.tag}
                          </span>
                        </div>
                        
                        {task.image && (
                          <div className="mb-3 bg-gray-600 rounded h-20 flex items-center justify-center text-2xl">
                            {task.image}
                          </div>
                        )}
                        
                        <h4 className="text-white font-medium mb-3">{task.title}</h4>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center space-x-2">
                            <span>📎 {task.attachments}</span>
                            <span>💬 {task.comments}</span>
                          </div>
                          <div className="flex items-center">
                            {task.assignees.map((assignee, index) => (
                              <div key={index} className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs -ml-1 first:ml-0">
                                {assignee}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    {column.id === 'add-new' && (
                      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 border-dashed">
                        <input
                          type="text"
                          placeholder="Task Title"
                          className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                        />
                        <button className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                          Add New Task
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
