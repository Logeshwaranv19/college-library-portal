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
  IconButton,
  InputAdornment
} from '@mui/material';
import { Add, Edit, Delete, LocationOn, Search } from '@mui/icons-material';
import { mockBooks } from '../../data/mockData';

const CatalogManagement = () => {
  const [books, setBooks] = useState(mockBooks);
  const [filteredBooks, setFilteredBooks] = useState(mockBooks);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Search function
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks(books);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(lowercasedQuery) ||
        book.author.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredBooks(filtered);
    }
  };

  const handleAddBook = () => {
    const bookToAdd = {
      ...newBook,
      id: books.length + 1,
      availableCopies: parseInt(newBook.totalCopies)
    };
    const updatedBooks = [...books, bookToAdd];
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    setOpenDialog(false);
    resetForm();
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setNewBook(book);
    setOpenDialog(true);
  };

  const handleUpdateBook = () => {
    const updatedBooks = books.map(book => 
      book.id === editingBook.id 
        ? { ...newBook, availableCopies: parseInt(newBook.totalCopies) }
        : book
    );
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    setOpenDialog(false);
    resetForm();
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
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

        {/* Search Box */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
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
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center" color="textSecondary" sx={{ py: 4 }}>
                No books found matching your search.
              </Typography>
            </Grid>
          )}
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
