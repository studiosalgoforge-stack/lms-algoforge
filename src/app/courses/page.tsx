const courses = [
  {
    title: "Basics of Angular",
    description: "Introductory course for Angular and framework basics in web development.",
    rating: 4.4,
    reviews: "1.23k",
    duration: "30 minutes",
    progress:20,
    imageUrl:  "https://angular.io/assets/images/logos/angular/angular.svg" ,
  },
  {
    title: "Data Science and AI",
    description: "Introductory course for ML and Data Science",
    rating: 4.4,
    reviews: "1.23k",
    duration: "30 minutes",
    progress:50,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png",
  },
   {
    title: "Data Science and AI",
    description: "Introductory course for ML and Data Science",
    rating: 4.4,
    reviews: "1.23k",
    duration: "30 minutes",
    progress:50,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png",
  },
   {
    title: "Data Science and AI",
    description: "Introductory course for ML and Data Science",
    rating: 4.4,
    reviews: "1.23k",
    duration: "30 minutes",
    progress:50,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png",
  },
];


export default function CoursesPage() {
  return (
    <div className="flex flex-wrap gap-4 mt-4 ml-12 mr-12" >
      {courses.map((course, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 mt-16"
          style={{ flexBasis: "calc(33.333% - 1rem)" }} 
        >
          <img
            src={course.imageUrl} // using remote image
            alt="image"
            className="w-100 h-40 "
          />
          <div className="p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {course.title}
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-gray-500 text-xs mb-3">
              {course.progress}% Completed
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-md w-full">
              View Course
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}