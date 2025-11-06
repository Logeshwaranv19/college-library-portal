import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Alert
} from '@mui/material';
import { Search, LocationOn, Notifications } from '@mui/icons-material';
import { mockBooks } from '../../data/mockData';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [notifyBook, setNotifyBook] = useState(null);

  const handleSearch = () => {
    const results = mockBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleNotify = (book) => {
    setNotifyBook(book);
    setTimeout(() => setNotifyBook(null), 3000);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Smart Book Search
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by title, author, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            variant="contained"
            startIcon={<Search />}
            onClick={handleSearch}
            size="large"
          >
            Search
          </Button>
        </Box>
      </Paper>

      {notifyBook && (
        <Alert severity="success" sx={{ mb: 2 }}>
          You'll be notified when "{notifyBook.title}" becomes available!
        </Alert>
      )}

      <Grid container spacing={3}>
        {searchResults.map((book) => (
          <Grid item xs={12} md={6} key={book.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  by {book.author}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={`DDC: ${book.ddc}`} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={book.subject} 
                    size="small" 
                    sx={{ ml: 1 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {book.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography 
                    variant="body2" 
                    color={book.availableCopies > 0 ? 'success.main' : 'error.main'}
                  >
                    {book.availableCopies > 0 
                      ? `Available (${book.availableCopies})` 
                      : 'Currently Unavailable'
                    }
                  </Typography>
                  
                  {book.availableCopies === 0 && (
                    <Button
                      startIcon={<Notifications />}
                      onClick={() => handleNotify(book)}
                      size="small"
                    >
                      Notify Me
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookSearch;