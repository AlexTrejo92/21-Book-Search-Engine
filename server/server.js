const express = require('express');
// Importing the ApolloServer class
const {ApolloServer} = require('apollo-server-express');
// iMPORT THE TWO PARTS OF A Graph Schema
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const path = require('path');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

// Use the Spollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
//TODO: added this to the code.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with GraphQL schema
const startApolloServer = async () => {
  await server.start();
  // this line makes the connection betweeen express app with the apollo server
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      )
    })
  })
}


app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

// We call the function to start the server
startApolloServer();