import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Grid,
  LinearProgress
} from '@mui/material';
import { 
  Email, 
  Sms, 
  Notifications, 
  Send, 
  Warning,
  CheckCircle
} from '@mui/icons-material';

const NotificationManager = () => {
  // All data defined inside the component
  const mockOverdueBooks = [
    {
      id: 1,
      bookId: 2,
      studentId: 1,
      studentName: 'Reyaash',
      studentEmail: 'reyaash@gmail.com',
      bookTitle: 'Computer Architecture',
      bookAuthor: 'David A. Patterson',
      dueDate: '2024-01-20',
      daysOverdue: 5,
      fineAmount: 10
    },
    {
      id: 2,
      bookId: 4,
      studentId: 2,
      studentName: 'Sanjay',
      studentEmail: 'sanjay@gmail.com',
      bookTitle: 'Operating System Concepts',
      bookAuthor: 'Abraham Silberschatz',
      dueDate: '2024-01-25',
      daysOverdue: 2,
      fineAmount: 10
    }
  ];

  const mockNotificationHistory = [
    {
      id: 1,
      studentId: 1,
      bookId: 2,
      type: 'overdue',
      message: 'Your book "Computer Architecture" is 5 days overdue. Please return it immediately.',
      sentDate: '2024-01-25',
      method: 'email',
      status: 'sent'
    }
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [notificationMethod, setNotificationMethod] = useState('email');
  const [customMessage, setCustomMessage] = useState('');
  const [sentNotifications, setSentNotifications] = useState(mockNotificationHistory);
  const [successAlert, setSuccessAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [sending, setSending] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);

  const overdueBooks = mockOverdueBooks;

  // Sample email templates - Fixed: removed undefined variables
  const emailTemplates = {
    gentleReminder: `Dear {student_name},

This is a friendly reminder from the College Library.

We noticed that your book "{book_title}" by {book_author} was due on {due_date} and is currently {days_overdue} days overdue.

Please return the book at your earliest convenience to avoid additional fines.

Thank you for your cooperation.

Best regards,
College Library Administration
logeshwaranv19@gmail.com`,

    urgentReminder: `URGENT: Overdue Book Notice

Dear {student_name},

Your book "{book_title}" is now {days_overdue} days overdue. This requires immediate attention.

Book Details:
• Title: {book_title}
• Author: {book_author}
• Due Date: {due_date}
• Days Overdue: {days_overdue}

Please return the book immediately to prevent further penalties and potential account restrictions.

Sincerely,
College Library
Librarian`,

    finalWarning: `FINAL WARNING: Severe Overdue Notice

Dear {student_name},

This is the final reminder regarding your severely overdue book.

Book: "{book_title}" by {book_author}
Due Date: {due_date}
Days Overdue: {days_overdue}

Your library privileges will be suspended if the book is not returned within 3 days. This matter may also be escalated to your department head.

Return the book immediately to avoid these consequences.

College Library Administration
`
  };

  const getNotificationHistory = (studentId, bookId) => {
    return sentNotifications.filter(notif => 
      notif.studentId === studentId && notif.bookId === bookId
    );
  };

  const handleSendNotification = (borrow) => {
    setSelectedStudent({
      id: borrow.studentId,
      name: borrow.studentName,
      email: borrow.studentEmail
    });
    setSelectedBook({
      id: borrow.bookId,
      title: borrow.bookTitle,
      author: borrow.bookAuthor
    });
    setSelectedBorrow(borrow);
    
    // Select template based on days overdue
    let template;
    if (borrow.daysOverdue <= 7) {
      template = emailTemplates.gentleReminder;
    } else if (borrow.daysOverdue <= 14) {
      template = emailTemplates.urgentReminder;
    } else {
      template = emailTemplates.finalWarning;
    }

    // Replace template variables
    const message = template
      .replace(/{student_name}/g, borrow.studentName)
      .replace(/{book_title}/g, borrow.bookTitle)
      .replace(/{book_author}/g, borrow.bookAuthor)
      .replace(/{due_date}/g, borrow.dueDate)
      .replace(/{days_overdue}/g, borrow.daysOverdue);

    // Add fine information separately
    const messageWithFine = `${message}\n\nFine Amount: {borrow.fineAmount}`;

    setCustomMessage(messageWithFine);
    setOpenDialog(true);
  };

  // Mock email service function
  const sendEmailNotification = async (studentEmail, studentName, bookDetails) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Email sent to ${studentEmail} for book "${bookDetails.title}"`);
        resolve({ success: true, message: 'Notification sent successfully' });
      }, 1000);
    });
  };

  // Mock bulk email service function
  const sendBulkEmailNotifications = async (overdueList) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = overdueList.map(student => ({
          student: student.name,
          success: true,
          message: 'Notification sent successfully'
        }));
        resolve(results);
      }, 2000);
    });
  };

  const sendNotification = async () => {
    if (!selectedStudent || !selectedBook || !selectedBorrow) return;

    setSending(true);
    setErrorAlert('');

    try {
      const bookDetails = {
        title: selectedBook.title,
        author: selectedBook.author,
        dueDate: selectedBorrow.dueDate,
        daysOverdue: selectedBorrow.daysOverdue,
        fineAmount: selectedBorrow.fineAmount
      };

      const result = await sendEmailNotification(
        selectedStudent.email,
        selectedStudent.name,
        bookDetails
      );

      if (result.success) {
        // Add to notification history
        const newNotification = {
          id: sentNotifications.length + 1,
          studentId: selectedStudent.id,
          bookId: selectedBook.id,
          type: 'overdue',
          message: customMessage,
          sentDate: new Date().toISOString().split('T')[0],
          method: notificationMethod,
          status: 'sent'
        };
        setSentNotifications([...sentNotifications, newNotification]);

        setSuccessAlert(`✅ Notification sent to ${selectedStudent.name} via ${notificationMethod}`);
        setOpenDialog(false);
      } else {
        setErrorAlert(`❌ Failed to send notification: ${result.message}`);
      }
    } catch (error) {
      setErrorAlert(`❌ Error sending notification: ${error.message}`);
    } finally {
      setSending(false);
      setTimeout(() => {
        setSuccessAlert('');
        setErrorAlert('');
      }, 5000);
    }
  };

  const sendBulkNotifications = async () => {
    setSending(true);
    setBulkProgress(0);
    setErrorAlert('');

    const bulkData = overdueBooks.map(borrow => ({
      email: borrow.studentEmail,
      name: borrow.studentName,
      bookDetails: {
        title: borrow.bookTitle,
        author: borrow.bookAuthor,
        dueDate: borrow.dueDate,
        daysOverdue: borrow.daysOverdue,
        fineAmount: borrow.fineAmount
      }
    }));

    try {
      // Simulate progress
      setBulkProgress(50);
      const results = await sendBulkEmailNotifications(bulkData);
      setBulkProgress(100);
      
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      // Add to notification history
      const newNotifications = overdueBooks.map((borrow, index) => ({
        id: sentNotifications.length + index + 1,
        studentId: borrow.studentId,
        bookId: borrow.bookId,
        type: 'overdue',
        message: `Bulk notification for overdue book: ${borrow.bookTitle}`,
        sentDate: new Date().toISOString().split('T')[0],
        method: 'email',
        status: 'sent'
      }));
      setSentNotifications([...sentNotifications, ...newNotifications]);

      setSuccessAlert(`📧 Bulk notifications completed: ${successful} sent, ${failed} failed`);
      
      if (failed > 0) {
        setErrorAlert(`Some notifications failed to send. Check console for details.`);
      }
    } catch (error) {
      setErrorAlert(`❌ Bulk sending failed: ${error.message}`);
    } finally {
      setSending(false);
      setTimeout(() => {
        setSuccessAlert('');
        setErrorAlert('');
        setBulkProgress(0);
      }, 5000);
    }
  };

  return (
    <Box>
      {successAlert && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successAlert}
        </Alert>
      )}
      
      {errorAlert && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorAlert}
        </Alert>
      )}

      {sending && bulkProgress > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Sending bulk notifications... {bulkProgress}%
          </Typography>
          <LinearProgress variant="determinate" value={bulkProgress} />
        </Box>
      )}

      <Grid container spacing={3}>
        {/* Notification Actions Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Send sx={{ mr: 1 }} />
                Quick Actions
              </Typography>
              
              <Button
                variant="contained"
                startIcon={<Email />}
                onClick={sendBulkNotifications}
                fullWidth
                sx={{ mb: 2 }}
                disabled={overdueBooks.length === 0 || sending}
              >
                {sending ? 'Sending...' : `Notify All (${overdueBooks.length})`}
              </Button>

              <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>From:</strong> College Library
                </Typography>
                <Typography variant="body2">
                  
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Email Templates Quick Select */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Templates
              </Typography>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => setCustomMessage(emailTemplates.gentleReminder)}
              >
                Gentle Reminder
              </Button>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => setCustomMessage(emailTemplates.urgentReminder)}
              >
                Urgent Reminder
              </Button>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                onClick={() => setCustomMessage(emailTemplates.finalWarning)}
              >
                Final Warning
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Overdue Books List */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Warning sx={{ mr: 1, color: 'error.main' }} />
              Overdue Books - Email Notifications
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell>Book</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Days Overdue</TableCell>
                    <TableCell>Fine</TableCell>
                    <TableCell>Last Notified</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overdueBooks.map((borrow) => {
                    const studentNotifications = getNotificationHistory(borrow.studentId, borrow.bookId);
                    const lastNotification = studentNotifications[studentNotifications.length - 1];

                    return (
                      <TableRow key={borrow.id}>
                        <TableCell>
                          <Typography fontWeight="bold">{borrow.studentName}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {borrow.studentEmail}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">{borrow.bookTitle}</Typography>
                          <Typography variant="body2">{borrow.bookAuthor}</Typography>
                        </TableCell>
                        <TableCell>{borrow.dueDate}</TableCell>
                        <TableCell>
                          <Chip 
                            label={`${borrow.daysOverdue} days`} 
                            color={
                              borrow.daysOverdue <= 7 ? 'warning' : 
                              borrow.daysOverdue <= 14 ? 'error' : 'default'
                            } 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          <Typography color="error.main" fontWeight="bold">
                            ${borrow.fineAmount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {lastNotification ? (
                            <Typography variant="body2">
                              {lastNotification.sentDate}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              Never
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            startIcon={<Email />}
                            onClick={() => handleSendNotification(borrow)}
                            size="small"
                            variant="contained"
                            disabled={sending}
                          >
                            Send Email
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {overdueBooks.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircle color="success" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" color="success.main">
                  No Overdue Books
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  All books are returned on time!
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Send Notification Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Email sx={{ mr: 1, verticalAlign: 'middle' }} />
          Send Email to {selectedStudent?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Email will be sent from: <strong>logeshwaranv19@gmail.com</strong>
            </Alert>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Notification Method</InputLabel>
              <Select
                value={notificationMethod}
                label="Notification Method"
                onChange={(e) => setNotificationMethod(e.target.value)}
              >
                <MenuItem value="email">
                  <Email sx={{ mr: 1 }} />
                  Email
                </MenuItem>
                <MenuItem value="sms">
                  <Sms sx={{ mr: 1 }} />
                  SMS
                </MenuItem>
                <MenuItem value="both">
                  <Notifications sx={{ mr: 1 }} />
                  Both Email & SMS
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={12}
              label="Email Content"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Compose your email notification..."
              disabled={sending}
            />

            {selectedStudent && selectedBorrow && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Recipient & Book Details:
                </Typography>
                <Typography variant="body2">
                  <strong>To:</strong> {selectedStudent.email} ({selectedStudent.name})
                </Typography>
                <Typography variant="body2">
                  <strong>Book:</strong> {selectedBook.title} by {selectedBook.author}
                </Typography>
                <Typography variant="body2">
                  <strong>Due Date:</strong> {selectedBorrow.dueDate}
                </Typography>
                <Typography variant="body2">
                  <strong>Days Overdue:</strong> {selectedBorrow.daysOverdue}
                </Typography>
                <Typography variant="body2">
                  <strong>Fine:</strong> ${selectedBorrow.fineAmount}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={sending}>
            Cancel
          </Button>
          <Button 
            onClick={sendNotification}
            variant="contained"
            startIcon={sending ? null : <Send />}
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send Email'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationManager;