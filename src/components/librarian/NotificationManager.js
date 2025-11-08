import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
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
  CheckCircle,
  Groups
} from '@mui/icons-material';

const NotificationManager = () => {
  const mockOverdueBooks = [
    {
      id: 1,
      bookId: 2,
      studentId: 1,
      studentName: 'Reyaash',
      studentEmail: 'reyaash@gmail.com',
      studentDepartment: 'IT',
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
      studentDepartment: 'ECE',
      bookTitle: 'Operating System Concepts',
      bookAuthor: 'Abraham Silberschatz',
      dueDate: '2024-01-25',
      daysOverdue: 2,
      fineAmount: 10
    },
    {
      id: 3,
      bookId: 5,
      studentId: 3,
      studentName: 'Priya',
      studentEmail: 'priya@gmail.com',
      studentDepartment: 'IT',
      bookTitle: 'Data Structures',
      bookAuthor: 'Mark Allen Weiss',
      dueDate: '2024-01-18',
      daysOverdue: 7,
      fineAmount: 15
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
  const [openDepartmentDialog, setOpenDepartmentDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [notificationMethod, setNotificationMethod] = useState('email');
  const [customMessage, setCustomMessage] = useState('');
  const [departmentMessage, setDepartmentMessage] = useState('');
  const [sentNotifications, setSentNotifications] = useState(mockNotificationHistory);
  const [successAlert, setSuccessAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [sending, setSending] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);

  const overdueBooks = mockOverdueBooks;
  const departments = [...new Set(overdueBooks.map(book => book.studentDepartment))];
  const getOverdueStudentsByDepartment = (department) =>
    overdueBooks.filter(book => book.studentDepartment === department);

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
`,

    departmentReport: `Department Overdue Books Report - {department}

Dear {department} Department Head,

The following students from your department have overdue library books that require immediate attention:

{student_list}

Total Overdue Books: {total_count}
Total Outstanding Fines: {total_fines}

Please advise these students to return their books immediately to avoid further penalties.

Best regards,
College Library Administration
`
  };

  const getNotificationHistory = (studentId, bookId) =>
    sentNotifications.filter(notif =>
      notif.studentId === studentId && notif.bookId === bookId
    );

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

    let template;
    if (borrow.daysOverdue <= 7) template = emailTemplates.gentleReminder;
    else if (borrow.daysOverdue <= 14) template = emailTemplates.urgentReminder;
    else template = emailTemplates.finalWarning;

    const message = template
      .replace(/{student_name}/g, borrow.studentName)
      .replace(/{book_title}/g, borrow.bookTitle)
      .replace(/{book_author}/g, borrow.bookAuthor)
      .replace(/{due_date}/g, borrow.dueDate)
      .replace(/{days_overdue}/g, borrow.daysOverdue);

    const messageWithFine = `${message}\n\nFine Amount: ${borrow.fineAmount}`;
    setCustomMessage(messageWithFine);
    setOpenDialog(true);
  };

  const handleSendDepartmentNotification = () => {
    if (!selectedDepartment) {
      setErrorAlert('Please select a department');
      return;
    }

    const departmentStudents = getOverdueStudentsByDepartment(selectedDepartment);
    if (departmentStudents.length === 0) {
      setErrorAlert(`No overdue books found for ${selectedDepartment} department`);
      return;
    }

    const studentList = departmentStudents.map(student =>
      `• ${student.studentName} (${student.studentEmail}) - "${student.bookTitle}" - Due: ${student.dueDate} - Days Overdue: ${student.daysOverdue} - Fine: ${student.fineAmount}`
    ).join('\n');

    const totalFines = departmentStudents.reduce((sum, student) => sum + student.fineAmount, 0);
    const message = emailTemplates.departmentReport
      .replace(/{department}/g, selectedDepartment)
      .replace(/{student_list}/g, studentList)
      .replace(/{total_count}/g, departmentStudents.length)
      .replace(/{total_fines}/g, totalFines);

    setDepartmentMessage(message);
    setOpenDepartmentDialog(true);
  };

  /** ---------- EMAILJS INTEGRATION STARTS HERE ---------- **/

  const sendEmailNotification = async (studentEmail, studentName, bookDetails, messageContent) => {
    try {
      const templateParams = {
        to_name: studentName,
        to_email: studentEmail,
        subject: `Library Overdue Notice - ${bookDetails.title}`,
        message: messageContent
      };

      const result = await emailjs.send(
        'service_wpna1jc',
        'template_fleygfc',
        templateParams,
        'dolJchDKVTn_oqmkB'
      );

      console.log('EmailJS Response:', result.text);
      return { success: true };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return { success: false, message: error.text || 'EmailJS sending failed' };
    }
  };

  const sendDepartmentEmailNotification = async (department, messageContent) => {
    try {
      const templateParams = {
        to_name: `${department} Department Head`,
        to_email: 'departmenthead@gmail.com', // You can dynamically assign later
        subject: `Overdue Report - ${department} Department`,
        message: messageContent
      };

      const result = await emailjs.send(
        'service_wpna1jc',
        'template_fleygfc',
        templateParams,
        'dolJchDKVTn_oqmkB'
      );

      console.log('Department Email Sent:', result.text);
      return { success: true };
    } catch (error) {
      console.error('EmailJS Department Error:', error);
      return { success: false, message: error.text || 'Department email failed' };
    }
  };

  /** ---------- BULK NOTIFICATIONS FUNCTION ---------- **/
  const sendBulkNotifications = async () => {
    if (overdueBooks.length === 0) return;
    
    setSending(true);
    setBulkProgress(0);
    setErrorAlert('');

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < overdueBooks.length; i++) {
      const borrow = overdueBooks[i];
      
      try {
        let template;
        if (borrow.daysOverdue <= 7) template = emailTemplates.gentleReminder;
        else if (borrow.daysOverdue <= 14) template = emailTemplates.urgentReminder;
        else template = emailTemplates.finalWarning;

        const message = template
          .replace(/{student_name}/g, borrow.studentName)
          .replace(/{book_title}/g, borrow.bookTitle)
          .replace(/{book_author}/g, borrow.bookAuthor)
          .replace(/{due_date}/g, borrow.dueDate)
          .replace(/{days_overdue}/g, borrow.daysOverdue);

        const messageWithFine = `${message}\n\nFine Amount: ${borrow.fineAmount}`;

        const result = await sendEmailNotification(
          borrow.studentEmail,
          borrow.studentName,
          {
            id: borrow.bookId,
            title: borrow.bookTitle,
            author: borrow.bookAuthor
          },
          messageWithFine
        );

        if (result.success) {
          successCount++;
          const newNotification = {
            id: sentNotifications.length + i + 1,
            studentId: borrow.studentId,
            bookId: borrow.bookId,
            type: 'overdue',
            message: messageWithFine,
            sentDate: new Date().toISOString().split('T')[0],
            method: 'email',
            status: 'sent'
          };
          setSentNotifications(prev => [...prev, newNotification]);
        } else {
          failCount++;
        }
      } catch (error) {
        failCount++;
        console.error(`Failed to send to ${borrow.studentName}:`, error);
      }

      // Update progress
      const progress = Math.round(((i + 1) / overdueBooks.length) * 100);
      setBulkProgress(progress);
    }

    setSending(false);
    setBulkProgress(0);

    if (failCount === 0) {
      setSuccessAlert(`✅ Successfully sent ${successCount} notifications!`);
    } else if (successCount === 0) {
      setErrorAlert(`❌ Failed to send all ${failCount} notifications`);
    } else {
      setSuccessAlert(`✅ Sent ${successCount} notifications, ${failCount} failed`);
    }

    setTimeout(() => {
      setSuccessAlert('');
      setErrorAlert('');
    }, 5000);
  };

  /** ---------- EMAILJS INTEGRATION ENDS HERE ---------- **/

  const sendNotification = async () => {
    if (!selectedStudent || !selectedBook || !selectedBorrow) return;
    setSending(true);
    setErrorAlert('');

    try {
      const result = await sendEmailNotification(
        selectedStudent.email,
        selectedStudent.name,
        selectedBook,
        customMessage
      );

      if (result.success) {
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
        setSuccessAlert(`✅ Email sent to ${selectedStudent.name}`);
        setOpenDialog(false);
      } else {
        setErrorAlert(`❌ Failed: ${result.message}`);
      }
    } catch (error) {
      setErrorAlert(`❌ Error: ${error.message}`);
    } finally {
      setSending(false);
      setTimeout(() => {
        setSuccessAlert('');
        setErrorAlert('');
      }, 5000);
    }
  };

  const sendDepartmentNotification = async () => {
    if (!selectedDepartment) return;
    setSending(true);
    setErrorAlert('');

    try {
      const result = await sendDepartmentEmailNotification(selectedDepartment, departmentMessage);
      if (result.success) {
        const departmentStudents = getOverdueStudentsByDepartment(selectedDepartment);
        const newNotifications = departmentStudents.map((student, index) => ({
          id: sentNotifications.length + index + 1,
          studentId: student.studentId,
          bookId: student.bookId,
          type: 'department_report',
          message: `Department notification sent for ${selectedDepartment}`,
          sentDate: new Date().toISOString().split('T')[0],
          method: 'email',
          status: 'sent'
        }));
        setSentNotifications([...sentNotifications, ...newNotifications]);
        setSuccessAlert(`✅ Department email sent for ${selectedDepartment}`);
        setOpenDepartmentDialog(false);
      } else {
        setErrorAlert(`❌ Failed to send: ${result.message}`);
      }
    } catch (error) {
      setErrorAlert(`❌ Error: ${error.message}`);
    } finally {
      setSending(false);
      setTimeout(() => {
        setSuccessAlert('');
        setErrorAlert('');
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

              {/* Department Notification Section */}
              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Groups sx={{ mr: 1 }} />
                  Department Notifications
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Select Department</InputLabel>
                  <Select
                    value={selectedDepartment}
                    label="Select Department"
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    {departments.map(dept => (
                      <MenuItem key={dept} value={dept}>
                        {dept} (
                          <Typography 
                            component="span" 
                            sx={{ 
                              color: 'green.main', 
                              fontWeight: 'bold',
                              fontSize: '0.9rem'
                            }}
                          >
                            {getOverdueStudentsByDepartment(dept).length} overdue
                          </Typography>
                        )
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="outlined"
                  startIcon={<Groups />}
                  onClick={handleSendDepartmentNotification}
                  fullWidth
                  disabled={!selectedDepartment || sending}
                >
                  Notify Department
                </Button>

                {selectedDepartment && (
                  <Box sx={{ mt: 1, p: 1, backgroundColor: 'success.light', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ color: 'success.dark' }}>
                      <strong>{selectedDepartment}:</strong> 
                      <Typography 
                        component="span" 
                        sx={{ 
                          color: 'success.main', 
                          fontWeight: 'bold',
                          ml: 0.5
                        }}
                      >
                        {getOverdueStudentsByDepartment(selectedDepartment).length} overdue books
                      </Typography>
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>From:</strong> College Library
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> logeshwaranv19@gmail.com
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Email Templates Quick Select */}
          
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
                    <TableCell>Department</TableCell>
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
                          <Chip 
                            label={borrow.studentDepartment} 
                            color="primary" 
                            size="small" 
                          />
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
                            {borrow.fineAmount}
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
                  <strong>Fine:</strong> {selectedBorrow.fineAmount}
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

      {/* Department Notification Dialog */}
      <Dialog open={openDepartmentDialog} onClose={() => setOpenDepartmentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Groups sx={{ mr: 1, verticalAlign: 'middle' }} />
          Send Department Notification - {selectedDepartment}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              This email will be sent to the department head with a list of all overdue students from {selectedDepartment} department.
            </Alert>

            <TextField
              fullWidth
              multiline
              rows={15}
              label="Department Report Content"
              value={departmentMessage}
              onChange={(e) => setDepartmentMessage(e.target.value)}
              placeholder="Department overdue report content..."
              disabled={sending}
            />

            {selectedDepartment && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'success.light', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'success.dark' }}>
                  Department Summary:
                </Typography>
                <Typography variant="body2" sx={{ color: 'success.dark' }}>
                  <strong>Department:</strong> {selectedDepartment}
                </Typography>
                <Typography variant="body2" sx={{ color: 'success.dark' }}>
                  <strong>Total Overdue Books:</strong> 
                  <Typography 
                    component="span" 
                    sx={{ 
                      color: 'success.main', 
                      fontWeight: 'bold',
                      ml: 0.5
                    }}
                  >
                    {getOverdueStudentsByDepartment(selectedDepartment).length}
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ color: 'success.dark' }}>
                  <strong>Total Fines:</strong> 
                  <Typography 
                    component="span" 
                    sx={{ 
                      color: 'success.main', 
                      fontWeight: 'bold',
                      ml: 0.5
                    }}
                  >
                    {getOverdueStudentsByDepartment(selectedDepartment).reduce((sum, student) => sum + student.fineAmount, 0)}
                  </Typography>
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDepartmentDialog(false)} disabled={sending}>
            Cancel
          </Button>
          <Button 
            onClick={sendDepartmentNotification}
            variant="contained"
            startIcon={sending ? null : <Send />}
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send Department Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationManager;
