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
import { AdminPanelSettings, ExitToApp } from '@mui/icons-material';
import CatalogManagement from '../../components/librarian/CatalogManagement';
import AnalyticsDashboard from '../../components/librarian/AnalyticsDashboard';
import StudentManagement from '../../components/librarian/StudentManagement';
import NotificationManager from '../../components/librarian/NotificationManager';

const LibrarianPanel = ({ user }) => {
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
          <AdminPanelSettings sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Librarian Admin Panel
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {user?.name}
          </Typography>
          <ExitToApp />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
          <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
            <Tab label="Catalog Management" />
            <Tab label="Student Management" />
            <Tab label="Notifications" />
            <Tab label="Analytics Dashboard" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <CatalogManagement />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <StudentManagement />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <NotificationManager />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <AnalyticsDashboard />
        </TabPanel>
      </Container>
    </div>
  );
};

export default LibrarianPanel;