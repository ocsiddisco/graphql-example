const express = require("express");
const path = require("path");
require("graphql");

// const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// will read any files matching our patterns and pass the text the file contained
const { loadFilesSync } = require("@graphql-tools/load-files");

// will look in directory and subdirectory for graphql files and path.join will create a file path by concatenaing multiple parts of the path together
// const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));

const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
  //   resolvers: {
  //     Query: {
  //       // parent is the root of the data, args is helpful to filter, context is usefull for data shared accross all resolvers, info contains info about current state of operation
  //       products: async (parent, args, context, info) => {
  //         console.log(" getting the products...");
  //         // with promise or async function, resolver will wait promise to resolve before sending back data
  //         const products = await Promise.parent.products;
  //         return products;
  //       },
  //       orders: (parent, args, context, info) => {
  //         console.log(" getting the orders...");
  //         return parent.orders;
  //       },
  //     },
  //   },
});

// String! : require
// const schema = buildSchema(`
//     type Query {
//        products: [Product]
//        orders: [Order]
//     }

//     type Product {
//         id: ID!
//         description: String!
//         reviews: [Review]
//         price: Float!

//     }

//     type Review {
//         rating: Int!
//         comment: String
//     }

//     type Order {
//         date: String!
//         subtotal: Float!
//         items: [OrderItem]
//     }

//     type OrderItem {
//         product: Product!
//         quantity: Int!
//     }
// `);

// const root = {
//   products: require("./products/products.models"),
//   orders: require("./orders/orders.models"),
// };
const app = express();

// graphiql is in the graphqlhttp package. by setting it to true, it is enable and accessible via localhost:3000/graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Running graphQl server.");
});
