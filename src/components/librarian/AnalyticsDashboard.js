import React from 'react';
import {
  Paper,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  People, 
  LibraryBooks, 
  AccountBalance 
} from '@mui/icons-material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard = () => {
  // Mock data for charts
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Books Checked Out',
        data: [65, 78, 82, 79, 85, 90],
        backgroundColor: 'rgba(63, 81, 181, 0.8)',
        borderRadius: 4,
      }
    ]
  };

  const departmentData = {
    labels: ['CSE', 'Mechanical', 'Electrical', 'Civil', 'Chemical'],
    datasets: [
      {
        label: 'Books Borrowed',
        data: [450, 320, 280, 210, 180],
        backgroundColor: [
          'rgba(63, 81, 181, 0.8)',
          'rgba(33, 150, 243, 0.8)',
          'rgba(0, 188, 212, 0.8)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(255, 152, 0, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const popularBooks = [
    { title: 'Introduction to Algorithms', borrowCount: 150, status: 'High Demand' },
    { title: 'Computer Architecture', borrowCount: 120, status: 'High Demand' },
    { title: 'Data Structures', borrowCount: 95, status: 'Medium Demand' },
    { title: 'Operating Systems', borrowCount: 87, status: 'Medium Demand' },
    { title: 'Database Systems', borrowCount: 76, status: 'Medium Demand' }
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <LibraryBooks sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                2,847
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Books
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                1,234
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active Borrowers
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                389
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Books Checked Out
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AccountBalance sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                2,847
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Fines Collected
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1 }} />
              Monthly Usage Statistics
            </Typography>
            <Box sx={{ height: '320px' }}>
              <Bar 
                data={monthlyData} 
                options={chartOptions}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Department Engagement
            </Typography>
            <Box sx={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Doughnut 
                data={departmentData} 
                options={doughnutOptions}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Popular Books Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Most Popular Books
            </Typography>
            <List sx={{ py: 0 }}>
              {popularBooks.map((book, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {book.title}
                          </Typography>
                          <Chip 
                            label={book.status} 
                            color={book.status === 'High Demand' ? 'error' : 'warning'}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={`Borrowed ${book.borrowCount} times`}
                    />
                  </ListItem>
                  {index < popularBooks.length - 1 && (
                    <Divider />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
