import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DateTimePicker from './DateTimePicker'; // Import the DateTimePicker component
import "./BookingPage.css";

const BookingPage = () => {
  const { id } = useParams();
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get userInfo from Redux store
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/provinces');
        setProvinces(response.data);
      } catch (error) {
        setError('Error fetching provinces.');
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedHospital('');
    setProfessionals([]);
    setHospitals([]); // Clear hospitals when province changes

    if (provinceId) {
      try {
        const response = await axios.get(`http://localhost:5000/hospitals?provinceId=${provinceId}`);
        setHospitals(response.data);
      } catch (error) {
        setError('Error fetching hospitals.');
      }
    }
  };

  const handleHospitalChange = async (e) => {
    const hospitalId = e.target.value;
    setSelectedHospital(hospitalId);
    setProfessionals([]); // Clear professionals when hospital changes

    if (hospitalId) {
      try {
        let professionalsResponse = [];
        if (id === "1") {
          const response = await axios.get(`http://localhost:5000/psychologists?hospitalId=${hospitalId}`);
          professionalsResponse = response.data;
        } else if (id === "2") {
          const response = await axios.get(`http://localhost:5000/doctors?hospitalId=${hospitalId}`);
          professionalsResponse = response.data;
        }

        setProfessionals(professionalsResponse);
      } catch (error) {
        setError('Error fetching professionals.');
      }
    }
  };

  const handleProfessionalChange = (e) => {
    e.preventDefault();
    setSelectedProfessional(e.target.value);
  };

  const handleDateChange = (start, end) => {
    setStartDateTime(start);
    setEndDateTime(end);
  };

  const handleSubmit = async () => {
    if (!selectedProfessional) {
      alert('Please select a professional.');
      return;
    }

    if (!startDateTime || !endDateTime) {
      alert('Please select both start and end times.');
      return;
    }

    if (moment(startDateTime).isAfter(moment(endDateTime))) {
      alert('End time must be after start time.');
      return;
    }

    if (!userInfo || !userInfo.email) {
      alert('User email not found.');
      return;
    }

    const bookingDetails = {
      email: userInfo.email,
      professional: selectedProfessional,
      startDateTime: moment(startDateTime).format('YYYY-MM-DD HH:mm'),
      endDateTime: moment(endDateTime).format('YYYY-MM-DD HH:mm'),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/confirm-booking', bookingDetails);
      alert(response.data.message);
    } catch (error) {
      alert('Booking Made successfully.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book">
      <h1>Book Your Appointment</h1>
      <div className="provice_selection">
        <label htmlFor="province">Select Province:</label>
        <select className="provice_selection_sel" id="province" value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Select a province</option>
          {provinces.map(province => (
            <option key={province.id} value={province.id}>{province.name}</option>
          ))}
        </select>
      </div>
      {selectedProvince && (
        <div className="hospital_clinic_selection">
          <label htmlFor="hospital">Select Hospital/Clinic:</label>
          <select className="hospital_clinic_selection_sel" id="hospital" value={selectedHospital} onChange={handleHospitalChange}>
            <option value="">Select a hospital</option>
            {hospitals.map(hospital => (
              <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
            ))}
          </select>
        </div>
      )}
      {selectedHospital && professionals.length > 0 && (
        <div className="proffessional_selection">
          <h2>Select Professional</h2>
          <select className="proffessional_selection_options" value={selectedProfessional} onChange={handleProfessionalChange}>
            <option value="">Select a professional</option>
            {professionals.map(prof => (
              <option key={prof.id} value={prof.id}>{prof.name} - {prof.specialty}</option>
            ))}
          </select>
        </div>
      )}
      {selectedProfessional && (
        <div>
          <h2>Select Date and Time:</h2>
          <DateTimePicker
            startDate={startDateTime}
            endDate={endDateTime}
            onDateChange={handleDateChange}
            onBookAppointment={handleSubmit} // Pass handleSubmit as a prop
          />
        </div>
      )}
    </div>
  );
};

export default BookingPage;
























