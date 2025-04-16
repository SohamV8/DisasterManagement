import React from 'react';

function Earthquake() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#5cb85c' }}>Earthquake Awareness</h1>

      <h2>What is an Earthquake?</h2>
      <p>An earthquake is the shaking of the surface of the Earth caused by a sudden release of energy in the lithosphere.</p>

      <h2>Causes</h2>
      <ul>
        <li>Movement of tectonic plates</li>
        <li>Volcanic eruptions</li>
        <li>Fault lines and seismic activity</li>
      </ul>

      <h2>Effects</h2>
      <ul>
        <li>Structural damage to buildings</li>
        <li>Loss of life and injury</li>
        <li>Landslides and tsunamis</li>
      </ul>

      <h2>Safety Tips</h2>
      <ul>
        <li>Drop, Cover, and Hold On</li>
        <li>Stay away from glass and heavy furniture</li>
        <li>Have an emergency evacuation plan</li>
      </ul>
    </div>
  );
}

export default Earthquake;
