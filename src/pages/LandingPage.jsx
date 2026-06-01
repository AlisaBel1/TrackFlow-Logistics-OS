import { useMemo } from "react";
import SplineRadar from "../components/SplineRadar";

const DASHBOARD_MAP =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDAfBN2ALZQ-rGoKnicBx_BYn68SWHc8DOt2qeD4tyqCydM9OMwC1OVniD01PdOAvE11cZXEPtyD06z2gVXzwEZX1sojT0evW4kiI8PpINc_cTjf1xjCDJ6-ElTCiWq0-rKLX-kYy9fKeX4spdO-hQWxIixPYl4JZQwCJd1-1UnrYbIAu3UYoSSUfq5DOhYCPACXzvmJ8HRKBMGd_Yigdx3XOz98Diz1-7YHtF7xyqDo5GaGMQZ_hz3qlIH-eRDYqpfWWOVgfFat3Ev";

const featureCards = [
  {
    icon: "satellite_alt",
    bgIcon: "sensors",
    title: "IoT Integration",
    text: "Real-time sensor data tracks vibration, temperature, and light exposure for every cubic inch of cargo.",
    checks: ["GRANULAR TELEMETRY", "GLOBAL SATELLITE LINK"],
    tone: "primary",
  },
  {
    icon: "psychology",
    title: "Neural Routing",
    text: "AI-driven predictive models calculate millions of routes to find the peak of efficiency and sustainability.",
    checks: ["DYNAMIC REROUTING", "EMISSIONS OPTIMIZATION"],
    tone: "secondary",
    featured: true,
  },
  {
    icon: "verified_user",
    bgIcon: "terminal",
    title: "Smart Contracts",
    text: "Automated payments and verification systems powered by immutable ledger technology for zero-trust trust.",
    checks: ["AUTO-SETTLEMENT", "TAMPER-PROOF LOGS"],
    tone: "tertiary",
  },
];

const footerGroups = [
  ["Product", "Fleet Tracking", "Route Optimization", "Risk Assessment", "API Reference"],
  ["Company", "About", "Security", "Network Status", "Careers"],
];

