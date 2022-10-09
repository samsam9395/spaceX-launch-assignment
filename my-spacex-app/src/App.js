import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import DataTable from "./DataTable";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <DataTable />
    </ApolloProvider>
  );
}

export default App;
