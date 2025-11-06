export const mockBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "9780262033848",
    ddc: "005.1",
    location: "3rd Floor, CS Wing, Rack 8",
    totalCopies: 5,
    availableCopies: 3,
    subject: "Computer Science",
    department: "CSE"
  },
  {
    id: 2,
    title: "Computer Architecture",
    author: "David A. Patterson",
    isbn: "9780128119051",
    ddc: "004.1",
    location: "3rd Floor, CS Wing, Rack 7",
    totalCopies: 3,
    availableCopies: 1,
    subject: "Computer Science",
    department: "CSE"
  },
  {
    id: 3,
    title: "The C Programming Language",
    author: "Brian W. Kernighan",
    isbn: "9780131103627",
    ddc: "005.13",
    location: "3rd Floor, CS Wing, Rack 9",
    totalCopies: 4,
    availableCopies: 2,
    subject: "Programming",
    department: "CSE"
  },
  {
    id: 4,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    isbn: "9781118063330",
    ddc: "005.43",
    location: "3rd Floor, CS Wing, Rack 6",
    totalCopies: 3,
    availableCopies: 0,
    subject: "Computer Science",
    department: "CSE"
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