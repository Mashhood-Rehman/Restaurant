import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreLoader from './PreLoader';

function UserLocation() {
  const [showPopup, setShowPopup] = useState(true);
  const [locationName, setLocationName] = useState('');
  const [showLocationButton, setShowLocationButton] = useState(false);
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleAllowLocation = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const { display_name } = response.data;
            setLocationName(display_name);
            setShowLocationButton(true);
            setShowPopup(false);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching location details:', error);
            alert('Unable to retrieve location details.');
            setLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location.');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowPopup(false);
  };

  const handleHover = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  useEffect(() => {
    if (showLocationButton) {
      setShowLocationDetails(true);
    }
  }, [showLocationButton]);

  return (
    <div className="flex items-center justify-center z bg-gray-100">
      {showPopup && (
        <div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Share your live location?</h2>
          <p className="text-gray-600 mb-4">This will help us provide more relevant information.</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleAllowLocation}
          >
            Allow
          </button>
          <button
            className="bg-gray-300 my-3 hover:bg-gray-400 text-gray-800 mr-2 w-20 font-bold py-2 px-4 rounded"
            onClick={handleBack}
          >
            Back
          </button>
          <PreLoader loading={loading} setLoading={setLoading} />
        </div>
      )}

      <div
        className="absolute top-16 left-0 p-4"
        onMouseOver={handleHover}
        onMouseOut={handleMouseOut}
      >
        {showLocationButton && !hover && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Show Live Location
          </button>
        )}
        {hover && showLocationDetails && (
          <div>
            <h2>Location Details:</h2>
            <p>Location Name: {locationName}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLocation;