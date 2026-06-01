const featureCards = [
  {
    icon: "satellite_alt",
    title: "IoT Integration",
    text: "Real-time sensor data tracks vibration, temperature, and light exposure for every cubic inch of cargo.",
    checks: ["Granular telemetry", "European satellite link"],
    tone: "primary",
  },
  {
    icon: "psychology",
    title: "Neural Routing",
    text: "Predictive routing calculates rail, road, air and port options across the European network.",
    checks: ["Dynamic rerouting", "Emissions optimization"],
    tone: "secondary",
  },
  {
    icon: "verified_user",
    title: "Smart Contracts",
    text: "Automated verification and settlement keep freight operations clear, auditable and fast.",
    checks: ["Auto settlement", "Tamper-proof logs"],
    tone: "tertiary",
  },
];

const footerGroups = [
  ["Product", "Fleet Tracking", "Route Optimization", "Risk Assessment", "API Reference"],
  ["Company", "About", "Security", "Network Status", "Careers"],
];

const particles = Array.from({ length: 44 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: `${2 + (index % 4)}px`,
  delay: `${-(index % 11)}s`,
  duration: `${12 + (index % 9)}s`,
}));

export default function LandingPage({ enterApp }) {
  const openDashboard = () => enterApp("dashboard");
  const openDemo = () => enterApp("analytics");

  return (
    <div className="landing-page">
      <header className="landing-header">
        <button className="landing-brand" onClick={openDashboard}>
          <span>TrackFlow</span>
          <small>LOGISTICS OS</small>
        </button>
        <nav className="landing-nav">
          <a href="#home">Home</a>
          <a href="#solutions">Solutions</a>
          <a href="#network">Network</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="landing-actions">
          <button className="icon-ghost" title="Network status" onClick={() => enterApp("track")}>
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="primary-cta" onClick={openDashboard}>Get Started</button>
        </div>
      </header>

      <main>
        <section className="landing-hero" id="home">
          <div className="landing-particles">
            {particles.map(particle => (
              <span
                key={particle.id}
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>

          <svg className="landing-lines" viewBox="0 0 1400 900" aria-hidden="true">
            <defs>
              <linearGradient id="heroLineMint" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="heroLineAmber" x1="1" x2="0">
                <stop offset="0%" stopColor="var(--tertiary)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--tertiary)" />
                <stop offset="100%" stopColor="var(--tertiary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M-80 250 C240 120 420 590 780 420 C1040 300 1180 210 1500 250" stroke="url(#heroLineMint)" />
            <path d="M1480 760 C1150 600 980 920 620 700 C330 520 190 700 -100 650" stroke="url(#heroLineAmber)" />
          </svg>

          <div className="landing-hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="led led-green led-pulse" />
                Now tracking 14.2M shipments across Europe
              </div>
              <h1>
                Logistics of the <span>Future</span>
              </h1>
              <p>
                Precision freight management for enterprise operations. Real-time telemetry,
                predictive routing and clear operational data for European logistics teams.
              </p>
              <div className="hero-buttons">
                <button className="primary-cta big" onClick={openDashboard}>
                  Get Started
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="secondary-cta" onClick={openDemo}>Request Demo</button>
              </div>
            </div>

            <div className="package-stage" aria-label="TrackFlow shipment visualization">
              <div className="floating-package">
                <div className="package-shell">
                  <span className="material-symbols-outlined">package_2</span>
                </div>
                <div className="hud-card destination">
                  <small>Destination</small>
                  <strong>Rotterdam</strong>
                  <div><span /></div>
                </div>
                <div className="hud-card telemetry">
                  <small><span className="led led-green" /> Live telemetry</small>
                  <strong>24.5 C | 88%</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section" id="solutions">
          <div className="section-heading">
            <h2>Autonomous Logistics</h2>
            <p>Three layers of intelligence working together to move freight with less noise.</p>
          </div>
          <div className="feature-grid">
            {featureCards.map(card => (
              <article className={`landing-card ${card.tone}`} key={card.title}>
                <div className="feature-icon">
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <ul>
                  {card.checks.map(item => (
                    <li key={item}>
                      <span className="material-symbols-outlined">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section bento" id="network">
          <div className="flow-card landing-card">
            <div>
              <h2>European Flow Dashboard</h2>
              <p>Live density and route status across ports, rail corridors and last-mile hubs.</p>
            </div>
            <svg viewBox="0 0 820 300" className="flow-map" aria-hidden="true">
              <path d="M70 215 C190 95 330 170 430 100 C540 25 650 88 755 55" />
              <path d="M95 235 C240 280 310 205 430 225 C560 248 610 178 730 205" />
              {[
                [70, 215], [245, 142], [430, 100], [590, 70], [755, 55],
                [95, 235], [430, 225], [730, 205],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" />
              ))}
            </svg>
          </div>
          <div className="metric-stack">
            <div className="landing-card metric-card">
              <strong>99.9%</strong>
              <span>On-time delivery</span>
              <p>Protected by predictive routing.</p>
            </div>
            <div className="landing-card metric-card">
              <strong>12ms</strong>
              <span>API latency</span>
              <p>Fast enough for live operations.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer" id="contact">
        <div>
          <strong>TrackFlow</strong>
          <p>Defining the standard for the next generation of European freight operations.</p>
          <div className="footer-icons">
            <span className="material-symbols-outlined">public</span>
            <span className="material-symbols-outlined">terminal</span>
            <span className="material-symbols-outlined">share</span>
          </div>
        </div>
        {footerGroups.map(([title, ...items]) => (
          <div key={title}>
            <h4>{title}</h4>
            {items.map(item => <button key={item} onClick={openDashboard}>{item}</button>)}
          </div>
        ))}
        <form className="newsletter" onSubmit={event => { event.preventDefault(); openDashboard(); }}>
          <h4>Newsletter</h4>
          <label>
            <input type="email" placeholder="Email Address" />
            <button>Join</button>
          </label>
          <small>Unsubscribe at any time.</small>
        </form>
      </footer>
    </div>
  );
}
