import React from 'react';

export default function ActivityLog() {
  const logs = [
    { id: 1, action: 'Added user Alice', date: '2025-05-19' },
    { id: 2, action: 'Changed role for Bob', date: '2025-05-18' },
  ];
  return (
    <div>
      <h1>Activity Log</h1>
      <ul>
        {logs.map(log => (
          <li key={log.id}>{log.date}: {log.action}</li>
        ))}
      </ul>
    </div>
  );
}