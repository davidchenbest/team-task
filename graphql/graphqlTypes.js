const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require('graphql');

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
    assignTo: { type: GraphQLID },
    assignBy: { type: GraphQLID },
    name: { type: GraphQLString },
    difficulty: { type: GraphQLInt },
    ratedDifficulty: { type: GraphQLInt },
    id: { type: GraphQLID },
  }),
});
module.exports = { UserType, LoginType, TaskType };
