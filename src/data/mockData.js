// data/mockData.js
export const mockBooks = [
  // New Arrival Books (first 10)
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    ddc: "005.1",
    subject: "Computer Science",
    location: "1st Floor, Rack 8",
    availableCopies: 3,
    totalCopies: 5
  },
  {
    id: 2,
    title: "Computer Architecture",
    author: "David A. Patterson",
    ddc: "004.1",
    subject: "Computer Science",
    location: "2nd Floor, Rack 7",
    availableCopies: 1,
    totalCopies: 3
  },
  {
    id: 3,
    title: "The C Programming Language",
    author: "Brian W. Kernighan",
    ddc: "005.13",
    subject: "Programming",
    location: "3rd Floor, Rack 9",
    availableCopies: 2,
    totalCopies: 4
  },
  {
    id: 4,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    ddc: "005.43",
    subject: "Computer Science",
    location: "1st Floor, Rack 6",
    availableCopies: 1,
    totalCopies: 3
  },
  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin",
    ddc: "005.1",
    subject: "Programming",
    location: "2nd Floor, Rack 5",
    availableCopies: 2,
    totalCopies: 4
  },
  {
    id: 6,
    title: "Design Patterns",
    author: "Erich Gamma",
    ddc: "005.1",
    subject: "Software Engineering",
    location: "3rd Floor, Rack 4",
    availableCopies: 1,
    totalCopies: 3
  },
  {
    id: 7,
    title: "Artificial Intelligence",
    author: "Stuart Russell",
    ddc: "006.3",
    subject: "AI",
    location: "1st Floor, Rack 3",
    availableCopies: 3,
    totalCopies: 3
  },
  {
    id: 8,
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    ddc: "005.74",
    subject: "Database",
    location: "2nd Floor, Rack 2",
    availableCopies: 3,
    totalCopies: 2
  },
  {
    id: 9,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    ddc: "004.6",
    subject: "Networking",
    location: "3rd Floor, Rack 1",
    availableCopies: 4,
    totalCopies: 4
  },
  {
    id: 10,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    ddc: "005.1",
    subject: "Programming",
    location: "1st Floor, Rack 10",
    availableCopies: 1,
    totalCopies: 2
  },
  // Remaining Books (11-20)
  {
    id: 11,
    title: "Deep Learning",
    author: "Ian Goodfellow",
    ddc: "006.31",
    subject: "AI",
    location: "2nd Floor, Rack 1",
    availableCopies: 2,
    totalCopies: 3
  },
  {
    id: 12,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    ddc: "005.2762",
    subject: "Programming",
    location: "3rd Floor, Rack 2",
    availableCopies: 1,
    totalCopies: 2
  },
  {
    id: 13,
    title: "React Up and Running",
    author: "Stoyan Stefanov",
    ddc: "005.2762",
    subject: "Web Development",
    location: "1st Floor, Rack 3",
    availableCopies: 3,
    totalCopies: 3
  },
  {
    id: 14,
    title: "Python Crash Course",
    author: "Eric Matthes",
    ddc: "005.133",
    subject: "Programming",
    location: "2nd Floor, Rack 4",
    availableCopies: 0,
    totalCopies: 4
  },
  {
    id: 15,
    title: "Data Structures and Algorithms",
    author: "Michael T. Goodrich",
    ddc: "005.1",
    subject: "Computer Science",
    location: "3rd Floor, Rack 5",
    availableCopies: 2,
    totalCopies: 3
  },
  {
    id: 16,
    title: "Cloud Computing",
    author: "Thomas Erl",
    ddc: "004.6782",
    subject: "Cloud",
    location: "1st Floor, Rack 6",
    availableCopies: 1,
    totalCopies: 2
  },
  {
    id: 17,
    title: "Machine Learning Yearning",
    author: "Andrew Ng",
    ddc: "006.31",
    subject: "AI",
    location: "2nd Floor, Rack 7",
    availableCopies: 4,
    totalCopies: 4
  },
  {
    id: 18,
    title: "The DevOps Handbook",
    author: "Gene Kim",
    ddc: "005.1",
    subject: "DevOps",
    location: "3rd Floor, Rack 8",
    availableCopies: 2,
    totalCopies: 3
  },
  {
    id: 19,
    title: "Site Reliability Engineering",
    author: "Betsy Beyer",
    ddc: "005.1",
    subject: "DevOps",
    location: "1st Floor, Rack 9",
    availableCopies: 0,
    totalCopies: 2
  },
  {
    id: 20,
    title: "Clean Architecture",
    author: "Robert C. Martin",
    ddc: "005.1",
    subject: "Software Engineering",
    location: "2nd Floor, Rack 10",
    availableCopies: 3,
    totalCopies: 3
  }
];

export const mockStudents = [
  {
    id: 1,
    name: "Sanjay",
    email: "Sanjay@gmail.com",
    department: "IT",
    studentId: "23ITBE112",
    totalHours: 42
  },
  {
    id: 2,
    name: "Reyaash",
    email: "Reyaash@gmail.com",
    department: "IT",
    studentId: "23ITBE113",
    totalHours: 78
  },
  {
    id: 3,
    name: "Logesh",
    email: "Logesh@gmail.com",
    department: "IT",
    studentId: "23ITBE115",
    totalHours: 65
  }
];

export const mockBorrowedBooks = [
  {
    id: 1,
    bookId: 2,
    studentId: 1,
    borrowDate: "2024-01-15",
    dueDate: "2024-02-15",
    returnDate: null,
    status: "borrowed"
  },
  {
    id: 2,
    bookId: 3,
    studentId: 1,
    borrowDate: "2024-01-20",
    dueDate: "2024-02-20",
    returnDate: null,
    status: "borrowed"
  },
  {
    id: 3,
    bookId: 4,
    studentId: 2,
    borrowDate: "2024-01-10",
    dueDate: "2024-02-10",
    returnDate: null,
    status: "borrowed"
  }
];
