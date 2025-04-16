import React from 'react';

function Floods() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#5bc0de' }}>Flood Awareness</h1>

      <h2>What is a Flood?</h2>
      <p>A flood is an overflow of water that submerges land which is usually dry, often caused by heavy rainfall or melting snow.</p>

      <h2>Causes</h2>
      <ul>
        <li>Heavy rainfall</li>
        <li>River overflow</li>
        <li>Dam breakage</li>
      </ul>

      <h2>Effects</h2>
      <ul>
        <li>Loss of property and life</li>
        <li>Waterborne diseases</li>
        <li>Displacement of people</li>
      </ul>

      <h2>Safety Tips</h2>
      <ul>
        <li>Evacuate if instructed</li>
        <li>Avoid walking or driving through floodwaters</li>
        <li>Stay informed with weather alerts</li>
      </ul>
    </div>
  );
}

export default Floods;