const navLinks = [
  { id: "home", label: "Home", active: true },
  { id: "solutions", label: "Solutions" },
  { id: "pricing", label: "Pricing" },
  { id: "network", label: "Network" },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function LandingPage({ enterApp }) {
  const openDashboard = () => enterApp("dashboard");
  const openDemo = () => enterApp("analytics");

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${1 + Math.random() * 3}px`,
        duration: `${5 + Math.random() * 10}s`,
        delay: `${Math.random() * 5}s`,
        drift: `${Math.random() * 40 - 20}px`,
      })),
    []
  );

  return (
    <div className="landing-page">
      <header className="landing-header">
        <button type="button" className="landing-logo" onClick={openDashboard}>
          <span className="landing-logo-title">TrackFlow</span>
          <span className="landing-logo-badge">LOGISTICS OS</span>
        </button>

        <nav className="landing-nav" aria-label="Main">
          {navLinks.map(link => (
            <button
              key={link.id}
              type="button"
              className={link.active ? "is-active" : undefined}
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="landing-header-actions">
          <button
            type="button"
            className="landing-icon-btn"
            title="Notifications"
            onClick={() => enterApp("track")}
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button type="button" className="landing-btn landing-btn-primary" onClick={openDashboard}>
            Get Started
          </button>
        </div>
      </header>

      <section className="landing-hero" id="home">
        <div className="landing-glow landing-glow-primary" aria-hidden="true" />
        <div className="landing-glow landing-glow-secondary" aria-hidden="true" />

        <div className="landing-particles" aria-hidden="true">
          {particles.map(p => (
            <span
              key={p.id}
              className="landing-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
                "--particle-drift": p.drift,
              }}
            />
          ))}
        </div>

        <div className="landing-hero-grid">
          <div className="landing-hero-copy">
            <div className="landing-eyebrow">
              <span className="landing-led landing-led-tertiary" />
              <span className="landing-label">NOW TRACKING 14.2M SHIPMENTS GLOBALLY</span>
            </div>

            <h1 className="landing-display">
              Logistics of the <br />
              <span className="landing-gradient-text">Future</span>
            </h1>

            <p className="landing-lead">
              Precision-engineered freight management for enterprise operations. Real-time
              telemetry, predictive routing, and immersive data visualization.
            </p>

            <div className="landing-hero-actions">
              <button type="button" className="landing-btn landing-btn-hero" onClick={openDashboard}>
                Get Started
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button type="button" className="landing-btn landing-btn-glass" onClick={openDemo}>
                Request Demo
              </button>
            </div>
          </div>

          <SplineRadar />
        </div>
      </section>

      <section className="landing-section" id="solutions">
        <div className="landing-container">
          <div className="landing-section-head">
            <h2>Autonomous Logistics</h2>
            <p>Three layers of intelligence working in perfect harmony to move the world.</p>
          </div>

          <div className="landing-features">
            {featureCards.map(card => (
              <article
                key={card.title}
                className={`landing-glass-card landing-feature-card landing-tone-${card.tone}${card.featured ? " is-featured" : ""}`}
              >
                {card.bgIcon && (
                  <span
                    className="landing-feature-watermark material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    {card.bgIcon}
                  </span>
                )}
                {card.featured && <div className="landing-feature-glow" aria-hidden="true" />}
                <div className={`landing-feature-icon landing-tone-${card.tone}`}>
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
        </div>
      </section>

      <div className="landing-divider" aria-hidden="true" />

      <section className="landing-section" id="network">
        <div className="landing-container landing-bento">
          <div className="landing-bento-main landing-glass-card">
            <div>
              <h3>Global Flow Dashboard</h3>
              <p>Real-time visualization of current freight density.</p>
            </div>
            <div className="landing-map-wrap">
              <img src={DASHBOARD_MAP} alt="Global logistics map visualization" />
            </div>
          </div>

          <div className="landing-bento-side">
            <div className="landing-glass-card landing-stat-card landing-stat-tertiary">
              <div className="landing-stat-value">99.9%</div>
              <div className="landing-stat-title">On-time Delivery</div>
              <p>Guaranteed by AI routing.</p>
            </div>
            <div className="landing-glass-card landing-stat-card landing-stat-secondary">
              <div className="landing-stat-value">12ms</div>
              <div className="landing-stat-title">API Latency</div>
              <p>Enterprise-grade speed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section landing-section-pricing" id="pricing">
        <div className="landing-container landing-pricing-cta">
          <p className="landing-label">ENTERPRISE READY</p>
          <h2>Scale freight operations without scaling chaos.</h2>
          <button type="button" className="landing-btn landing-btn-hero" onClick={openDashboard}>
            Open Dashboard
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container landing-footer-grid">
          <div className="landing-footer-brand">
            <strong>TrackFlow</strong>
            <p>Defining the standard for the next generation of global freight operations.</p>
            <div className="landing-footer-social">
              <button type="button" aria-label="Website">
                <span className="material-symbols-outlined">public</span>
              </button>
              <button type="button" aria-label="Developer">
                <span className="material-symbols-outlined">terminal</span>
              </button>
              <button type="button" aria-label="Share">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>

          {footerGroups.map(([title, ...items]) => (
            <div key={title} className="landing-footer-col">
              <h4>{title}</h4>
              <ul>
                {items.map(item => (
                  <li key={item}>
                    <button type="button" onClick={openDashboard}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <form
            className="landing-newsletter"
            onSubmit={e => {
              e.preventDefault();
              openDashboard();
            }}
          >
            <h4>Newsletter</h4>
            <div className="landing-newsletter-field">
              <input type="email" placeholder="Email Address" required />
              <button type="submit">Join</button>
            </div>
            <p className="landing-label">UNSUBSCRIBE AT ANY TIME.</p>
          </form>
        </div>

        <p className="landing-copyright">
          © 2024 TrackFlow Systems Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
