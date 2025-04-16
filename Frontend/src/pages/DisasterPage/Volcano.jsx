import React from 'react';

function Volcano() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#d9534f' }}>Volcano Eruption Awareness</h1>
      
      <section>
        <h2>What is a Volcano?</h2>
        <p>
          A volcano is a rupture in the Earth's crust where molten lava, ash, and gases escape. 
          Eruptions can be explosive or slow-flowing, and they often reshape landscapes.
        </p>
      </section>

      <section>
        <h2>Causes</h2>
        <ul>
          <li>Movement of tectonic plates</li>
          <li>Pressure buildup in magma chambers</li>
          <li>Subduction zones and hot spots</li>
        </ul>
      </section>

      <section>
        <h2>Effects</h2>
        <ul>
          <li>Destruction of life and property</li>
          <li>Air pollution and ash clouds</li>
          <li>Climate changes and acid rain</li>
        </ul>
      </section>

      <section>
        <h2>Safety Tips</h2>
        <ul>
          <li>Evacuate immediately when authorities warn</li>
          <li>Use masks to avoid ash inhalation</li>
          <li>Keep emergency kits ready</li>
          <li>Stay indoors and close windows during ashfall</li>
        </ul>
      </section>
    </div>
  );
}

export default Volcano;
