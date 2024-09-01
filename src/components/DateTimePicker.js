import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import PeopleIcon from "@mui/icons-material/People";
import { Button } from '@mui/material';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import './DateTimePicker.css'; // Import the CSS file
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'; // Import datetime styles

const DateTimePicker = ({ startDate, endDate, onDateChange, onBookAppointment }) => {
  const [numPatients, setNumPatients] = useState(2);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const handleSelect = (ranges) => {
    setSelectedStartDate(ranges.selection.startDate);
    setSelectedEndDate(ranges.selection.endDate);
    setShowTimePicker(true);
    onDateChange(ranges.selection.startDate, ranges.selection.endDate);
  };

  const handleNumberChange = (e) => {
    setNumPatients(e.target.value);
  };

  const handleDateTimeChange = (key, date) => {
    if (!date || !date.isValid()) return;

    const newDate = date.toDate(); // Ensure conversion to Date object
    if (key === 'start') {
      setSelectedStartDate(newDate);
      onDateChange(newDate, selectedEndDate);
    } else {
      setSelectedEndDate(newDate);
      onDateChange(selectedStartDate, newDate);
    }
  };

  const handleBooking = () => {
    if (!selectedStartDate || !selectedEndDate || numPatients <= 0) {
      alert('Please select a valid date, time, and number of patients.');
      return;
    }
    
    // Example of booking data structure
    const bookingDetails = {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      numPatients,
      professional: 'Doctor/Psychologist' // This could be dynamic based on your needs
    };

    // Trigger the booking action
    onBookAppointment(bookingDetails);
  };

  return (
    <div className="date-time-picker">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        className="date-range-picker"
      />
      {showTimePicker && (
        <div className="time-picker-container">
          <div>
            <label htmlFor="start-time">Start Time:</label>
            <DateTime
              id="start-time"
              value={selectedStartDate}
              onChange={(date) => handleDateTimeChange('start', date)}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
              inputProps={{ placeholder: 'Select start time' }}
            />
          </div>
          <div>
            <label htmlFor="end-time">End Time:</label>
            <DateTime
              id="end-time"
              value={selectedEndDate}
              onChange={(date) => handleDateTimeChange('end', date)}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
              inputProps={{ placeholder: 'Select end time' }}
            />
          </div>
        </div>
      )}
      <div className="info-section">
        <h2>
          Number of patients <PeopleIcon />
        </h2>
        <input
          min={0}
          value={numPatients}
          onChange={handleNumberChange}
          type="number"
        />
        <Button className="btn-select" onClick={handleBooking}>
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default DateTimePicker;













