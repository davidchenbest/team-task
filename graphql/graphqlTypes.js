const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
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
  }),
});
module.exports = { UserType, LoginType };
