const fs = require('fs');
const path = require('path');

// Utility function to check if a time slot is available
async function checkAvailability(startDateTime, endDateTime, professionalId) {
  const dbPath = path.join(__dirname, 'db.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const bookings = data.bookings || [];

  for (const booking of bookings) {
    if (booking.professionalId === professionalId) {
      // Check if the booking times overlap
      if (
        (startDateTime < booking.endDateTime && endDateTime > booking.startDateTime)
      ) {
        return false; // Time slot is already booked
      }
    }
  }
  return true; // Time slot is available
}

module.exports = { checkAvailability };
