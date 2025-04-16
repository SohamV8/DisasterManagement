import React from 'react';

function Cyclone() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#337ab7' }}>Cyclone Awareness</h1>

      <h2>What is a Cyclone?</h2>
      <p>A cyclone is a system of winds rotating inward to an area of low pressure, usually bringing strong winds and heavy rain.</p>

      <h2>Causes</h2>
      <ul>
        <li>Warm ocean waters</li>
        <li>Atmospheric instability</li>
        <li>Low-pressure areas</li>
      </ul>

      <h2>Effects</h2>
      <ul>
        <li>Flooding and property damage</li>
        <li>High-speed winds causing destruction</li>
        <li>Disruption of communication and power</li>
      </ul>

      <h2>Safety Tips</h2>
      <ul>
        <li>Stay indoors during the storm</li>
        <li>Evacuate low-lying areas</li>
        <li>Keep emergency supplies ready</li>
      </ul>
    </div>
  );
}

export default Cyclone;
