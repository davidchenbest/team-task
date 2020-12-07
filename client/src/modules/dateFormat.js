function dateFunction(str) {
  let date = new Date(str);
  let today = new Date();

  if (date.toLocaleDateString() === today.toLocaleDateString())
    return date.toLocaleTimeString();

  if (date.getFullYear() === today.getFullYear())
    return `${date.getMonth()}/${date.getDate()}`;

  return date.toLocaleDateString();
}

module.exports = dateFunction;
