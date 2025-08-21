export default function DashboardPage() {
  return (
    <div className="px-4 md:px-8"> {/* add padding for mobile */}
      {/* Banner Image Section */}
      <div className="relative w-full h-40 md:h-48 mb-6">
        <img
          src="/Dash-img.jpg"
          alt="Dashboard Banner"
          className="w-full h-full object-cover rounded-lg"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 opacity-70 rounded-lg" />
        {/* Heading */}
        <h1 className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-bold text-white drop-shadow-lg text-center px-2">
          Welcome to Dashboard
        </h1>
      </div>
    </div>
  );
}
