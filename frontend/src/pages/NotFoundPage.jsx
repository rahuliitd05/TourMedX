import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="tmx-page">
      <Card
        title="Page not found"
        description="The page you requested does not exist."
      >
        <Button as={Link} to="/">
          Return Home
        </Button>
      </Card>
    </div>
  );
}
