// Define the structure of each course folder
type CourseSubfolders = {
  ppts: string;
  interview: string;
  assignments: string;
};

// Define the overall courseFolders type
type CourseFolders = {
  [key: string]: CourseSubfolders;
};

// Each course maps to an object of subfolders
export const courseFolders: CourseFolders = {
  "Data-Science": {
    ppts: "1Z4VqDF8lKgdI3Fv4PwR2HECJ-Bzra69v",        // Google Drive folder ID for PPTs
    interview: "12CLV0C_9JX4PWq3W_GrpbfA5iQO6WkQ0",   // Google Drive folder ID for Interview Questions
    assignments: "1CX17BfjZ2EWUuDjUWAZdXV-skceJJJbi", // Google Drive folder ID for Assignments
  },
  "SQL": {
    ppts: "1pISXqOOYHzIQa5EEME6Ao5skwF8w8SZ6",
    interview: "6F7G8H9I0J1K2L3M4N5O",
    assignments: "5E6F7G8H9I0J1K2L3M4N",
  },
  "Power-BI": {
    ppts: "1yCLZcXZr5SYMYgjaMSn5EtwMdPk2HuEQ",
    interview: "9I0J1K2L3M4N5O6P7Q8R",
    assignments: "8H9I0J1K2L3M4N5O6P7Q",
  },

    "Data-Engineering":{
  ppts: "16T93KKe_yyUlLHwCwvaV4yzuz81dwkKP",
    interview: "9I0J1K2L3M4N5O6P7Q8R",
    assignments: "8H9I0J1K2L3M4N5O6P7Q",

  }
};
