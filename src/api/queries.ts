import { gql } from 'graphql-request';

export const GET_POSTS = gql`
  query GetPosts($page: Int!, $limit: Int!) {
    posts(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        id
        title
        body
        user {
          id
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_POST_DETAIL = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
        name
        email
      }
      comments {
        data {
          id
          name
          email
          body
        }
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
      user {
        id
        name
      }
    }
  }
`;
