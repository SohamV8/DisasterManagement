import React from 'react';

function Pandemic() {
  return (
    <div className="pandemic-awareness">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

          .pandemic-awareness {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(180deg, #e6f0fa, #f1f5f9);
            color: #333;
            line-height: 1.6;
          }

          .hero {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1584118624016-df0567c05d72?auto=format&fit=crop&w=1920&q=80');
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
            color: #1e40af;
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
            content: '🩺';
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
            border-left: 4px solid #1e40af;
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
            background: #1e40af;
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
            background: #1e40af;
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
            background: #1e3a8a;
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
            .pandemic-awareness {
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
        <h1>Pandemic Awareness</h1>
        <p>
          Learn how to prepare for, respond to, and recover from pandemics. Stay informed, stay healthy.
        </p>
        <a href="#safety-tips" className="cta-button">Discover Safety Tips</a>
      </div>

      {/* What is a Pandemic */}
      <section>
        <h2>What is a Pandemic?</h2>
        <p>
          A pandemic is a global outbreak of an infectious disease that affects large populations across multiple countries or continents. Unlike epidemics, pandemics spread rapidly due to lack of immunity, impacting millions. Historical examples include the 1918 flu and COVID-19, which infected over 500 million people globally.
        </p>
      </section>

      {/* Causes */}
      <section>
        <h2>Causes of Pandemics</h2>
        <ul>
          <li>Spread of infectious pathogens, such as viruses or bacteria.</li>
          <li>Lack of population immunity to new or mutated diseases.</li>
          <li>Global travel and trade facilitating rapid disease transmission.</li>
          <li>Urbanization and crowded living conditions amplifying spread.</li>
        </ul>
      </section>

      {/* Effects */}
      <section>
        <h2>Effects of Pandemics</h2>
        <ul>
          <li>Health crises leading to hospitalizations and fatalities.</li>
          <li>Economic disruptions from lockdowns and supply chain issues.</li>
          <li>Mental health challenges due to isolation and stress.</li>
          <li>Strain on healthcare systems and essential services.</li>
        </ul>
        <div className="stat-container">
          <div className="stat-card">
            <h3>1.5B</h3>
            <p>people affected by COVID-19 globally</p>
          </div>
          <div className="stat-card">
            <h3>50%</h3>
            <p>increase in mental health issues during pandemics</p>
          </div>
          <div className="stat-card">
            <h3>$16T</h3>
            <p>estimated global economic loss from COVID-19</p>
          </div>
        </div>
      </section>

      {/* Prevention and Cure */}
      <section>
        <h2>Prevention and Cure</h2>
        <p>
          Preventing pandemics requires global cooperation and proactive measures, while cures focus on treatment and recovery. Early intervention and public health strategies can save millions of lives.
        </p>
        <ul>
          <li><strong>Vaccination</strong>: Develop and distribute vaccines to build immunity.</li>
          <li><strong>Surveillance</strong>: Monitor disease outbreaks with global health networks.</li>
          <li><strong>Hygiene Education</strong>: Promote handwashing, masks, and sanitation practices.</li>
          <li><strong>Treatment Access</strong>: Provide antivirals, oxygen, and mental health support post-infection.</li>
        </ul>
      </section>

      {/* Safety Tips: Before, During, After */}
      <section id="safety-tips">
        <h2>Safety Tips: Before, During, and After</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Before a Pandemic</h3>
            <ul>
              <li>Stay vaccinated and keep up with booster shots.</li>
              <li>Build an emergency kit with masks, sanitizers, and medications.</li>
              <li>Learn about local health guidelines and alert systems.</li>
              <li>Plan for remote work and homeschooling if needed.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>During a Pandemic</h3>
            <ul>
              <li>Practice social distancing and avoid crowded places.</li>
              <li>Wear masks in public and wash hands frequently.</li>
              <li>Follow quarantine rules if exposed or infected.</li>
              <li>Stay updated via trusted sources like WHO or CDC.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <h3>After a Pandemic</h3>
            <ul>
              <li>Seek medical checkups for lingering symptoms (e.g., long COVID).</li>
              <li>Support mental health through counseling or community groups.</li>
              <li>Rebuild routines with caution, maintaining hygiene practices.</li>
              <li>Advocate for stronger public health policies.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center' }}>
        <h2>Take Action Now</h2>
        <p>
          Pandemics test our resilience, but preparation saves lives. Share this knowledge and stay proactive.
        </p>
        <a href="https://www.who.int/emergencies/diseases" target="_blank" rel="noopener noreferrer" className="cta-button">
          Learn More from WHO
        </a>
      </section>
    </div>
  );
}

export default Pandemic;