import React from 'react';

function Volcano() {
  return (
    <div className="volcano-awareness">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

          .volcano-awareness {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(180deg, #f9f9f9, #f1f1f1);
            color: #333;
            line-height: 1.6;
          }

          .hero {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1614015867549-a4358013d0b7?auto=format&fit=crop&w=1920&q=80');
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
            color: #d9534f;
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
            border-left: 4px solid #d9534f;
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
            background: #d9534f;
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
            background: #d9534f;
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
            background: #c9302c;
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
            .volcano-awareness {
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
        <h1>Volcano Eruption Awareness</h1>
        <p>
          Learn how to prepare for, survive, and recover from volcanic eruptions. Stay informed, stay safe.
        </p>
        <a href="#safety-tips" className="cta-button">Discover Safety Tips</a>
      </div>

      {/* What is a Volcano */}
      <section>
        <h2>What is a Volcano?</h2>
        <p>
          A volcano is an opening in the Earth's crust where molten lava, volcanic ash, and gases are expelled. Eruptions range from gentle lava flows to catastrophic explosions, impacting ecosystems and communities. Over 1,500 active volcanoes exist globally, with approximately 50-70 erupting annually.
        </p>
      </section>

      {/* Causes */}
      <section>
        <h2>Causes of Volcanic Eruptions</h2>
        <ul>
          <li>Movement of tectonic plates creating magma pathways.</li>
          <li>Pressure buildup in magma chambers beneath the Earth's surface.</li>
          <li>Subduction zones where one plate slides under another, melting rock into magma.</li>
          <li>Hot spots in the Earth's mantle causing localized volcanic activity.</li>
        </ul>
      </section>

      {/* Effects */}
      <section>
        <h2>Effects of Volcanic Eruptions</h2>
        <ul>
          <li>Destruction of homes, infrastructure, and agriculture due to lava and ash.</li>
          <li>Air pollution from ash clouds, affecting respiratory health and aviation.</li>
          <li>Climate changes, such as global cooling from sulfur dioxide emissions.</li>
          <li>Acid rain and soil contamination impacting water and crops.</li>
        </ul>
        <div className="stat-container">
          <div className="stat-card">
            <h3>80%</h3>
            <p>of eruptions occur along tectonic plate boundaries</p>
          </div>
          <div className="stat-card">
            <h3>500M</h3>
            <p>people live near active volcanoes</p>
          </div>
          <div className="stat-card">
            <h3>10K+</h3>
            <p>deaths from eruptions since 1900</p>
          </div>
        </div>
      </section>

      {/* Prevention and Cure */}
      <section>
        <h2>Prevention and Cure</h2>
        <p>
          While volcanic eruptions cannot be prevented, proactive measures can reduce risks and aid recovery. Communities can implement monitoring systems, educate residents, and develop robust response plans.
        </p>
        <ul>
          <li><strong>Monitoring</strong>: Use seismographs and gas sensors to detect early warning signs.</li>
          <li><strong>Land-Use Planning</strong>: Restrict development in high-risk zones near volcanoes.</li>
          <li><strong>Community Education</strong>: Train residents on evacuation routes and safety protocols.</li>
          <li><strong>Post-Eruption Recovery</strong>: Provide medical care for ash inhalation and rebuild with resilient materials.</li>
        </ul>
      </section>

      {/* Safety Tips: Before, During, After */}
      <section id="safety-tips">
        <h2>Safety Tips: Before, During, and After</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Before an Eruption</h3>
            <ul>
              <li>Create an emergency kit with food, water, masks, and first-aid supplies.</li>
              <li>Learn evacuation routes and local alert systems.</li>
              <li>Secure heavy objects to prevent damage from tremors.</li>
              <li>Stay informed through volcano monitoring agencies (e.g., USGS).</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>During an Eruption</h3>
            <ul>
              <li>Evacuate immediately if authorities issue warnings.</li>
              <li>Wear N95 masks to avoid inhaling ash and toxic gases.</li>
              <li>Stay indoors, close windows, and seal vents during ashfall.</li>
              <li>Avoid low-lying areas where volcanic gases may accumulate.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>After an Eruption</h3>
            <ul>
              <li>Wait for official clearance before returning home.</li>
              <li>Clean ash from roofs to prevent collapse, wearing protective gear.</li>
              <li>Seek medical attention for respiratory issues or injuries.</li>
              <li>Support community rebuilding efforts and mental health resources.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center' }}>
        <h2>Take Action Now</h2>
        <p>
          Volcanic eruptions are unpredictable, but preparation saves lives. Share this information and stay vigilant.
        </p>
        <a href="https://www.usgs.gov/programs/volcano-hazards" target="_blank" rel="noopener noreferrer" className="cta-button">
          Learn More from USGS
        </a>
      </section>
    </div>
  );
}

export default Volcano;