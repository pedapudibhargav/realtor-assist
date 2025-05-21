const RecentActivityItem = ({ icon, text, time, address }) => (
    <div className="d-flex align-items-start gap-2 py-2">
      <i className={`bi ${icon} fs-5`}></i>
      <div>
        <div className="small fw-medium">{text}</div>
        <div className="text-muted small">{time} • {address}</div>
      </div>
    </div>
  );
  export default RecentActivityItem;