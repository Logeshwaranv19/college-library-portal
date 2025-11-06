import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  IconButton
} from '@mui/material';
import { Add, Edit, Delete, LocationOn } from '@mui/icons-material';
import { mockBooks } from '../../data/mockData';

const CatalogManagement = () => {
  const [books, setBooks] = useState(mockBooks);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    ddc: '',
    location: '',
    totalCopies: 1,
    availableCopies: 1,
    subject: '',
    department: 'CSE'
  });

  const handleAddBook = () => {
    const bookToAdd = {
      ...newBook,
      id: books.length + 1,
      availableCopies: parseInt(newBook.totalCopies)
    };
    setBooks([...books, bookToAdd]);
    setOpenDialog(false);
    resetForm();
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setNewBook(book);
    setOpenDialog(true);
  };

  const handleUpdateBook = () => {
    setBooks(books.map(book => 
      book.id === editingBook.id 
        ? { ...newBook, availableCopies: parseInt(newBook.totalCopies) }
        : book
    ));
    setOpenDialog(false);
    resetForm();
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const resetForm = () => {
    setNewBook({
      title: '',
      author: '',
      isbn: '',
      ddc: '',
      location: '',
      totalCopies: 1,
      availableCopies: 1,
      subject: '',
      department: 'CSE'
    });
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">
            Catalog Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add New Book
          </Button>
        </Box>

        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} md={6} lg={4} key={book.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    by {book.author}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>DDC:</strong> {book.ddc}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <LocationOn fontSize="small" sx={{ mr: 1 }} />
                      {book.location}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Copies:</strong> {book.availableCopies}/{book.totalCopies} available
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton 
                    size="small" 
                    onClick={() => handleEditBook(book)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteBook(book.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Add/Edit Book Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingBook ? 'Edit Book' : 'Add New Book'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Book Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ISBN"
                value={newBook.isbn}
                onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="DDC Number"
                value={newBook.ddc}
                onChange={(e) => setNewBook({ ...newBook, ddc: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Physical Location"
                value={newBook.location}
                onChange={(e) => setNewBook({ ...newBook, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Copies"
                type="number"
                value={newBook.totalCopies}
                onChange={(e) => setNewBook({ ...newBook, totalCopies: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Subject"
                value={newBook.subject}
                onChange={(e) => setNewBook({ ...newBook, subject: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={editingBook ? handleUpdateBook : handleAddBook}
            variant="contained"
          >
            {editingBook ? 'Update Book' : 'Add Book'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CatalogManagement;