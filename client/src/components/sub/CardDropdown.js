import React, { useState } from 'react';
import DeleteTask from './DeleteTask';

export default function CardDropdown({ id, index, deleteCard }) {
  const [dropdown, setDropDown] = useState(false);

  return (
    <div className="modify" onClick={() => setDropDown(!dropdown)}>
      <i className="material-icons">&#xe5d3;</i>
      <div className="dropdown">
        {dropdown && (
          <DeleteTask id={id} index={index} deleteCard={deleteCard} />
        )}
      </div>
    </div>
  );
}
