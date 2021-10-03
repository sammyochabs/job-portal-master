import { gql } from "@apollo/client";

export const JOBS_QUERY = gql`
  query getJobs {
    jobs {
      title
      description
      cities {
        name
      }
      company {
        name
        websiteUrl
      }
    }
  }
`;
