import React from 'react';
import { deleteTask } from '../../queries/graphqlQuery';
import fetchGraphql from '../../fetch/fetchGraphql';

export default function DeleteTask({ id, index, deleteCard }) {
  const click = async () => {
    const query = deleteTask(id);
    const data = await fetchGraphql(query);
    if (!data.data.deleteTask.name * 1 === 1)
      return alert('Error: Unsucessful');
    deleteCard(index);
  };

  return (
    <div onClick={() => click()} className="taskDelete button">
      Delete
    </div>
  );
}
