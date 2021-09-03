import { gql, useQuery } from "@apollo/client";
import React from "react";
const ALL_COMPOUNDS = gql`
  query GetAllCompounds {
    allCompounds {
      nodes {
        compoundId
        assayResultsByCompoundId {
          nodes {
            resultId
          }
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(ALL_COMPOUNDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.allCompounds.map(({ compoundId }) => <div>{compoundId}</div>);
}

export default App;
