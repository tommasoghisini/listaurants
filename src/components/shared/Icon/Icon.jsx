import React from 'react';

const Icon = ({ icon, fill }) => (
  <svg style={{ fill: fill }}>
    {icon}
  </svg>
);

export default Icon;