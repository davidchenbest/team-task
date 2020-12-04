import React from 'react';

export default function GetUserTask({ tasks, setTasks }) {
  const click = () => {
    console.log(tasks, setTasks);
  };
  return <button onClick={() => click()}>Your Tasks</button>;
}
