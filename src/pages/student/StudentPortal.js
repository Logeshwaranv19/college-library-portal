import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import { School, ExitToApp } from '@mui/icons-material';
import BookSearch from '../../components/student/BookSearch';
import StudentDashboard from '../../components/student/StudentDashboard';
import TimeTracking from '../../components/student/TimeTracking';

const StudentPortal = ({ user }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <School sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Portal - Welcome, {user.name}
          </Typography>
          <ExitToApp />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
            <Tab label="Book Search" />
            <Tab label="My Account" />
            <Tab label="Time Tracking" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <BookSearch />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <StudentDashboard student={user} />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <TimeTracking student={user} />
        </TabPanel>
      </Container>
    </div>
  );
};

export default StudentPortal;