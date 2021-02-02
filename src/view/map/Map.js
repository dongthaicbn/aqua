import React from 'react';
import MapGoogle from './components/MapGoogle';

const Map = (props) => {
  return (
    <div
      style={{
        height: 'calc(100vh - 64px)',
        width: '100%',
        background: '#F5F5F5',
      }}
    >
      <MapGoogle />
    </div>
  );
};

export default Map;
