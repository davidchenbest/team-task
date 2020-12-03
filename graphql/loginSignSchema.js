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
const bcryptString = require('../modules/bcryptString');

const createToken = require('../modules/createToken');

const LoginQuery = new GraphQLObjectType({
  name: 'LoginQueryType',
  fields: {
    login: {
      type: LoginType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let command = sqlCommands('EMAIL', { email: args.email });
        let user = new Promise((resolve, reject) => {
          DB.get(command, async (error, row, data) => {
            if (error) reject(console.log(error));

            if (!row) return resolve({ error: 'Incorrect' });

            const auth = await bcrypt.compare(args.password, row.password);
            if (!auth) return resolve({ error: 'Incorrect' });

            const token = createToken(args.password);
            resolve({ token });
          });
        });
        return await user;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: LoginType,
      args: {
        email: { type: GraphQLString },
        first: { type: GraphQLString },
        last: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        if (args.password.length < 6) return { error: 'Password too short' };
        if (!args.email.includes('@')) return { error: 'Not a valid Email' };
        args.password = await bcryptString(args.password);
        let command = sqlCommands('SIGNUP', {
          email: args.email,
          first: args.first,
          last: args.last,
          password: args.password,
        });
        let user = new Promise((resolve, reject) => {
          DB.get(command, async (error, row, data) => {
            if (error)
              resolve({
                error: 'duplicate',
              });
            resolve({ error: 'signup success' });
          });
        });
        return await user;
      },
    },
  },
});

let loginSignSchema = new GraphQLSchema({
  query: LoginQuery,
  mutation: Mutation,
});

module.exports = loginSignSchema;
