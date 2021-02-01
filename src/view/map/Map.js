import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Map.scss';

const Map = (props) => {
  return (
    <div className="solution-container">
      <p className="total-text">Map</p>
    </div>
  );
};
export default connect((state) => ({}), {})(withRouter(Map));
