import { gql } from "@apollo/client/core";

export const GET_USERS = gql`
  query GetUsers {
    user {
      name
      count
      id
    }
  }
`;

export const INCREMENT_COUNT = gql`
  mutation UpdateUser($discord_id: String!) {
    update_user(where: { id: { _eq: $discord_id } }, _inc: { count: 1 }) {
      affected_rows
      returning {
        name
        count
        id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation InsertUser($discord_id: String!, $userName: String, $count: Int) {
    insert_user(objects: { id: $discord_id, name: $userName, count: $count }) {
      affected_rows
    }
  }
`;
