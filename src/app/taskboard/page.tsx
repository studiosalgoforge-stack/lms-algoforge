// Main content for the taskboard page
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
  );
}