import React, { useState } from 'react';
import OrderDirect from './OrderDirect';
import OrderCategory from './OrderCategory';
import '../../../css/filterTasks.css';

export default function FilterTasks({
  tasks,
  assignTasks,
  otherTasks,
  setTasks,
  setAssignTasks,
  setOtherTasks,
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

  const [order, setOrder] = useState('time');

  const [orderDirect, setOrderDirect] = useState('');

  const submitForm = function (e) {
    e.preventDefault();
    setHideTasks(!checkboxes[0].checked);
    setHideAssignTasks(!checkboxes[1].checked);
    setHideOtherTasks(!checkboxes[2].checked);
    setTasks(orderSort(tasks));
    setAssignTasks(orderSort(assignTasks));
    setOtherTasks(orderSort(otherTasks));
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

  function orderSort(arr) {
    let category = switchOrderName(order);

    let ar = [...arr];
    if (orderDirect === 'asc')
      return ar.sort((a, b) =>
        taskObj.getName.call(a, category) > taskObj.getName.call(b, category)
          ? 1
          : -1
      );
    else if (orderDirect === 'desc')
      return ar.sort((a, b) =>
        taskObj.getName.call(a, category) > taskObj.getName.call(b, category)
          ? -1
          : 1
      );
    return arr;
  }

  function switchOrderName(order) {
    switch (order) {
      case 'time':
        return 'createdDate';
      case 'assignor':
        return 'assignBy';
      case 'designator':
        return 'assignTo';
      default:
        return order;
    }
  }

  let taskObj = {
    getName: function (category) {
      if (category === 'assignBy' || category === 'assignTo')
        return this[category]['username'];
      return this[category];
    },
  };

  return (
    <div className="taskFilterCon">
      <form onSubmit={(e) => submitForm(e)}>
        <div className="checkboxWrapper">
          {checkboxes.map((checkbox, index) => (
            <div className="checkboxCon" key={index}>
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
        </div>

        <OrderCategory oreder={order} setOrder={setOrder} />
        <OrderDirect setOrderDirect={setOrderDirect} />

        <input type="submit" className="button" />
      </form>
    </div>
  );
}
