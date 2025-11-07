import React, { useState, useEffect } from 'react';
import { Search, BookOpen, User, Clock, ChevronLeft, ChevronRight, Star, BookMarked, MapPin, Users } from 'lucide-react';
import { mockBooks as books } from '../../data/mockData';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentNewArrivalIndex, setCurrentNewArrivalIndex] = useState(0);
  const [showDefaultBooks, setShowDefaultBooks] = useState(true);

  // Enhanced new arrivals data with 10 books
  const newArrivals = [
    {
      id: 101,
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell",
      cover: "🤖",
      rating: 4.8,
      description: "The most comprehensive textbook on AI available today.",
      genre: "Computer Science",
      pages: 1136,
      year: 2020
    },
    {
      id: 102,
      title: "The React Handbook 2024",
      author: "React Team",
      cover: "⚛️",
      rating: 4.9,
      description: "Complete guide to modern React development with hooks and best practices.",
      genre: "Web Development",
      pages: 428,
      year: 2024
    },
    {
      id: 103,
      title: "Data Science for Beginners",
      author: "Sarah Johnson",
      cover: "📊",
      rating: 4.6,
      description: "Learn data science from scratch with practical examples and real-world projects.",
      genre: "Data Science",
      pages: 312,
      year: 2023
    },
    {
      id: 104,
      title: "Cloud Computing Essentials",
      author: "Michael Chen",
      cover: "☁️",
      rating: 4.7,
      description: "Master cloud technologies and deployment strategies for modern applications.",
      genre: "Cloud Computing",
      pages: 567,
      year: 2023
    },
    {
      id: 105,
      title: "Machine Learning Mastery",
      author: "Dr. Emily Zhang",
      cover: "🧠",
      rating: 4.8,
      description: "Advanced machine learning techniques and neural network architectures.",
      genre: "Machine Learning",
      pages: 789,
      year: 2024
    },
    {
      id: 106,
      title: "Blockchain Revolution",
      author: "Alex Thompson",
      cover: "⛓️",
      rating: 4.5,
      description: "Understanding blockchain technology and its applications in modern finance.",
      genre: "Blockchain",
      pages: 345,
      year: 2024
    },
    {
      id: 107,
      title: "Cybersecurity Fundamentals",
      author: "Maria Rodriguez",
      cover: "🔒",
      rating: 4.7,
      description: "Essential cybersecurity principles and threat protection strategies.",
      genre: "Cybersecurity",
      pages: 512,
      year: 2023
    },
    {
      id: 108,
      title: "Quantum Computing Basics",
      author: "Dr. James Wilson",
      cover: "⚡",
      rating: 4.9,
      description: "Introduction to quantum computing principles and quantum algorithms.",
      genre: "Quantum Computing",
      pages: 234,
      year: 2024
    },
    {
      id: 109,
      title: "IoT Development Guide",
      author: "Robert Kim",
      cover: "📡",
      rating: 4.4,
      description: "Building Internet of Things applications with modern frameworks.",
      genre: "IoT",
      pages: 398,
      year: 2023
    },
    {
      id: 110,
      title: "Full Stack Development",
      author: "Lisa Anderson",
      cover: "💻",
      rating: 4.8,
      description: "Complete guide to full stack development from frontend to backend.",
      genre: "Web Development",
      pages: 645,
      year: 2024
    }
  ];

  // Get first 10 books for default display
  const defaultBooks = books.slice(0, 10);

  useEffect(() => {
    // Show default books when component loads
    setSearchResults(defaultBooks);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults(defaultBooks);
      setShowDefaultBooks(true);
      return;
    }

    const results = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setShowDefaultBooks(false);
    setSelectedBook(null);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleBorrow = (bookId) => {
    alert(`Book borrowed successfully!`);
  };

  const handlePlaceHold = (bookId) => {
    alert(`Hold placed successfully! You'll be notified when available.`);
  };

  const nextNewArrival = () => {
    setCurrentNewArrivalIndex((prev) => 
      prev === newArrivals.length - 1 ? 0 : prev + 1
    );
  };

  const prevNewArrival = () => {
    setCurrentNewArrivalIndex((prev) => 
      prev === 0 ? newArrivals.length - 1 : prev - 1
    );
  };

  const currentNewArrival = newArrivals[currentNewArrivalIndex];

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Header */}
      <header style={{
       
      }}>
        
      </header>

      {/* Navigation */}
      <nav style={{
       
      }}>
        <div className="container">
          <div className="flex space-x-12">
            <button className="flex items-center space-x-3 font-bold text-primary-600 border-b-4 border-primary-600 py-4 px-2">
              <BookOpen size={24} />
             
            </button>
            <button className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 py-4 px-2 transition-colors">
              <User size={24} />
          
            </button>
            <button className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 py-4 px-2 transition-colors">
              <Clock size={24} />
              
            </button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '30px 0' }}>
        {/* New Arrivals Section - TOP */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">New Arrivals 📚</h2>
              <p className="text-gray-600 text-lg">Discover our latest additions to the library collection</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={prevNewArrival}
                className="btn btn-secondary hover:scale-110 transition-transform"
                style={{ 
                  padding: '16px',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  minWidth: '60px'
                }}
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                onClick={nextNewArrival}
                className="btn btn-primary hover:scale-110 transition-transform"
                style={{ 
                  padding: '16px',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  minWidth: '60px'
                }}
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-8" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
            backdropFilter: 'blur(20px)'
          }}>
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
              {/* Left Space for Previous Button */}
              <div style={{ width: '80px', flexShrink: 0 }}></div>

              {/* Book Cover - Centered */}
              <div className="flex flex-col items-center space-y-8 flex-1">
                <div style={{
                  width: '200px',
                  height: '280px',
                  background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--white)',
                  fontSize: '80px',
                  boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)',
                  margin: '0 auto'
                }}>
                  {currentNewArrival.cover}
                </div>

                {/* Book Details */}
                <div className="text-center max-w-4xl">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <span className="badge badge-primary text-lg py-2 px-4">{currentNewArrival.genre}</span>
                    <div className="flex items-center space-x-2">
                      <Star size={24} style={{ color: 'var(--warning)', fill: 'var(--warning)' }} />
                      <span className="font-bold text-gray-900 text-lg">{currentNewArrival.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentNewArrival.title}
                  </h3>
                  <p className="text-xl text-gray-600 mb-6">by {currentNewArrival.author}</p>
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-3xl mx-auto">
                    {currentNewArrival.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-6 justify-center mb-8">
                    <div className="text-center bg-gray-50 rounded-xl p-4 min-w-24">
                      <div className="text-sm text-gray-500 font-medium">Pages</div>
                      <div className="font-bold text-gray-900 text-xl">{currentNewArrival.pages}</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-xl p-4 min-w-24">
                      <div className="text-sm text-gray-500 font-medium">Year</div>
                      <div className="font-bold text-gray-900 text-xl">{currentNewArrival.year}</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-xl p-4 min-w-24">
                      <div className="text-sm text-gray-500 font-medium">Genre</div>
                      <div className="font-bold text-gray-900 text-xl">{currentNewArrival.genre}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="btn btn-primary text-lg py-4 px-8">
                      <BookMarked size={24} />
                      Borrow Now
                    </button>
                    <button className="btn btn-secondary text-lg py-4 px-8">
                      <Star size={24} />
                      Add to Wishlist
                    </button>
                  </div>
                </div>

                {/* Swipe Indicator */}
                <div className="flex justify-center space-x-3 mt-8">
                  {newArrivals.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: index === currentNewArrivalIndex 
                          ? 'var(--primary-500)' 
                          : 'var(--secondary-300)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => setCurrentNewArrivalIndex(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Right Space for Next Button */}
              <div style={{ width: '80px', flexShrink: 0 }}></div>
            </div>
          </div>
        </div>

        {/* Search Section - BELOW New Arrivals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search and Results */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-3xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Smart Book Search 🔍</h2>
              <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
                <div style={{ position: 'relative' }}>
                  <Search style={{
                    position: 'absolute',
                    left: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--secondary-400)',
                    height: '24px',
                    width: '24px'
                  }} />
                  <input
                    type="text"
                    placeholder="Search by title, author, subject, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input"
                    style={{ 
                      paddingLeft: '60px',
                      paddingRight: '140px',
                      height: '70px',
                      fontSize: '18px',
                      borderRadius: '16px',
                      border: '2px solid var(--secondary-200)'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '54px',
                      padding: '0 24px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    <span className="flex items-center space-x-3">
                      <span style={{ fontSize: '20px' }}>🔍</span>
                      <span>SEARCH</span>
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Books Grid - HORIZONTAL LAYOUT */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  {showDefaultBooks ? 'Popular Books in Library' : `Found ${searchResults.length} Book${searchResults.length !== 1 ? 's' : ''}`}
                </h3>
                {showDefaultBooks && (
                  <div className="text-lg text-gray-600">
                    Showing {searchResults.length} of {books.length} books
                  </div>
                )}
              </div>

              {/* Horizontal Books Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((book, index) => (
                  <div 
                    key={book.id} 
                    className={`card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      selectedBook?.id === book.id ? 'ring-4 ring-primary-500 shadow-2xl' : 'shadow-lg'
                    }`}
                    onClick={() => handleBookSelect(book)}
                    style={{
                      borderRadius: '16px',
                      padding: '16px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Book Cover */}
                    <div style={{
                      width: '100%',
                      height: '160px',
                      background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--white)',
                      fontSize: '48px',
                      marginBottom: '12px',
                      position: 'relative'
                    }}>
                      <BookMarked size={32} />
                      {showDefaultBooks && (
                        <div style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: 'var(--primary-500)',
                          color: 'white',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}>
                          {index + 1}
                        </div>
                      )}
                    </div>

                    {/* Book Details */}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm mb-2 leading-tight line-clamp-2">
                        {book.title}
                      </h4>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-1">by {book.author}</p>
                      
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center space-x-1">
                          <BookOpen size={12} className="text-gray-500" />
                          <span className="text-xs text-gray-600">DDC: {book.ddc}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={12} className="text-gray-500" />
                          <span className="text-xs text-gray-600 line-clamp-1">{book.location.split(',')[0]}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={12} className="text-gray-500" />
                          <span className={`text-xs font-semibold ${
                            book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Checked Out'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="badge badge-primary text-xs">{book.subject}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      {book.availableCopies > 0 ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBorrow(book.id);
                          }}
                          className="btn btn-primary w-full text-xs py-2"
                        >
                          Borrow
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaceHold(book.id);
                          }}
                          className="btn w-full text-xs py-2"
                          style={{
                            background: 'linear-gradient(135deg, var(--warning), #d97706)',
                            color: 'var(--white)'
                          }}
                        >
                          Place Hold
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Book Details */}
          <div className="lg:col-span-1">
            {selectedBook ? (
              <div className="card sticky top-24" style={{ borderRadius: '20px' }}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">Book Details</h3>
                
                <div className="space-y-6">
                  <div style={{
                    width: '100%',
                    height: '250px',
                    background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--white)',
                    fontSize: '80px',
                    marginBottom: '20px',
                    boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)'
                  }}>
                    <BookMarked size={60} />
                  </div>

                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 text-xl mb-2">{selectedBook.title}</h4>
                    <p className="text-gray-600 text-lg">by {selectedBook.author}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600 font-medium">DDC Number:</span>
                      <span className="font-bold text-primary-600">{selectedBook.ddc}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600 font-medium">Location:</span>
                      <span className="font-bold text-gray-900">{selectedBook.location}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600 font-medium">Subject:</span>
                      <span className="font-bold text-gray-900">{selectedBook.subject}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600 font-medium">ISBN:</span>
                      <span className="font-bold text-gray-900">{selectedBook.isbn}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600 font-medium">Available Copies:</span>
                      <span className={`font-bold text-lg ${
                        selectedBook.availableCopies > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedBook.availableCopies} / {selectedBook.totalCopies}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    {selectedBook.availableCopies > 0 ? (
                      <button 
                        onClick={() => handleBorrow(selectedBook.id)}
                        className="btn btn-primary w-full text-lg py-4"
                      >
                        <BookMarked size={20} />
                        Borrow This Book
                      </button>
                    ) : (
                      <button 
                        onClick={() => handlePlaceHold(selectedBook.id)}
                        className="btn w-full text-lg py-4"
                        style={{
                          background: 'linear-gradient(135deg, var(--warning), #d97706)',
                          color: 'var(--white)'
                        }}
                      >
                        <Clock size={20} />
                        Place Hold
                      </button>
                    )}
                    <button className="btn btn-secondary w-full text-lg py-4">
                      <Star size={20} />
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center" style={{ borderRadius: '20px', padding: '40px 20px' }}>
                                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
