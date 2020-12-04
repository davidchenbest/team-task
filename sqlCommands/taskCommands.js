function sqlCommands(type) {
  switch (type) {
    case 'ALLTASK':
      return 'SELECT * from tasks order by createdDate desc';
    case 'ADDTASK':
      return `INSERT into tasks(assignTo,assignBy,name,difficulty)  values (?,?,?,?)`;
    case 'USERS':
      return 'SELECT * from users';
    case 'USERSIDUSERNAME':
      return 'SELECT id,username from users';
    case 'UPDATERATED':
      return `UPDATE tasks SET ratedDifficulty = ? WHERE tasks.id=?;`;
    case 'USERBYID':
      return `select * from users where id=?`;
    case 'DELETETASK':
      return 'delete from tasks where id=?';
  }
}

module.exports = sqlCommands;
