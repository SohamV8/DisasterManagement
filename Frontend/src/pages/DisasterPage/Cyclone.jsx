import React from 'react';

function Cyclone() {
  return (
    <div className="cyclone-awareness">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

          .cyclone-awareness {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(180deg, #e8f1fa, #f2f8ff);
            color: #333;
            line-height: 1.6;
          }

          .hero {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1545249390-6b2aa45d66a6?auto=format&fit=crop&w=1920&q=80');
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
            color: #337ab7;
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
            content: '🌀';
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
            border-left: 4px solid #337ab7;
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
            background: #337ab7;
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
            background: #337ab7;
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
            background: #286090;
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
            .cyclone-awareness {
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
        <h1>Cyclone Awareness</h1>
        <p>
          Learn how to prepare for, survive, and recover from cyclones. Stay vigilant, stay safe.
        </p>
        <a href="#safety-tips" className="cta-button">Discover Safety Tips</a>
      </div>

      {/* What is a Cyclone */}
      <section>
        <h2>What is a Cyclone?</h2>
        <p>
          A cyclone is a powerful weather system characterized by strong winds rotating around a low-pressure center, often bringing heavy rain and storm surges. Known as hurricanes or typhoons in different regions, cyclones impact millions annually, causing widespread damage in coastal areas.
        </p>
      </section>

      {/* Causes */}
      <section>
        <h2>Causes of Cyclones</h2>
        <ul>
          <li>Warm ocean waters (above 26°C) fueling storm development.</li>
          <li>Atmospheric instability allowing air to rise and form clouds.</li>
          <li>Low-pressure areas drawing in surrounding winds.</li>
          <li>Earth’s rotation (Coriolis effect) initiating cyclonic spin.</li>
        </ul>
      </section>

      {/* Effects */}
      <section>
        <h2>Effects of Cyclones</h2>
        <ul>
          <li>Flooding and property damage from heavy rain and storm surges.</li>
          <li>High-speed winds destroying buildings and infrastructure.</li>
          <li>Disruption of power, communication, and transportation networks.</li>
          <li>Long-term economic and environmental impacts, including crop loss.</li>
        </ul>
        <div className="stat-container">
          <div className="stat-card">
            <h3>150</h3>
            <p>average cyclones globally per year</p>
          </div>
          <div className="stat-card">
            <h3>$80B</h3>
            <p>annual economic damage</p>
          </div>
          <div className="stat-card">
            <h3>40%</h3>
            <p>of damage from storm surges</p>
          </div>
        </div>
      </section>

      {/* Prevention and Cure */}
      <section>
        <h2>Prevention and Cure</h2>
        <p>
          While cyclones cannot be prevented, preparation and mitigation can reduce their impact. Recovery efforts focus on rebuilding and supporting affected communities.
        </p>
        <ul>
          <li><strong>Early Warning Systems</strong>: Use satellite monitoring and alerts to warn residents.</li>
          <li><strong>Coastal Defenses</strong>: Build seawalls and mangroves to reduce storm surge impact.</li>
          <li><strong>Community Preparedness</strong>: Educate residents on evacuation plans and safety measures.</li>
          <li><strong>Post-Cyclone Recovery</strong>: Provide clean water, medical aid, and rebuild with resilient infrastructure.</li>
        </ul>
      </section>

      {/* Safety Tips: Before, During, After */}
      <section id="safety-tips">
        <h2>Safety Tips: Before, During, and After</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Before a Cyclone</h3>
            <ul>
              <li>Prepare an emergency kit with food, water, and batteries.</li>
              <li>Secure windows with shutters or boards; reinforce doors.</li>
              <li>Know evacuation routes and local shelter locations.</li>
              <li>Monitor weather updates from trusted sources like NOAA.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>During a Cyclone</h3>
            <ul>
              <li>Stay indoors in a safe room away from windows.</li>
              <li>Evacuate immediately if in low-lying or flood-prone areas.</li>
              <li>Avoid using electrical appliances during power surges.</li>
              <li>Listen to emergency broadcasts for updates.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>After a Cyclone</h3>
            <ul>
              <li>Avoid flooded areas and downed power lines.</li>
              <li>Return home only when authorities declare it safe.</li>
              <li>Seek medical help for injuries or waterborne illnesses.</li>
              <li>Support community recovery through volunteering or donations.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center' }}>
        <h2>Take Action Now</h2>
        <p>
          Cyclones are unpredictable, but preparation saves lives. Share this knowledge and stay proactive.
        </p>
        <a href="https://www.ready.gov/hurricanes" target="_blank" rel="noopener noreferrer" className="cta-button">
          Learn More from Ready.gov
        </a>
      </section>
    </div>
  );
}

export default Cyclone;