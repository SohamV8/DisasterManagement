import React from 'react';

function Blizzards() {
  return (
    <div className="blizzard-awareness">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

          .blizzard-awareness {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(180deg, #f1f9ff, #e6f3fa);
            color: #333;
            line-height: 1.6;
          }

          .hero {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1485236715568-ddaa6e2e6597?auto=format&fit=crop&w=1920&q=80');
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
            color: #5bc0de;
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
            content: '❄️';
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
            border-left: 4px solid #5bc0de;
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
            background: #5bc0de;
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
            background: #5bc0de;
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
            background: #31b0d5;
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
            .blizzard-awareness {
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
        <h1>Blizzard Awareness</h1>
        <p>
          Learn how to prepare for, survive, and recover from blizzards. Stay warm, stay safe.
        </p>
        <a href="#safety-tips" className="cta-button">Discover Safety Tips</a>
      </div>

      {/* What is a Blizzard */}
      <section>
        <h2>What is a Blizzard?</h2>
        <p>
          A blizzard is a severe snowstorm defined by strong winds (at least 35 mph), heavy snow, and low visibility (less than a quarter mile) lasting three hours or more. Blizzards can paralyze regions, posing risks to life and infrastructure. In the U.S., blizzards affect millions annually, particularly in northern states.
        </p>
      </section>

      {/* Causes */}
      <section>
        <h2>Causes of Blizzards</h2>
        <ul>
          <li>Cold air masses colliding with moisture-heavy warm air.</li>
          <li>Warm air rising over dense cold air, creating heavy snowfall.</li>
          <li>Strong low-pressure systems driving high winds and storm conditions.</li>
          <li>Jet stream shifts amplifying cold weather patterns.</li>
        </ul>
      </section>

      {/* Effects */}
      <section>
        <h2>Effects of Blizzards</h2>
        <ul>
          <li>Travel disruptions from snow-covered roads and zero visibility.</li>
          <li>Power outages and structural damage from heavy snow and wind.</li>
          <li>Health risks like hypothermia, frostbite, and heart strain from shoveling.</li>
          <li>Economic losses from halted commerce and emergency response costs.</li>
        </ul>
        <div className="stat-container">
          <div className="stat-card">
            <h3>200</h3>
            <p>average annual blizzards globally</p>
          </div>
          <div className="stat-card">
            <h3>$5B</h3>
            <p>economic damage in severe years</p>
          </div>
          <div className="stat-card">
            <h3>70%</h3>
            <p>of injuries from exposure</p>
          </div>
        </div>
      </section>

      {/* Prevention and Cure */}
      <section>
        <h2>Prevention and Cure</h2>
        <p>
          While blizzards cannot be prevented, preparation and safety measures can mitigate their impact. Recovery focuses on restoring services and protecting health.
        </p>
        <ul>
          <li><strong>Weather Monitoring</strong>: Use early warning systems to alert communities.</li>
          <li><strong>Infrastructure Prep</strong>: Insulate homes and reinforce power grids.</li>
          <li><strong>Public Education</strong>: Teach residents about safe heating and cold-weather gear.</li>
          <li><strong>Post-Blizzard Recovery</strong>: Clear snow, restore utilities, and treat cold-related injuries.</li>
        </ul>
      </section>

      {/* Safety Tips: Before, During, After */}
      <section id="safety-tips">
        <h2>Safety Tips: Before, During, and After</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Before a Blizzard</h3>
            <ul>
              <li>Stock an emergency kit with food, water, blankets, and batteries.</li>
              <li>Insulate your home and check heating systems.</li>
              <li>Prepare vehicles with winter tires, antifreeze, and emergency supplies.</li>
              <li>Monitor weather forecasts and warnings from NOAA or local authorities.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>During a Blizzard</h3>
            <ul>
              <li>Stay indoors and avoid unnecessary travel.</li>
              <li>Wear multiple layers and keep dry to prevent hypothermia.</li>
              <li>Use safe heating sources; avoid open flames or unvented heaters.</li>
              <li>Conserve heat by closing off unused rooms.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>After a Blizzard</h3>
            <ul>
              <li>Shovel snow carefully to avoid overexertion or injury.</li>
              <li>Check on neighbors, especially the elderly or vulnerable.</li>
              <li>Watch for signs of frostbite or hypothermia and seek medical help.</li>
              <li>Report downed power lines and avoid icy surfaces.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center' }}>
        <h2>Take Action Now</h2>
        <p>
          Blizzards demand preparation to stay safe and warm. Share this knowledge and protect your community.
        </p>
        <a href="https://www.ready.gov/winter-weather" target="_blank" rel="noopener noreferrer" className="cta-button">
          Learn More from Ready.gov
        </a>
      </section>
    </div>
  );
}

export default Blizzards;