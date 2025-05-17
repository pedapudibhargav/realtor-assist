const  DeadlineItem = ({ text, date }) => (
    <div className="d-flex align-items-start gap-2 py-2">
      <i className="bi bi-clock fs-6 mt-1"></i>
      <div>
        <div className="small fw-medium">{text}</div>
        <div className="text-muted small">{date}</div>
      </div>
    </div>
  );
  export default DeadlineItem;