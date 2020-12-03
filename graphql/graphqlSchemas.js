const { sqlCommands } = require('../sqlCommands/authCommands');
const sqlite3 = require('sqlite3').verbose();
const DB = new sqlite3.Database('./taskManage.db');
const { UserType, LoginType } = require('./graphqlTypes');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
const bcrypt = require('bcrypt');

const createToken = require('../modules/createToken');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        let command = sqlCommands('ALL');
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

let graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation
});

module.exports = graphQLSchema;
