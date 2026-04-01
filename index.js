const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// 1. Define schema
const typeDefs = `
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    createUser(name: String!, age: Int!): User
  }
`;

// 2. Fake Database
const users = [
  { id: "1", name: "Emmanuel", age: 25 },
  { id: "2", name: "Alice", age: 22 },
  { id: "3", name: "Bob", age: 30 },
];

// 3. Define resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => {
      return users.find(user => user.id === args.id);
    },
  },

  // Resolvers for mutations

   Mutation:{
    createUser: (_, args) => {
      const newUser = {
        id: String(users.length + 1),
        name: args.name,
        age: args.age,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

// 4. Create server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 5. Start server
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}).catch((err) => {
  console.error("Error starting server:", err);
});