import React from 'react';

const TimelineItem = ({ data }: any) => (
  <div className="timeline-item">
    <div className={`timeline-item-content ${data.active && 'active'}`}>
      <time>{data.date}</time>
      <p>{data.title}</p>
      <span className="status">Status: {data.status}</span>
      <span className="circle" />
      {data.active && <span className="line_active" />}
    </div>
  </div>
);

export default TimelineItem;
