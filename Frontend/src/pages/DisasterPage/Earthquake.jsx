import React from 'react';

function Earthquake() {
  return (
    <div className="earthquake-awareness">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

          .earthquake-awareness {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(180deg, #eaf7ea, #f2f7f2);
            color: #333;
            line-height: 1.6;
          }

          .hero {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1610056416029-5b1016e1db90?auto=format&fit=crop&w=1920&q=80');
            background-size: cover;
            background-position: center;
            color: white;
            border-radius: 12px;
            margin-bottom: 2rem;
            animation: fadeIn 1s ease-in;
          }

          .hero h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          }

          .hero p {
            font-size: clamp(1rem, 2vw, 1.25rem);
            max-width: 800px;
            margin: 0 auto;
          }

          section {
            margin: 2rem 0;
            padding: 1.5rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            animation: slideUp 0.8s ease-out;
            opacity: 0;
            animation-fill-mode: forwards;
          }

          section:nth-child(2) { animation-delay: 0.2s; }
          section:nth-child(3) { animation-delay: 0.4s; }
          section:nth-child(4) { animation-delay: 0.6s; }
          section:nth-child(5) { animation-delay: 0.8s; }
          section:nth-child(6) { animation-delay: 1s; }
          section:nth-child(7) { animation-delay: 1.2s; }

          h2 {
            font-size: clamp(1.5rem, 3vw, 2rem);
            color: #5cb85c;
            margin-bottom: 1rem;
            font-weight: 700;
          }

          p, li {
            font-size: clamp(0.9rem, 1.5vw, 1rem);
            margin-bottom: 0.75rem;
          }

          ul {
            list-style: none;
            padding: 0;
          }

          li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
          }

          li::before {
            content: '🌍';
            position: absolute;
            left: 0;
            font-size: 1rem;
          }

          .timeline {
            display: grid;
            gap: 1.5rem;
            margin-top: 1rem;
          }

          .timeline-item {
            padding: 1rem;
            background: #f8f8f8;
            border-left: 4px solid #5cb85c;
            border-radius: 4px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .timeline-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.15);
          }

          .stat-container {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            margin: 1.5rem 0;
          }

          .stat-card {
            background: #5cb85c;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            flex: 1;
            min-width: 200px;
            transition: transform 0.3s ease;
          }

          .stat-card:hover {
            transform: scale(1.05);
          }

          .stat-card h3 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          .cta-button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: #5cb85c;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.3s ease;
            margin-top: 1rem;
          }

          .cta-button:hover {
            background: #4cae4c;
            transform: scale(1.05);
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            .earthquake-awareness {
              padding: 1.5rem 0.75rem;
            }
            .hero {
              padding: 2rem 0.75rem;
            }
            .hero h1 {
              font-size: clamp(1.75rem, 4vw, 2.5rem);
            }
            section {
              padding: 1rem;
            }
            .stat-card {
              min-width: 150px;
            }
          }

          @media (max-width: 480px) {
            .hero h1 {
              font-size: clamp(1.5rem, 3.5vw, 2rem);
            }
            .hero p {
              font-size: clamp(0.875rem, 1.8vw, 1rem);
            }
            h2 {
              font-size: clamp(1.25rem, 2.5vw, 1.5rem);
            }
            .timeline-item {
              padding: 0.75rem;
            }
            .cta-button {
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="hero" role="banner">
        <h1>Earthquake Awareness</h1>
        <p>
          Learn how to prepare for, survive, and recover from earthquakes. Stay prepared, stay safe.
        </p>
        <a href="#safety-tips" className="cta-button">Discover Safety Tips</a>
      </div>

      {/* What is an Earthquake */}
      <section>
        <h2>What is an Earthquake?</h2>
        <p>
          An earthquake is the sudden shaking of the Earth's surface caused by the release of energy in the lithosphere. Triggered by tectonic plate movements or volcanic activity, earthquakes can cause widespread damage. Over 1 million detectable earthquakes occur globally each year, with major ones impacting thousands.
        </p>
      </section>

      {/* Causes */}
      <section>
        <h2>Causes of Earthquakes</h2>
        <ul>
          <li>Movement of tectonic plates along fault lines.</li>
          <li>Volcanic eruptions releasing subsurface pressure.</li>
          <li>Human-induced activities like mining or reservoir filling.</li>
          <li>Seismic activity in fault zones storing elastic energy.</li>
        </ul>
      </section>

      {/* Effects */}
      <section>
        <h2>Effects of Earthquakes</h2>
        <ul>
          <li>Structural damage to buildings, bridges, and infrastructure.</li>
          <li>Loss of life and injuries from collapsing structures.</li>
          <li>Secondary disasters like landslides, tsunamis, or fires.</li>
          <li>Economic disruption and displacement of communities.</li>
        </ul>
        <div className="stat-container">
          <div className="stat-card">
            <h3>500K</h3>
            <p>earthquakes annually worldwide</p>
          </div>
          <div className="stat-card">
            <h3>$100B</h3>
            <p>average economic loss per decade</p>
          </div>
          <div className="stat-card">
            <h3>80%</h3>
            <p>of quakes near plate boundaries</p>
          </div>
        </div>
      </section>

      {/* Prevention and Cure */}
      <section>
        <h2>Prevention and Cure</h2>
        <p>
          While earthquakes cannot be prevented, preparation and resilient design can minimize damage. Recovery focuses on rebuilding and supporting affected communities.
        </p>
        <ul>
          <li><strong>Building Codes</strong>: Enforce seismic-resistant construction standards.</li>
          <li><strong>Early Warning Systems</strong>: Deploy sensors to alert communities seconds before shaking.</li>
          <li><strong>Public Education</strong>: Train residents on safety drills like Drop, Cover, Hold On.</li>
          <li><strong>Post-Quake Recovery</strong>: Provide medical care, temporary shelters, and rebuild with stronger materials.</li>
        </ul>
      </section>

      {/* Safety Tips: Before, During, After */}
      <section id="safety-tips">
        <h2>Safety Tips: Before, During, and After</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Before an Earthquake</h3>
            <ul>
              <li>Secure heavy objects and anchor furniture to walls.</li>
              <li>Create an emergency kit with food, water, and first-aid supplies.</li>
              <li>Develop a family evacuation and communication plan.</li>
              <li>Identify safe spots in each room (e.g., under sturdy tables).</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>During an Earthquake</h3>
            <ul>
              <li>Drop, Cover, and Hold On under sturdy furniture.</li>
              <li>Stay away from glass, windows, and heavy objects.</li>
              <li>If outdoors, move to an open area away from buildings.</li>
              <li>Avoid elevators and doorways; protect your head.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>After an Earthquake</h3>
            <ul>
              <li>Check for injuries and provide first aid if needed.</li>
              <li>Evacuate damaged buildings and avoid re-entering.</li>
              <li>Be prepared for aftershocks and stay informed.</li>
              <li>Support community recovery through volunteering or donations.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center' }}>
        <h2>Take Action Now</h2>
        <p>
          Earthquakes strike without warning, but preparation saves lives. Share this knowledge and stay proactive.
        </p>
        <a href="https://www.usgs.gov/natural-hazards/earthquake-hazards" target="_blank" rel="noopener noreferrer" className="cta-button">
          Learn More from USGS
        </a>
      </section>
    </div>
  );
}

export default Earthquake;