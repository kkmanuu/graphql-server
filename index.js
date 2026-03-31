const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
// definde schema
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Deefine resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, world! This is a simple GraphQL server."
  }
};

// create server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// start server
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
}).catch((err) => {
  console.error("Error starting server:", err);
});