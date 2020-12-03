function sqlCommands(type, data = {}) {
  switch (type) {
    case 'ALLTASK':
      return 'SELECT * from tasks';
    case 'ADDTASK':
      if (!checkDifficulty(data)) throw Error('not valid');
      return `INSERT into tasks(assignTo,assignBy,name,difficulty)  values ('${data.assignTo}','${data.assignBy}','${data.name}', '${data.difficulty}' )`;
    case 'USERS':
      return 'SELECT * from users';
    case 'USERSIDUSERNAME':
      return 'SELECT id,username from users';
    case 'UPDATERATED':
      return `UPDATE tasks SET ratedDifficulty = ${data.ratedDifficulty} WHERE tasks.id=${data.id};`;
  }
}

function checkDifficulty(data) {
  const { difficulty, ratedDifficulty } = data;
  if (
    difficulty < 1 ||
    difficulty > 5 ||
    ratedDifficulty < 1 ||
    ratedDifficulty > 5
  ) {
    return false;
  }
  return true;
}

module.exports = sqlCommands;
