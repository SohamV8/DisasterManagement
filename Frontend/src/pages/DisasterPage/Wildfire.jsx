import React from 'react';

function Wildfire() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#f0ad4e' }}>Wildfire Awareness</h1>

      <h2>What is a Wildfire?</h2>
      <p>A wildfire is an uncontrolled fire that spreads rapidly in forest or grassland areas.</p>

      <h2>Causes</h2>
      <ul>
        <li>Lightning strikes</li>
        <li>Human negligence (campfires, cigarettes)</li>
        <li>Dry and hot weather conditions</li>
      </ul>

      <h2>Effects</h2>
      <ul>
        <li>Destruction of forests and wildlife</li>
        <li>Air pollution and health issues</li>
        <li>Evacuation of communities</li>
      </ul>

      <h2>Safety Tips</h2>
      <ul>
        <li>Do not start fires in dry areas</li>
        <li>Evacuate early if a fire approaches</li>
        <li>Use masks to protect from smoke</li>
      </ul>
    </div>
  );
}

export default Wildfire;
