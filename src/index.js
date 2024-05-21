import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //useQuery,
  //gql,
} from "@apollo/client";
import App from "./App";
//import AppNavBar from './menu/AppNavBar';
//import { HookForm } from './examples/HookForm';
import "./index.css";

const client = new ApolloClient({
  //uri: "https://48p1r2roz4.sse.codesandbox.io",
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    {" "}
    <App />{" "}
  </ApolloProvider>,
  document.getElementById("root")
);
