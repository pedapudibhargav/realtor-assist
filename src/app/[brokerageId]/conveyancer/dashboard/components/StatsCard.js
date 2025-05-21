import { Card } from 'react-bootstrap';
import '../dashboard.css';

const StatsCard = ({ title, value, note, noteColor = 'text-muted' }) => (
  <Card>
    <Card.Body className="p-4">
      <div className="stat-title fw-bold mb-2">{title}</div>
      <div className="stat-value mb-2">{value}</div>
      <div className={`stat-note d-flex align-items-center gap-2 ${noteColor}`}>{note}</div>
    </Card.Body>
  </Card>
);

export default StatsCard;