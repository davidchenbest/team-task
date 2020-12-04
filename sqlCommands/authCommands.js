function sqlCommands(type) {
  switch (type) {
    case 'SIGNUP':
      return `INSERT into users(username,first,last,password)  values (?,?,?,?)`;

    case 'USERNAME':
      return `SELECT * from users where username=?`;
  }
}

module.exports = { sqlCommands };
