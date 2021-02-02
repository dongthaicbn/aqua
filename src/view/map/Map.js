import React from 'react';
import { withRouter } from 'react-router-dom';
import MapGoogle from './components/MapGoogle';

const Map = (props) => {
  console.log('match', props.match);
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

export default withRouter(Map);
