import React from 'react';

function Wildfire() {
  return (
    <div className="wildfire-awareness">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

          .wildfire-awareness {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(180deg, #fff7e6, #f9f2e8);
            color: #333;
            line-height: 1.6;
          }

          .hero {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1621001602844-0e3b1f9a9f0b?auto=format&fit=crop&w=1920&q=80');
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
            color: #f0ad4e;
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
            content: '🔥';
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
            border-left: 4px solid #f0ad4e;
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
            background: #f0ad4e;
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
            background: #f0ad4e;
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
            background: #e69500;
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
            .wildfire-awareness {
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
        <h1>Wildfire Awareness</h1>
        <p>
          Learn how to prepare for, survive, and recover from wildfires. Stay vigilant, stay safe.
        </p>
        <a href="#safety-tips" className="cta-button">Discover Safety Tips</a>
      </div>

      {/* What is a Wildfire */}
      <section>
        <h2>What is a Wildfire?</h2>
        <p>
          A wildfire is an uncontrolled blaze that spreads rapidly through forests, grasslands, or shrublands. Triggered by natural or human causes, wildfires destroy ecosystems and threaten communities. Globally, wildfires burn millions of hectares annually, with increasing frequency due to climate change.
        </p>
      </section>

      {/* Causes */}
      <section>
        <h2>Causes of Wildfires</h2>
        <ul>
          <li>Lightning strikes igniting dry vegetation.</li>
          <li>Human negligence, such as unattended campfires or discarded cigarettes.</li>
          <li>Hot, dry weather conditions creating ideal fire environments.</li>
          <li>Volcanic eruptions or sparks from machinery.</li>
        </ul>
      </section>

      {/* Effects */}
      <section>
        <h2>Effects of Wildfires</h2>
        <ul>
          <li>Destruction of forests, wildlife habitats, and biodiversity.</li>
          <li>Air pollution from smoke, causing respiratory and cardiovascular issues.</li>
          <li>Displacement of communities and economic losses from property damage.</li>
          <li>Long-term soil degradation and increased flood risk.</li>
        </ul>
        <div className="stat-container">
          <div className="stat-card">
            <h3>8.8M</h3>
            <p>hectares burned in the U.S. in 2020</p>
          </div>
          <div className="stat-card">
            <h3>80%</h3>
            <p>of wildfires caused by humans</p>
          </div>
          <div className="stat-card">
            <h3>$20B</h3>
            <p>annual global economic impact</p>
          </div>
        </div>
      </section>

      {/* Prevention and Cure */}
      <section>
        <h2>Prevention and Cure</h2>
        <p>
          Preventing wildfires requires community action and environmental management, while recovery focuses on rebuilding and health support. Proactive measures can significantly reduce risks and damages.
        </p>
        <ul>
          <li><strong>Firebreaks</strong>: Create cleared zones to slow fire spread.</li>
          <li><strong>Controlled Burns</strong>: Use prescribed fires to reduce excess vegetation.</li>
          <li><strong>Public Education</strong>: Teach safe practices for campfires and equipment use.</li>
          <li><strong>Post-Fire Recovery</strong>: Provide medical care for smoke inhalation and reforest affected areas.</li>
        </ul>
      </section>

      {/* Safety Tips: Before, During, After */}
      <section id="safety-tips">
        <h2>Safety Tips: Before, During, and After</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Before a Wildfire</h3>
            <ul>
              <li>Create a defensible space by clearing dry vegetation around your home.</li>
              <li>Prepare an emergency kit with masks, water, and evacuation plans.</li>
              <li>Monitor fire weather alerts and local news for warnings.</li>
              <li>Use fire-resistant materials for home construction or upgrades.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>During a Wildfire</h3>
            <ul>
              <li>Evacuate immediately if authorities issue orders.</li>
              <li>Wear N95 masks to protect against smoke inhalation.</li>
              <li>Close windows and doors to minimize smoke entry.</li>
              <li>Stay informed via radio or apps for real-time updates.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>After a Wildfire</h3>
            <ul>
              <li>Return home only when authorities declare it safe.</li>
              <li>Inspect property for hidden embers or structural damage.</li>
              <li>Seek medical attention for respiratory issues or burns.</li>
              <li>Support reforestation and community recovery efforts.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center' }}>
        <h2>Take Action Now</h2>
        <p>
          Wildfires are preventable with collective effort. Share this knowledge and protect your community.
        </p>
        <a href="https://www.ready.gov/wildfires" target="_blank" rel="noopener noreferrer" className="cta-button">
          Learn More from Ready.gov
        </a>
      </section>
    </div>
  );
}

export default Wildfire;