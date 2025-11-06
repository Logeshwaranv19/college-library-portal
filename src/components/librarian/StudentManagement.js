import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Search, Visibility, MoneyOff } from '@mui/icons-material';
import { mockStudents, mockBorrowedBooks, mockBooks } from '../../data/mockData';

const StudentManagement = () => {
  const [students] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);

  const getStudentBorrowedBooks = (studentId) => {
    return mockBorrowedBooks
      .filter(borrow => borrow.studentId === studentId && borrow.status === 'borrowed')
      .map(borrow => {
        const book = mockBooks.find(b => b.id === borrow.bookId);
        return { ...borrow, book };
      });
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setViewDialog(true);
  };

  const handleWaiveFine = (studentId) => {
    // Implement fine waiving logic
    console.log(`Waiving fine for student ${studentId}`);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Student Management
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search students by name, email, or student ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Borrowed Books</TableCell>
                <TableCell>Fines</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => {
                const borrowedBooks = getStudentBorrowedBooks(student.id);
                const hasFines = false; // Mock data

                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>
                      <Chip 
                        label={borrowedBooks.length} 
                        color={borrowedBooks.length > 0 ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {hasFines ? (
                        <Chip label="$25.00" color="error" size="small" />
                      ) : (
                        <Chip label="None" color="success" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<Visibility />}
                        onClick={() => handleViewStudent(student)}
                        size="small"
                      >
                        View
                      </Button>
                      {hasFines && (
                        <Button
                          startIcon={<MoneyOff />}
                          onClick={() => handleWaiveFine(student.id)}
                          size="small"
                          color="error"
                          sx={{ ml: 1 }}
                        >
                          Waive Fine
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Student Details Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Student Details - {selectedStudent?.name}
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Typography><strong>Student ID:</strong> {selectedStudent.studentId}</Typography>
              <Typography><strong>Email:</strong> {selectedStudent.email}</Typography>
              <Typography><strong>Department:</strong> {selectedStudent.department}</Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Currently Borrowed Books
              </Typography>
              {getStudentBorrowedBooks(selectedStudent.id).length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Book Title</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getStudentBorrowedBooks(selectedStudent.id).map((borrow) => (
                        <TableRow key={borrow.id}>
                          <TableCell>{borrow.book?.title}</TableCell>
                          <TableCell>{borrow.dueDate}</TableCell>
                          <TableCell>
                            <Chip 
                              label="Borrowed" 
                              color="warning" 
                              size="small" 
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography color="textSecondary">
                  No books currently borrowed
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentManagement;