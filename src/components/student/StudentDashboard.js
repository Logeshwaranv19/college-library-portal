import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Warning, CheckCircle, History } from '@mui/icons-material';
import { mockBorrowedBooks, mockBooks } from '../../data/mockData';

const StudentDashboard = ({ student }) => {
  const currentBorrowed = mockBorrowedBooks.filter(borrow => borrow.status === 'borrowed');
  const fines = 0; // Mock fine data

  const getBookDetails = (bookId) => {
    return mockBooks.find(book => book.id === bookId);
  };

  return (
    <Grid container spacing={3}>
      {/* Current Borrowed Books */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Warning sx={{ mr: 1 }} />
            Currently Borrowed Books
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentBorrowed.map((borrow) => {
                  const book = getBookDetails(borrow.bookId);
                  return (
                    <TableRow key={borrow.id}>
                      <TableCell>{book?.title}</TableCell>
                      <TableCell>{book?.author}</TableCell>
                      <TableCell>{borrow.dueDate}</TableCell>
                      <TableCell>
                        <Chip 
                          label="Borrowed" 
                          color="warning" 
                          size="small" 
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* Fines Section */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Fines & Payments
          </Typography>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            {fines > 0 ? (
              <>
                <Warning color="error" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" color="error" gutterBottom>
                  Outstanding Fine: ${fines}
                </Typography>
                <Button variant="contained" color="error">
                  Pay Now
                </Button>
              </>
            ) : (
              <>
                <CheckCircle color="success" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" color="success.main">
                  No Outstanding Fines
                </Typography>
              </>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Borrowing History */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <History sx={{ mr: 1 }} />
            Borrowing History
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Your complete borrowing history will appear here.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StudentDashboard;