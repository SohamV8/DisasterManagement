import React from 'react';

function Landslide() {
  return (
    <div className="landslide-awareness">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

          .landslide-awareness {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(180deg, #f5f5f5, #ece7e1);
            color: #333;
            line-height: 1.6;
          }

          .hero {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1599479648691-432f307e3f7f?auto=format&fit=crop&w=1920&q=80');
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
            content: '🏔️';
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
            .landslide-awareness {
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
        <h1>Landslide Awareness</h1>
        <p>
          Learn how to prepare for, survive, and recover from landslides. Stay vigilant, stay safe.
        </p>
        <a href="#safety-tips" className="cta-button">Discover Safety Tips</a>
      </div>

      {/* What is a Landslide */}
      <section>
        <h2>What is a Landslide?</h2>
        <p>
          A landslide is the rapid movement of rock, soil, or debris down a slope, triggered by gravity. Common in hilly or mountainous regions, landslides can bury homes, block roads, and disrupt ecosystems. Globally, landslides cause thousands of deaths and billions in damages annually.
        </p>
      </section>

      {/* Causes */}
      <section>
        <h2>Causes of Landslides</h2>
        <ul>
          <li>Heavy rainfall saturating soil and reducing stability.</li>
          <li>Earthquakes shaking loose slopes and triggering slides.</li>
          <li>Human activities like deforestation, mining, or construction destabilizing slopes.</li>
          <li>Volcanic eruptions loosening earth and debris.</li>
        </ul>
      </section>

      {/* Effects */}
      <section>
        <h2>Effects of Landslides</h2>
        <ul>
          <li>Damage to infrastructure, including roads, bridges, and buildings.</li>
          <li>Burial of habitats, farmland, and communities under debris.</li>
          <li>Loss of life and injuries from sudden slides.</li>
          <li>Disruption of water supplies and increased flood risk.</li>
        </ul>
        <div className="stat-container">
          <div className="stat-card">
            <h3>4,000</h3>
            <p>average annual deaths globally</p>
          </div>
          <div className="stat-card">
            <h3>$4B</h3>
            <p>estimated annual economic loss</p>
          </div>
          <div className="stat-card">
            <h3>70%</h3>
            <p>of landslides linked to rainfall</p>
          </div>
        </div>
      </section>

      {/* Prevention and Cure */}
      <section>
        <h2>Prevention and Cure</h2>
        <p>
          Preventing landslides involves careful planning and engineering, while recovery focuses on rebuilding and stabilization. Proactive measures can reduce risks and protect communities.
        </p>
        <ul>
          <li><strong>Slope Stabilization</strong>: Build retaining walls and plant vegetation to anchor soil.</li>
          <li><strong>Monitoring Systems</strong>: Install sensors to detect ground movement early.</li>
          <li><strong>Land-Use Planning</strong>: Avoid construction in high-risk areas.</li>
          <li><strong>Post-Landslide Recovery</strong>: Clear debris safely and restore infrastructure with resilient designs.</li>
        </ul>
      </section>

      {/* Safety Tips: Before, During, After */}
      <section id="safety-tips">
        <h2>Safety Tips: Before, During, and After</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Before a Landslide</h3>
            <ul>
              <li>Identify landslide-prone areas near your home or workplace.</li>
              <li>Prepare an emergency kit with food, water, and first-aid supplies.</li>
              <li>Learn local warning systems and evacuation routes.</li>
              <li>Reinforce slopes with retaining walls or terracing.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>During a Landslide</h3>
            <ul>
              <li>Evacuate immediately if you hear rumbling or receive warnings.</li>
              <li>Move to high ground away from the slide path.</li>
              <li>Avoid river valleys where debris flows may rush.</li>
              <li>Stay alert for secondary slides or flooding.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>After a Landslide</h3>
            <ul>
              <li>Stay away from the slide area until authorities declare it safe.</li>
              <li>Help injured or trapped individuals if safe to do so.</li>
              <li>Report damaged utilities (gas, water, electricity) to officials.</li>
              <li>Support community recovery by volunteering or donating.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center' }}>
        <h2>Take Action Now</h2>
        <p>
          Landslides can strike suddenly, but preparation saves lives. Share this knowledge and stay proactive.
        </p>
        <a href="https://www.usgs.gov/natural-hazards/landslide-hazards" target="_blank" rel="noopener noreferrer" className="cta-button">
          Learn More from USGS
        </a>
      </section>
    </div>
  );
}

export default Landslide;