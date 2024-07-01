import React, { useState } from 'react';
import axios from 'axios';

function UserLocation() {
  const [showPopup, setShowPopup] = useState(true);
  const [locationName, setLocationName] = useState('');
  const [showLocationButton, setShowLocationButton] = useState(false);
  const [showLocationDetails, setShowLocationDetails] = useState(false);

  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const { display_name } = response.data;
            setLocationName(display_name);
            setShowLocationButton(true); 
            setShowPopup(false); 
          } catch (error) {
            console.error('Error fetching location details:', error);
            alert('Unable to retrieve location details.');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleShowLocationDetails = () => {
    setShowLocationDetails(true); 
  };

  const handleHideLocationDetails = () => {
    setShowLocationDetails(false); 
  };

  const handleBack = () => {
    setShowPopup(false);
  };

  return (
    <div className="App h-screen flex items-center justify-center bg-gray-100">
      {showPopup && (
        <div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg max-w-sm text-center">
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
        </div>
      )}

      {showLocationButton && (
        <div className="fixed left-4 top-1/4 -mt-24 ">
          <button
            className= "hover:bg-blue-500 bg-gray-300 -mt-96   text-gray-900 font-bold py-2 px-4 rounded"
            onMouseEnter={handleShowLocationDetails}
            onMouseLeave={handleHideLocationDetails}
          >
            Show Live Location
          </button>
          {showLocationDetails && (
            <div className="absolute left-0 top-0 bg-white p-4 shadow-lg rounded-lg mt-2">
              <p className="text-gray-600">Your current location:</p>
              <p className="font-bold w-52 h-36 border-sloid">{locationName}</p>
            </div>
          )}
        </div>
      )}
      </div>
  );
}

export default UserLocation;

