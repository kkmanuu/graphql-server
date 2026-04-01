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
    updateUser(id: ID!, name: String, age: Int): User
    deleteUser(id: ID!): String
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

  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        id: String(users.length + 1),
        name: args.name,
        age: args.age,
      };
      users.push(newUser);
      return newUser;
    },

    updateUser: (_, args) => {
      const user = users.find(user => user.id === args.id);
      if (!user) throw new Error("User not found");

      user.name = args.name ?? user.name;
      user.age = args.age ?? user.age;

      return user;
    },

    deleteUser: (_, args) => {
      const index = users.findIndex(user => user.id === args.id);
      if (index === -1) throw new Error("User not found");

      users.splice(index, 1);
      return "User deleted successfully";
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