import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-black p-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Welcome and Chart */}
        <div className="flex flex-col md:flex-row md:space-x-8 mb-8">
          <div className="flex-1 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2">Hello Maietry <span className="inline-block">👋</span></h1>
            <p className="text-lg text-[#A0AEC0]">Let's learn something new today!</p>
            <div className="flex space-x-8 mt-8">
              <div className="flex flex-col items-center">
                <div className="bg-[#232533] rounded-lg p-4">
                  <span className="block text-green-400 text-2xl font-bold">34h</span>
                </div>
                <span className="text-[#A0AEC0] mt-2">Hours Spent</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#232533] rounded-lg p-4">
                  <span className="block text-orange-400 text-2xl font-bold">82%</span>
                </div>
                <span className="text-[#A0AEC0] mt-2">Test Results</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#232533] rounded-lg p-4">
                  <span className="block text-blue-400 text-2xl font-bold">15</span>
                </div>
                <span className="text-[#A0AEC0] mt-2">Course Completed</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {/* Placeholder for Chart */}
            <div className="w-64 h-64 bg-[#232533] rounded-full flex items-center justify-center">
              <span className="text-green-400 text-4xl font-bold">75%</span>
            </div>
          </div>
        </div>

        {/* Course Cards Row */}
        <div className="bg-[#232533] rounded-2xl p-8 flex space-x-8 mb-8">
          <div className="flex-1">
            <div className="rounded-2xl border-4 border-[#1DA1F2] bg-[#1DA1F2] p-6 text-white flex flex-col items-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">😺</span>
              </div>
              <h3 className="text-xl font-bold mb-2">HTML CSS Basics</h3>
              <div className="flex justify-center space-x-4 text-sm bg-[#232533] rounded-lg px-4 py-2 mt-2">
                <span>24</span>
                <span>24</span>
                <span>24</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl border-4 border-[#FF9900] bg-[#FF9900] p-6 text-white flex flex-col items-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">⬆️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Branding Design</h3>
              <div className="flex justify-center space-x-4 text-sm bg-[#232533] rounded-lg px-4 py-2 mt-2">
                <span>24</span>
                <span>24</span>
                <span>24</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl border-4 border-[#00D97E] bg-[#00D97E] p-6 text-white flex flex-col items-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Graphic Design</h3>
              <div className="flex justify-center space-x-4 text-sm bg-[#232533] rounded-lg px-4 py-2 mt-2">
                <span>24</span>
                <span>24</span>
                <span>24</span>
              </div>
            </div>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Statistics Widget */}
          <div className="bg-[#232533] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">Statistics</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">🟦</span>
                <span className="text-white">Absence</span>
                <span className="ml-auto text-white">10%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">✅</span>
                <span className="text-white">Tasks & Exam</span>
                <span className="ml-auto text-white">60%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white">⏰</span>
                <span className="text-white">Preparation</span>
                <span className="ml-auto text-white">80%</span>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center border-8 border-green-500">
                <span className="text-3xl text-white font-bold">75%</span>
              </div>
            </div>
          </div>
          {/* Performance Widget */}
          <div className="bg-[#232533] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">Performance</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-green-400 font-semibold">Point Progress</span>
              <select className="bg-[#232533] border border-gray-600 text-white rounded px-2 py-1">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-20 flex items-end justify-center">
                <span className="text-3xl text-orange-400 font-bold">8.966</span>
              </div>
              <span className="text-white mt-2">Your Point</span>
            </div>
          </div>
          {/* Profile Widget */}
          <div className="bg-[#232533] rounded-2xl p-6 flex flex-col items-center">
            <h2 className="text-white text-xl font-bold mb-4">Profile</h2>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-20 h-20 rounded-full mb-2" />
            <span className="text-white font-semibold">Devon Lane</span>
            <span className="text-gray-400">College Student</span>
            <div className="w-full mt-6">
              <div className="bg-[#232533] rounded-xl p-4 flex flex-col items-center">
                <span className="text-white">August 2025</span>
                <div className="flex justify-between w-full mt-2 text-gray-400">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="flex flex-wrap justify-between w-full mt-2">
                  {/* Calendar days would go here */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Task Progress, UI/UX, To do List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Task Progress */}
          <div className="bg-[#232533] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">Task Progress</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white">Web Programming</span>
                <span className="text-green-400">8/10</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full mb-2">
                <div className="h-2 bg-green-400 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Data and Structures</span>
                <span className="text-green-400">6/15</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full mb-2">
                <div className="h-2 bg-green-400 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Artificial Intelligence</span>
                <span className="text-green-400">17/20</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full mb-2">
                <div className="h-2 bg-green-400 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">UI/UX</span>
                <span className="text-green-400">19/20</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full mb-2">
                <div className="h-2 bg-green-400 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Digital Marketing</span>
                <span className="text-green-400">13/20</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div className="h-2 bg-green-400 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          {/* UI/UX Introduction */}
          <div className="bg-[#232533] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-white text-xl font-bold mb-4">UI/UX Introduction</h2>
              <div className="flex items-center mb-2">
                <span className="text-gray-400 mr-2">Today</span>
                <span className="text-gray-400">Monday, 28 June 2021</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-400 mr-2">02.00 - 03.30 PM</span>
                <span className="text-gray-400">Mr. Mark Jefferson</span>
                <span className="text-gray-400 ml-2">Zoom</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-400">Students:</span>
                <span className="ml-2 text-white">+25 people joined the class</span>
              </div>
            </div>
            <button className="mt-6 bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition-colors">Join the class</button>
          </div>
          {/* To do List */}
          <div className="bg-[#232533] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">To do List</h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b border-gray-700 pb-2">
                <span className="text-white">Deploy with Firebase</span>
                <span className="text-gray-400 text-sm">Tuesday, 29 June 2021</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-700 pb-2">
                <span className="text-white">Push on Github</span>
                <span className="text-gray-400 text-sm">Monday, 28 June 2021</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-700 pb-2">
                <span className="text-white">Design layout homepage</span>
                <span className="text-gray-400 text-sm">Friday, 25 June 2021</span>
          </li>
              <li className="flex items-center justify-between">
                <span className="text-white">Deploy with Firebase</span>
                <span className="text-gray-400 text-sm">Friday, 25 June 2021</span>
          </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}