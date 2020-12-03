const { LoneSchemaDefinitionRule } = require('graphql');

function sqlCommands(type, data = {}) {
  switch (type) {
    case 'SIGNUP':
      data.email = data.email.trim().toLowerCase();
      data.first = formatName(data.first);
      data.last = formatName(data.last);
      return `INSERT into users(email,first,last,password)  values ('${data.email}','${data.first}', '${data.last}','${data.password}' )`;
    case 'ALL':
      return 'SELECT * from users';
    case 'EMAIL':
      data.email = data.email.trim().toLowerCase();
      return `SELECT * from users where email='${data.email}'`;
  }
}

function formatName(str) {
  str = str.trim().toLowerCase();
  str = str[0].toUpperCase() + str.substring(1, str.length);
  return str;
}

module.exports = { sqlCommands };
