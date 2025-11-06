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
  ListItemText
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
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      }
    ]
  };

  const popularBooks = [
    { title: 'Introduction to Algorithms', borrowCount: 150 },
    { title: 'Computer Architecture', borrowCount: 120 },
    { title: 'Data Structures', borrowCount: 95 },
    { title: 'Operating Systems', borrowCount: 87 },
    { title: 'Database Systems', borrowCount: 76 }
  ];

  return (
    <Grid container spacing={3}>
      {/* Key Metrics */}
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Books
            </Typography>
            <Typography variant="h4">
              2,847
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Active Borrowers
            </Typography>
            <Typography variant="h4">
              1,234
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Books Checked Out
            </Typography>
            <Typography variant="h4">
              389
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Fines Collected
            </Typography>
            <Typography variant="h4">
              2,847
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Charts */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Usage Statistics
          </Typography>
          <Bar data={monthlyData} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Department Engagement
          </Typography>
          <Doughnut data={departmentData} />
        </Paper>
      </Grid>

      {/* Popular Books */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Most Popular Books
          </Typography>
          <List>
            {popularBooks.map((book, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={book.title}
                  secondary={`Borrowed ${book.borrowCount} times`}
                />
                {index === 0 && (
                  <Box sx={{ bgcolor: 'warning.main', color: 'white', px: 1, borderRadius: 1 }}>
                    High Demand
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnalyticsDashboard;