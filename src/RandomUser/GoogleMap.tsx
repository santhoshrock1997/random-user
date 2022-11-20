import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './RandomUser.scss';

const containerStyle = {
  width: '200px',
  height: '200px',
};

function MyComponent(props: any) {
  const { coordinates } = props;
  const API_KEY = process.env.REACT_APP_API_KEY || '';

  const center = {
    lat: parseInt(coordinates?.latitude) || -11,
    lng: parseInt(coordinates?.longitude) || 10,
  };

  return (
    <div className="google-styles">
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(MyComponent);
