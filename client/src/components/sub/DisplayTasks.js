import React from 'react';
import Stars from './Stars';
import StaticStars from './StaticStars';
import DeleteTask from './DeleteTask';
import { updateRated } from '../../queries/graphqlQuery';
import fetchGraphql from '../../fetch/fetchGraphql';
import dateFormat from '../../modules/dateFormat';

export default function DisplayTasks({ tasks, setTasks, username }) {
  const setRatedDifficulty = async (difficulty, index, id) => {
    if (difficulty === tasks[index].ratedDifficulty) return;
    let arr = [...tasks];
    arr[index].ratedDifficulty = difficulty;
    setTasks(arr);
    const query = updateRated(difficulty, id);
    const data = await fetchGraphql(query);
    if (!data.data.updateRated.ratedDifficulty === 1)
      alert('there was an error');
  };

  const deleteCard = (index) => {
    let arr = [...tasks];
    arr.splice(index, 1);
    setTasks(arr);
  };

  function highlightUserCards(uname) {
    if (uname === username) return 'userCard';
  }

  function displayCurrentUserRating(task, index) {
    return task.assignTo.username === username ? (
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
        <div
          key={task.id}
          data-id={task.id}
          className={`eachTask ${highlightUserCards(task.assignTo.username)}`}
        >
          <DeleteTask
            id={task.id}
            index={index}
            deleteCard={deleteCard}
          ></DeleteTask>
          <div>{task.name}</div>
          <div>To: {task.assignTo.username}</div>
          <div>By: {task.assignBy.username}</div>
          <div>Date: {dateFormat(task.createdDate)}</div>
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
