import React, { useEffect, useState } from 'react';
import '../css/tasks.css';
import { getTasks } from '../queries/graphqlQuery';
import fetchGraphql from '../fetch/fetchGraphql';
import checkCookieExist from '../modules/checkCookieExist';
import Stars from './sub/Stars';
import StaticStars from './sub/StaticStars';
import getCookie from '../modules/getCookie';
import { updateRated } from '../queries/graphqlQuery';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    setUserId(getCookie('taskjiaid'));
    checkCookieExist();
    async function fetch() {
      const query = getTasks();
      const data = await fetchGraphql(query);
      setTasks(data.data.tasks);
    }
    fetch();
  }, []);

  const setRatedDifficulty = async (difficulty, index, id) => {
    let arr = [...tasks];
    arr[index].ratedDifficulty = difficulty;
    setTasks(arr);
    const query = updateRated(difficulty, id);
    const data = await fetchGraphql(query);
    if (!data.data.updateRated.ratedDifficulty === 1)
      alert('there was an error');
  };

  function displayCurrentUserRating(task, index) {
    return task.assignTo === userId ? (
      <Stars
        index={index}
        id={task.id}
        difficulty={task.ratedDifficulty > 0 ? task.ratedDifficulty : 0}
        setDifficulty={setRatedDifficulty}
      ></Stars>
    ) : (
      displayUserRating(task.ratedDifficulty)
    );
  }

  function displayUserRating(rate) {
    return rate ? <StaticStars difficulty={rate}></StaticStars> : 'Waiting';
  }

  return (
    <>
      {tasks.map((task, index) => (
        <div key={task.id} data-id={task.id} className="eachTask">
          <div>{task.name}</div>
          <div>To: {task.assignTo}</div>
          <div>By:{task.assignBy}</div>
          <div>
            Rated: <StaticStars difficulty={task.difficulty}></StaticStars>
          </div>
          <div>
            User Rated:
            {displayCurrentUserRating(task, index)}
          </div>
        </div>
      ))}
    </>
  );
}
