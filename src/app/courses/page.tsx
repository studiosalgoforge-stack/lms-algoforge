const courses = [
  {
    title: "Basics of Angular",
    description: "Introductory course for Angular and framework basics in web development.",
    imageUrl: "https://i.imgur.com/eBw2334.jpg",
    rating: 4.4,
    reviews: "1.23k",
    duration: "30 minutes",
  },
  {
    title: "Basics of Angular",
    description: "Introductory course for Angular and framework basics in web development.",
    imageUrl: "https://i.imgur.com/2KTk64D.jpg",
    rating: 4.4,
    reviews: "1.23k",
    duration: "30 minutes",
  },
];

const CourseCard = ({ course }: any) => (
  <div className="bg-secondary-dark rounded-2xl overflow-hidden">
    <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
      <p className="text-gray-400 mb-4 text-sm">{course.description}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-yellow-400">
          <span>★</span>
          <span>{course.rating}</span>
          <span className="text-gray-400">({course.reviews})</span>
        </div>
        <span className="text-gray-400">{course.duration}</span>
      </div>
    </div>
  </div>
);


export default function CoursesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Courses</h1>
          <p className="text-gray-400">Total 6 courses you have purchased</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-secondary-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-orange">
            <option>All Courses</option>
          </select>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Hide completed</span>
            <div className="w-12 h-6 bg-primary-dark rounded-full p-1 flex items-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}