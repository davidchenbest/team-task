const { sqlCommands } = require('../sqlCommands/authCommands');
const taskCommands = require('../sqlCommands/taskCommands');
const sqlite3 = require('sqlite3').verbose();
const DB = new sqlite3.Database('./taskManage.db');
const { UserType, TaskType } = require('./graphqlTypes');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require('graphql');
const bcrypt = require('bcrypt');

const createToken = require('../modules/createToken');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        let command = taskCommands('USERS');
        return new Promise((resolve, reject) => {
          DB.all(command, (error, rows, data) => {
            if (error) reject(console.log(error));
            resolve(rows);
          });
        });
      },
    },
    usersIdUsername: {
      type: new GraphQLList(UserType),
      resolve() {
        let command = taskCommands('USERSIDUSERNAME');
        return new Promise((resolve, reject) => {
          DB.all(command, (error, rows, data) => {
            if (error) reject(console.log(error));
            resolve(rows);
          });
        });
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        let command = taskCommands('ALLTASK');
        return new Promise((resolve, reject) => {
          DB.all(command, (error, rows, data) => {
            if (error) reject(console.log(error));
            resolve(rows);
          });
        });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        assignTo: { type: GraphQLID, GraphQLNonNull },
        assignBy: { type: GraphQLID, GraphQLNonNull },
        name: { type: GraphQLString, GraphQLNonNull },
        difficulty: { type: GraphQLID },
        ratedDifficulty: { type: GraphQLID },
      },
      async resolve(parent, args) {
        let { assignTo, assignBy, name, difficulty, ratedDifficulty } = args;
        let command = taskCommands('ADDTASK', {
          assignTo,
          assignBy,
          name,
          difficulty,
          ratedDifficulty,
        });
        let task = new Promise((resolve, reject) => {
          DB.get(command, async (error, row, data) => {
            if (error)
              resolve({
                name: 'error',
              });
            resolve({ name: 'success' });
          });
        });
        return await task;
      },
    },
    updateRated: {
      type: TaskType,
      args: {
        ratedDifficulty: { type: GraphQLInt, GraphQLNonNull },
        id: { type: GraphQLID, GraphQLNonNull },
      },
      async resolve(parent, args) {
        let { ratedDifficulty, id } = args;
        let command = taskCommands('UPDATERATED', { ratedDifficulty, id });
        let task = new Promise((resolve, reject) => {
          DB.get(command, async (error, row, data) => {
            if (error)
              resolve({
                ratedDifficulty: 0,
              });
            resolve({ ratedDifficulty: 1 });
          });
        });
        return await task;
      },
    },
  },
});

let graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = graphQLSchema;
