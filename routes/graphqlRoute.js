const express = require('express');
const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const graphQLSchema = require('../graphql/graphqlSchemas');
const loginSignSchema = require('../graphql/loginSignSchema');
const jwtAuth = require('../middleware/authMiddleware');

router.use(
  '/graphql',
  jwtAuth,
  graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true,
  })
);

router.use(
  '/loginsign',
  graphqlHTTP({
    schema: loginSignSchema,
    graphiql: true,
  })
);

module.exports = router;
