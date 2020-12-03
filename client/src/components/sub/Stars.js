import React, { useEffect, useState } from 'react';
import '../../css/stars.css';

export default function Stars({ difficulty, setDifficulty, id, index }) {
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
    setStars(() => arr);
  }, [difficulty, setDifficulty]);

  const starClick = (e) => {
    const num = Number(e.target.dataset.num) + 1;
    setDifficulty(num, index, id);
  };

  return (
    <div className="rating">
      {stars.map((star, index) =>
        star.checked ? (
          <span
            onClick={(e) => starClick(e)}
            key={index}
            className="fa fa-star checked"
            data-num={index}
          ></span>
        ) : (
          <span
            onClick={(e) => starClick(e)}
            key={index}
            className="fa fa-star "
            data-num={index}
          ></span>
        )
      )}
    </div>
  );
}
