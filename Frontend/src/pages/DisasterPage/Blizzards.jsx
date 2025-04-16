import React from 'react';

function Blizzards() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#5bc0de' }}>Blizzard Awareness</h1>

      <h2>What is a Blizzard?</h2>
      <p>A blizzard is a severe snowstorm characterized by strong winds and low visibility, lasting several hours or more.</p>

      <h2>Causes</h2>
      <ul>
        <li>Cold air and moisture</li>
        <li>Warm air rising over cold air</li>
        <li>Strong pressure systems</li>
      </ul>

      <h2>Effects</h2>
      <ul>
        <li>Travel disruptions and roadblocks</li>
        <li>Power outages and freezing</li>
        <li>Hypothermia and frostbite risks</li>
      </ul>

      <h2>Safety Tips</h2>
      <ul>
        <li>Stay indoors during snowstorms</li>
        <li>Stock up food, water, and batteries</li>
        <li>Wear layers and stay warm</li>
      </ul>
    </div>
  );
}

export default Blizzards;
