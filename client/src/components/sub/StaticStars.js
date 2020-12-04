import React, { useEffect, useState } from 'react';
import '../../css/stars.css';

export default function Stars({ difficulty }) {
  const [stars, setStars] = useState([
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
  ]);

  useEffect(() => {
    let arr = [...stars];
    for (let i = 0; i < arr.length; i++) {
      if (i < difficulty) arr[i].checked = true;
      else arr[i].checked = false;
    }
    setStars(arr);
  }, [difficulty]);

  return (
    <span className="rating">
      {stars.map((star, index) =>
        star.checked ? (
          <span
            key={index}
            className="fa fa-star checked"
            data-num={index}
          ></span>
        ) : (
          <span key={index} className="fa fa-star " data-num={index}></span>
        )
      )}
    </span>
  );
}
