import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: `https://next-strapi-stripe-backend.herokuapp.com/graphql`,
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

export default client;
