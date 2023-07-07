const express = require("express");
const path = require("path");
require("graphql");
const { ApolloServer } = require("apollo-server-express");

// const { buildSchema } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// will read any files matching our patterns and pass the text the file contained
const { loadFilesSync } = require("@graphql-tools/load-files");

// will look in directory and subdirectory for graphql files and path.join will create a file path by concatenaing multiple parts of the path together
// const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));

const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  // apolloserver contains middleware and logic to handle graphQL requests
  // const schema defines how our server will respond to request
  const server = new ApolloServer({
    schema,
  });
  // getting apollo ready for requests
  await server.start();
  // connect apollo middleware with server
  // app as argument here is telling which express app to connect to
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(3000, () => {
    console.log("Running graphQl server.");
  });
}

startApolloServer();
