import React from 'react';

function Pandemic() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#d9534f' }}>Pandemic Awareness</h1>

      <h2>What is a Pandemic?</h2>
      <p>A pandemic is a global outbreak of a disease affecting large numbers of people across countries or continents.</p>

      <h2>Causes</h2>
      <ul>
        <li>Spread of infectious diseases</li>
        <li>Lack of immunity in the population</li>
        <li>Global travel and contact</li>
      </ul>

      <h2>Effects</h2>
      <ul>
        <li>Health crisis and fatalities</li>
        <li>Economic disruptions</li>
        <li>Mental health issues</li>
      </ul>

      <h2>Safety Tips</h2>
      <ul>
        <li>Maintain hygiene and sanitation</li>
        <li>Follow health guidelines and get vaccinated</li>
        <li>Practice social distancing and wear masks</li>
      </ul>
    </div>
  );
}

export default Pandemic;
