function sqlCommands(type, data = {}) {
  switch (type) {
    case 'SIGNUP':
      data.username = data.username.trim().toLowerCase();
      data.first = formatName(data.first);
      data.last = formatName(data.last);
      return `INSERT into users(username,first,last,password)  values ('${data.username}','${data.first}', '${data.last}','${data.password}' )`;

    case 'USERNAME':
      data.username = data.username.trim().toLowerCase();
      return `SELECT * from users where username='${data.username}'`;
  }
}

function formatName(str) {
  str = str.trim().toLowerCase();
  str = str[0].toUpperCase() + str.substring(1, str.length);
  return str;
}

module.exports = { sqlCommands };
