export default function Loader({ label = 'Loading TourMedX content' }) {
  return (
    <div className="tmx-loader" role="status" aria-live="polite">
      <span className="tmx-loader__ring" />
      <span>{label}</span>
    </div>
  );
}
