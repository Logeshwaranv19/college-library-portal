import emailjs from '@emailjs/browser';

// Initialize EmailJS with your credentials
const EMAILJS_PUBLIC_KEY = 'dolJchDKVTn_oqmkB';
const EMAILJS_SERVICE_ID = 'service_wpna1jc';
const EMAILJS_TEMPLATE_ID = 'template_fleygfc';

emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendOverdueNotification = async (studentEmail, studentName, bookDetails) => {
  try {
    const templateParams = {
      to_email: studentEmail,
      to_name: studentName,
      from_name: 'College Library',
      from_email: 'logeshwaranv19@gmail.com',
      book_title: bookDetails.title,
      book_author: bookDetails.author,
      due_date: bookDetails.dueDate,
      days_overdue: bookDetails.daysOverdue,
      fine_amount: bookDetails.fineAmount,
      student_name: studentName,
      current_date: new Date().toLocaleDateString()
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, message: 'Notification sent successfully' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: 'Failed to send notification' };
  }
};

export const sendBulkOverdueNotifications = async (overdueList) => {
  const results = [];
  
  for (const student of overdueList) {
    try {
      const result = await sendOverdueNotification(
        student.email,
        student.name,
        student.bookDetails
      );
      results.push({
        student: student.name,
        success: result.success,
        message: result.message
      });
    } catch (error) {
      results.push({
        student: student.name,
        success: false,
        message: 'Failed to send notification'
      });
    }
  }
  
  return results;
};