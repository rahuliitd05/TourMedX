import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="tmx-footer">
      <div>
        <strong>TourMedX</strong>
        <p>
          World-class healthcare coordination for international patients in
          Egypt.
        </p>
      </div>
      <div className="tmx-footer__links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-and-conditions">Terms & Conditions</Link>
        <Link to="/refund-and-cancellation-policy">
          Refund & Cancellation Policy
        </Link>
      </div>
    </footer>
  );
}
