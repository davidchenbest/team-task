import React from 'react';

export default function OrderCategory({ order, setOrder }) {
  return (
    <select
      value={order}
      onChange={(e) => setOrder(e.target.value)}
      className="orderCategory"
    >
      <option value="time">Time</option>
      <option value="assignor">Assignor</option>
      <option value="designator">Designator</option>
      <option value="name">Name</option>
    </select>
  );
}
