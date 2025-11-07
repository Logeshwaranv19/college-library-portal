import React, { useState, useEffect } from 'react';
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
import { Search, LocationOn, Notifications, NewReleases, Place } from '@mui/icons-material';
import { mockBooks } from '../../data/mockData';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [notifyBook, setNotifyBook] = useState(null);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [newArrivalBooks, setNewArrivalBooks] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [showAllBooks, setShowAllBooks] = useState(false);

  // Initialize books on component mount
  useEffect(() => {
    // Mark first 10 books as new arrivals
    const newArrivals = mockBooks.slice(0, 10).map(book => ({
      ...book,
      isNewArrival: true
    }));
    
    setNewArrivalBooks(newArrivals);
    setDisplayedBooks(newArrivals);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      // If search is empty, show current displayed books
      if (showAllBooks) {
        setDisplayedBooks([...mockBooks].slice(0, displayCount));
      } else {
        setDisplayedBooks(newArrivalBooks.slice(0, displayCount));
      }
      setSearchResults([]);
    } else {
      const results = mockBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setDisplayedBooks(results.slice(0, displayCount));
    }
  };

  const handleLoadMore = () => {
    const newDisplayCount = displayCount + 10;
    setDisplayCount(newDisplayCount);
    
    if (searchTerm) {
      setDisplayedBooks(searchResults.slice(0, newDisplayCount));
    } else if (showAllBooks) {
      setDisplayedBooks(mockBooks.slice(0, newDisplayCount));
    } else {
      setDisplayedBooks(newArrivalBooks.slice(0, newDisplayCount));
    }
  };

  const handleShowAllBooks = () => {
    setShowAllBooks(true);
    
    // Randomly mark some books as new for demonstration
    const allBooksWithRandomNew = mockBooks.map(book => ({
      ...book,
      // Randomly mark 30% of books as new when showing all books
      isNewArrival: Math.random() < 0.3
    }));
    
    setDisplayedBooks(allBooksWithRandomNew.slice(0, displayCount));
  };

  const handleShowNewArrivals = () => {
    setShowAllBooks(false);
    setDisplayCount(10);
    setDisplayedBooks(newArrivalBooks.slice(0, 10));
  };

  const handleNotify = (book) => {
    setNotifyBook(book);
    setTimeout(() => setNotifyBook(null), 3000);
  };

  const handlePlaceholderClick = (book) => {
    if (book.availableCopies > 0) {
      setNotifyBook({
        ...book,
        message: `If the Book is available You will be notify`
      });
      setTimeout(() => setNotifyBook(null), 3000);
    }
  };

  const hasMoreBooks = () => {
    if (searchTerm) {
      return displayCount < searchResults.length;
    } else if (showAllBooks) {
      return displayCount < mockBooks.length;
    } else {
      return displayCount < newArrivalBooks.length;
    }
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
        <Alert severity="info" sx={{ mb: 2 }}>
          {notifyBook.message || `You'll be notified when "${notifyBook.title}" becomes available!`}
        </Alert>
      )}

      {/* Display search info if searching */}
      {searchTerm && (
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {searchResults.length > 0 
            ? `Found ${searchResults.length} results for "${searchTerm}"`
            : `No results found for "${searchTerm}"`
          }
        </Typography>
      )}

      {/* Book Type Toggle Buttons - Only show when not searching */}
      {!searchTerm && (
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <Button
            variant={showAllBooks ? "outlined" : "contained"}
            startIcon={<NewReleases />}
            onClick={handleShowNewArrivals}
          >
            New Arrival Books ({newArrivalBooks.length})
          </Button>
          <Button
            variant={showAllBooks ? "contained" : "outlined"}
            onClick={handleShowAllBooks}
          >
            All Books ({mockBooks.length})
          </Button>
        </Box>
      )}

      {/* Section Heading */}
      {!searchTerm && (
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {showAllBooks ? (
            <>ALL BOOKS ({mockBooks.length})</>
          ) : (
            <>
              <NewReleases sx={{ mr: 1, color: 'primary.main' }} />
              New Arrival Books
            </>
          )}
        </Typography>
      )}

      {/* Display books */}
      <Grid container spacing={3}>
        {displayedBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: book.isNewArrival ? '2px solid #1976d2' : '1px solid rgba(0, 0, 0, 0.12)',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                }
              }}
            >
              {book.isNewArrival && (
                <Chip 
                  label="New" 
                  color="primary" 
                  size="small"
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    left: 8,
                    fontSize: '0.7rem',
                    zIndex: 1
                  }}
                />
              )}
              
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                p: 2 
              }}>
                {/* Title - Fixed height with ellipsis for long titles */}
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    minHeight: '64px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.2'
                  }}
                >
                  {book.title}
                </Typography>
                
                {/* Author - Fixed height */}
                <Typography 
                  color="textSecondary" 
                  gutterBottom 
                  sx={{ 
                    minHeight: '24px',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  by {book.author}
                </Typography>
                
                {/* Chips - Fixed height */}
                <Box sx={{ mb: 2, minHeight: '32px' }}>
                  <Chip 
                    label={`DDC: ${book.ddc}`} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ mb: 0.5 }}
                  />
                  <Chip 
                    label={book.subject} 
                    size="small" 
                    sx={{ ml: 0.5, mb: 0.5 }}
                  />
                </Box>

                {/* Location - Fixed height */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, minHeight: '24px' }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography 
                    variant="body2" 
                    sx={{ ml: 1 }}
                    noWrap
                  >
                    {book.location}
                  </Typography>
                </Box>

                {/* Availability and Buttons - Fixed at bottom */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 'auto',
                  minHeight: '36px',
                  gap: 1
                }}>
                  <Typography 
                    variant="body2" 
                    color={book.availableCopies > 0 ? 'success.main' : 'error.main'}
                    noWrap
                    sx={{ flex: 1 }}
                  >
                    {book.availableCopies > 0 
                      ? `Available (${book.availableCopies})` 
                      : 'Currently Unavailable'
                    }
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {/* Notify Me Button for unavailable books */}
                    {book.availableCopies === 0 && (
                      <Button
                        startIcon={<Notifications />}
                        onClick={() => handleNotify(book)}
                        size="small"
                        variant="outlined"
                        sx={{ flexShrink: 0 }}
                      >
                        Notify Me
                      </Button>
                    )}
                    
                    {/* Placeholder Button - Only for available books */}
                    {book.availableCopies > 0 && (
                      <Button
                        onClick={() => handlePlaceholderClick(book)}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          flexShrink: 0,
                          borderColor: '#4caf50', // Green border
                          color: '#4caf50', // Green text
                          backgroundColor: 'transparent',
                          '&:hover': {
                            backgroundColor: '#4caf50', // Green background on hover
                            color: 'white', // White text on hover
                            borderColor: '#4caf50'
                          }
                        }}
                      >
                        Placeholder
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Load More Button */}
      {hasMoreBooks() && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            onClick={handleLoadMore}
            size="large"
          >
            Load More Books
          </Button>
        </Box>
      )}

      {/* Show message if no books to display */}
      {displayedBooks.length === 0 && (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 4 }}>
          {searchTerm ? 'No books found matching your search criteria.' : 'No books available.'}
        </Typography>
      )}
    </Box>
  );
};

export default BookSearch;
