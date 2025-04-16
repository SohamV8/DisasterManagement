import React from 'react';

function Landslide() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#f0ad4e' }}>Landslide Awareness</h1>

      <h2>What is a Landslide?</h2>
      <p>A landslide is the movement of rock, earth, or debris down a slope due to gravity.</p>

      <h2>Causes</h2>
      <ul>
        <li>Heavy rainfall</li>
        <li>Earthquakes</li>
        <li>Human construction activities</li>
      </ul>

      <h2>Effects</h2>
      <ul>
        <li>Damage to infrastructure</li>
        <li>Burial of habitats and roads</li>
        <li>Loss of life</li>
      </ul>

      <h2>Safety Tips</h2>
      <ul>
        <li>Avoid hilly areas during heavy rains</li>
        <li>Listen to official warnings</li>
        <li>Build retaining walls where necessary</li>
      </ul>
    </div>
  );
}

export default Landslide;
