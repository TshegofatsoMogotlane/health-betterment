const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure environment variables are loaded

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app password
  }
});

// Function to send a booking confirmation email
async function sendBookingConfirmation(recipientEmail, bookingDetails) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: recipientEmail, // List of recipients
    subject: 'Booking Confirmation', // Subject line
    text: `Dear User,

Your booking has been confirmed!

Professional: ${bookingDetails.professional}
Start Date & Time: ${bookingDetails.startDateTime}
End Date & Time: ${bookingDetails.endDateTime}

Thank you for choosing our service.

Best regards,
Your Company Name`, // Plain text body
    html: `<p>Dear User,</p>
           <p>Your booking has been confirmed!</p>
           <p><strong>Professional:</strong> ${bookingDetails.professional}</p>
           <p><strong>Start Date & Time:</strong> ${bookingDetails.startDateTime}</p>
           <p><strong>End Date & Time:</strong> ${bookingDetails.endDateTime}</p>
           <p>Thank you for choosing our service.</p>
           <p>Best regards,<br>Your Company Name</p>` // HTML body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

module.exports = { sendBookingConfirmation };








