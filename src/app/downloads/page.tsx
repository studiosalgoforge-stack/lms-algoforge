// Main content for the downloads page
export default function DownloadsPage() {
  const downloads = [
    {
      id: 1,
      name: "Course Materials.zip",
      type: "ZIP",
      size: "2.4 MB",
      date: "2024-01-15",
      status: "Completed"
    },
    {
      id: 2,
      name: "Lecture Notes.pdf",
      type: "PDF",
      size: "1.8 MB",
      date: "2024-01-14",
      status: "Completed"
    },
    {
      id: 3,
      name: "Assignment Template.docx",
      type: "DOCX",
      size: "456 KB",
      date: "2024-01-13",
      status: "Completed"
    },
    {
      id: 4,
      name: "Video Tutorial.mp4",
      type: "MP4",
      size: "156 MB",
      date: "2024-01-12",
      status: "In Progress"
    },
    {
      id: 5,
      name: "Study Guide.pdf",
      type: "PDF",
      size: "3.2 MB",
      date: "2024-01-11",
      status: "Completed"
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Downloads</h1>
        <p className="text-gray-400 mt-2">Manage your downloaded files and resources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400">Total Downloads</h3>
          <p className="text-2xl font-bold text-white">{downloads.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400">Completed</h3>
          <p className="text-2xl font-bold text-green-500">{downloads.filter(d => d.status === 'Completed').length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400">In Progress</h3>
          <p className="text-2xl font-bold text-blue-500">{downloads.filter(d => d.status === 'In Progress').length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400">Total Size</h3>
          <p className="text-2xl font-bold text-white">164.2 MB</p>
        </div>
      </div>

      {/* Downloads List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Download History</h2>
        </div>
        <div className="divide-y divide-gray-700">
          {downloads.map((download) => (
            <div key={download.id} className="px-6 py-4 hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{download.type}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{download.name}</h3>
                    <p className="text-sm text-gray-400">{download.size} • {download.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    download.status === 'Completed' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'
                  }`}>
                    {download.status}
                  </span>
                  <button className="text-orange-500 hover:text-orange-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}