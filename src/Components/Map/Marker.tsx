import React from 'react';
import './Marker.scss';

const Marker = (props: any) => {
  const { color, name } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      />
      <div className="pulse" />
    </div>
  );
};

export default Marker;