import { GraphQLClient } from 'graphql-request';

export const GRAPHQL_ENDPOINT = 'https://graphqlzero.almansi.me/api';

export const gqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
  }
});
