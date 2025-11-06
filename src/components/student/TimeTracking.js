import React from 'react';
import {
  Paper,
  Typography,
  LinearProgress,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { EmojiEvents, Schedule } from '@mui/icons-material';

const TimeTracking = ({ student }) => {
  const hours = student.totalHours || 0;
  const targetHours = 100;
  const progress = (hours / targetHours) * 100;

  const leaderboard = [
    { rank: 1, name: 'Reyaash', department: 'IT', hours: 78 },
    { rank: 2, name: 'Sanjay', department: 'IT', hours: 65 },
    { rank: 3, name: 'Logesh', department: 'IT', hours: hours },
    { rank: 4, name: 'Sabeesh', department: 'IT', hours: 38 },
    { rank: 5, name: 'Rajkumaran', department: 'ADS', hours: 35 }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Schedule sx={{ mr: 1 }} />
            Library Hours Progress
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              {hours} hours
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Semester Progress
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 10, borderRadius: 5, mb: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              {targetHours - hours} hours remaining to reach your goal
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <EmojiEvents sx={{ mr: 1 }} />
            Your Rank
          </Typography>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h3" color="primary">
              #3
            </Typography>
            <Typography variant="body2" color="textSecondary">
              in CSE Department
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Department Leaderboard
            </Typography>
            <List>
              {leaderboard.map((item) => (
                <ListItem 
                  key={item.rank}
                  sx={{ 
                    backgroundColor: item.name === 'You' ? 'action.selected' : 'transparent',
                    borderRadius: 1
                  }}
                >
                  <ListItemText
                    primary={`#${item.rank} - ${item.name}`}
                    secondary={`${item.hours} hours • ${item.department}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TimeTracking;