import React from 'react';

function Floods() {
  return (
    <div className="flood-awareness">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

          .flood-awareness {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(180deg, #e6f3fa, #f1f9ff);
            color: #333;
            line-height: 1.6;
          }

          .hero {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1620237896148-77d6d5c56f1a?auto=format&fit=crop&w=1920&q=80');
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
            content: '💧';
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
            .flood-awareness {
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
        <h1>Flood Awareness</h1>
        <p>
          Learn how to prepare for, survive, and recover from floods. Stay informed, stay safe.
        </p>
        <a href="#safety-tips" className="cta-button">Discover Safety Tips</a>
      </div>

      {/* What is a Flood */}
      <section>
        <h2>What is a Flood?</h2>
        <p>
          A flood occurs when water overflows onto normally dry land, often due to heavy rainfall, river overflow, or melting snow. Floods can devastate communities, damage infrastructure, and disrupt ecosystems. Globally, floods affect over 250 million people annually, making them one of the most common natural disasters.
        </p>
      </section>

      {/* Causes */}
      <section>
        <h2>Causes of Floods</h2>
        <ul>
          <li>Heavy rainfall overwhelming drainage systems.</li>
          <li>River overflow from excessive runoff or snowmelt.</li>
          <li>Dam or levee failures releasing massive water volumes.</li>
          <li>Storm surges and high tides in coastal areas.</li>
        </ul>
      </section>

      {/* Effects */}
      <section>
        <h2>Effects of Floods</h2>
        <ul>
          <li>Loss of life and property damage from fast-moving waters.</li>
          <li>Waterborne diseases from contaminated water supplies.</li>
          <li>Displacement of communities and economic disruption.</li>
          <li>Environmental damage, including soil erosion and habitat loss.</li>
        </ul>
        <div className="stat-container">
          <div className="stat-card">
            <h3>250M</h3>
            <p>people affected by floods yearly</p>
          </div>
          <div className="stat-card">
            <h3>$40B</h3>
            <p>average annual economic loss</p>
          </div>
          <div className="stat-card">
            <h3>50%</h3>
            <p>of flood deaths due to vehicles</p>
          </div>
        </div>
      </section>

      {/* Prevention and Cure */}
      <section>
        <h2>Prevention and Cure</h2>
        <p>
          Preventing floods involves infrastructure planning and community preparedness, while recovery focuses on health and rebuilding. Proactive measures can significantly reduce risks and damages.
        </p>
        <ul>
          <li><strong>Flood Barriers</strong>: Build levees, floodwalls, and retention basins.</li>
          <li><strong>Early Warning Systems</strong>: Use weather monitoring and alerts to prepare communities.</li>
          <li><strong>Land Management</strong>: Preserve wetlands and limit urban sprawl in floodplains.</li>
          <li><strong>Post-Flood Recovery</strong>: Provide clean water, medical care, and rebuild with flood-resistant materials.</li>
        </ul>
      </section>

      {/* Safety Tips: Before, During, After */}
      <section id="safety-tips">
        <h2>Safety Tips: Before, During, and After</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Before a Flood</h3>
            <ul>
              <li>Elevate appliances and valuables above flood levels.</li>
              <li>Prepare an emergency kit with food, water, and medications.</li>
              <li>Know your area’s flood risk and evacuation routes.</li>
              <li>Purchase flood insurance if in a high-risk zone.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>During a Flood</h3>
            <ul>
              <li>Evacuate immediately if authorities issue orders.</li>
              <li>Avoid walking or driving through floodwaters—6 inches can knock you over.</li>
              <li>Move to higher ground and stay informed via radio or apps.</li>
              <li>Turn off electricity if water enters your home.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>After a Flood</h3>
            <ul>
              <li>Return home only when authorities declare it safe.</li>
              <li>Avoid contaminated water and wear protective gear during cleanup.</li>
              <li>Document damage for insurance claims and seek assistance.</li>
              <li>Monitor for health issues like infections or mold exposure.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center' }}>
        <h2>Take Action Now</h2>
        <p>
          Floods can strike unexpectedly, but preparation saves lives. Share this knowledge and stay proactive.
        </p>
        <a href="https://www.ready.gov/floods" target="_blank" rel="noopener noreferrer" className="cta-button">
          Learn More from Ready.gov
        </a>
      </section>
    </div>
  );
}

export default Floods;