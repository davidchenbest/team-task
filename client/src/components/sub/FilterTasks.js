import React, { useState } from 'react';

export default function FilterTasks({
  hideTasks,
  hideAssignTasks,
  hideOtherTasks,
  setHideOtherTasks,
  setHideTasks,
  setHideAssignTasks,
}) {
  const [checkboxes, setCheckboxes] = useState([
    {
      value: 'Your Task',
      checked: !hideTasks,
    },
    {
      value: 'Assign Task',
      checked: !hideAssignTasks,
    },
    {
      value: 'Other Task',
      checked: !hideOtherTasks,
    },
  ]);

  const submitForm = function (e) {
    e.preventDefault();
    setHideTasks(!checkboxes[0].checked);
    setHideAssignTasks(!checkboxes[1].checked);
    setHideOtherTasks(!checkboxes[2].checked);
  };

  const click = (e) => {
    let arr = [...checkboxes];
    arr.forEach((a) => {
      if (a.value === e.target.value) {
        return (a.checked = !a.checked);
      }
    });
    setCheckboxes(arr);
  };

  return (
    <div className="taskFilterCon">
      <form onSubmit={(e) => submitForm(e)}>
        {checkboxes.map((checkbox, index) => (
          <div className="checkboxCon">
            <label>{checkbox.value}</label>
            <input
              type="checkbox"
              checked={checkbox.checked}
              key={index}
              value={checkbox.value}
              onChange={(e) => click(e)}
            />
          </div>
        ))}
        <input type="submit" />
      </form>
    </div>
  );
}
