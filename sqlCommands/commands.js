function sqlCommands(type, data = {}) {
  switch (type) {
    case 'INSERT':
      return `INSERT into users(email,first,last)  values ('${data.email}','${data.first}', '${data.last}' )`;
    case 'ALL':
      return 'SELECT * from users';
  }
}

module.exports = { sqlCommands };
