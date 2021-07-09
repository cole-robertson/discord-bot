import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import dotenv from "dotenv";
dotenv.config();
import fetch from "cross-fetch";

const cache = new InMemoryCache();

const client = new ApolloClient({
  name: "discord-bot",
  cache,
  // let cache be handled by GraphCDN
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "ignore",
    },
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "ignore",
    },
  },
  link: new HttpLink({
    uri: process.env.GRAPH_QL_URL,
    fetch,
  }),
});

export default client;
