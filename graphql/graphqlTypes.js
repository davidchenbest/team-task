const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require('graphql');

const sqlite3 = require('sqlite3').verbose();
const DB = new sqlite3.Database('./taskManage.db');

const taskCommands = require('../sqlCommands/taskCommands');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    first: { type: GraphQLString },
    last: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: () => ({
    token: { type: GraphQLString },
    error: { type: GraphQLString },
    id: { type: GraphQLID },
  }),
});

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    assignTo: {
      type: UserType,
      async resolve(parent, args) {
        let command = taskCommands('USERBYID');
        let user = new Promise((resolve, reject) => {
          DB.get(command, [parent.assignTo], async (error, row, data) => {
            if (error) reject(console.log(error));
            if (!row) return resolve({ username: 'Incorrect' });
            resolve(row);
          });
        });
        return await user;
      },
    },
    assignBy: {
      type: UserType,
      async resolve(parent, args) {
        let command = taskCommands('USERBYID');
        let user = new Promise((resolve, reject) => {
          DB.get(command, [parent.assignBy], async (error, row, data) => {
            if (error) reject(console.log(error));
            if (!row) return resolve({ username: 'Incorrect' });
            resolve(row);
          });
        });
        return await user;
      },
    },
    name: { type: GraphQLString },
    difficulty: { type: GraphQLInt },
    ratedDifficulty: { type: GraphQLInt },
    id: { type: GraphQLID },
  }),
});
module.exports = { UserType, LoginType, TaskType };
