import React from 'react';

export default function OrderDirect({ setOrderDirect }) {
  return (
    <div className="orderDirect">
      <div>
        <input
          type="radio"
          name="orderby"
          value="asc"
          onChange={(e) => setOrderDirect(e.target.value)}
        />
        <label>Asc</label>
      </div>
      <div>
        <input
          type="radio"
          name="orderby"
          value="desc"
          onChange={(e) => setOrderDirect(e.target.value)}
        />
        <label>Desc</label>
      </div>
    </div>
  );
}
