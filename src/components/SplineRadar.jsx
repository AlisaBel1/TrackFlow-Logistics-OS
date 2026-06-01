const SPLINE_SCENE_URL =
  "https://my.spline.design/radarmaskcopycopy-uuzVSey3qIxKPVdG18UpSgiI-1Ed/";

export default function SplineRadar() {
  return (
    <div className="landing-spline">
      <div className="landing-spline-glow" aria-hidden="true" />

      <div className="landing-spline-viewport">
        <iframe
          className="landing-spline-frame"
          src={SPLINE_SCENE_URL}
          title="TrackFlow radar visualization"
          loading="lazy"
          allow="autoplay; fullscreen"
        />
      </div>

      <div className="landing-spline-edge-fade" aria-hidden="true" />
      <div className="landing-spline-bottom-veil" aria-hidden="true" />
      <div className="landing-spline-logo-cover landing-spline-logo-cover--bl" aria-hidden="true" />
      <div className="landing-spline-logo-cover landing-spline-logo-cover--br" aria-hidden="true" />
    </div>
  );
}
