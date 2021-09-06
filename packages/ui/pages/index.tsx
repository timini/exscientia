import { gql } from "@apollo/client";
import { Compound } from "@exscientia/types";
import type { NextPage } from "next";
import client from "../apollo-client";

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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: ALL_COMPOUNDS,
  });
  return {
    props: {
      compounds: data.allCompounds.nodes,
    },
  };
}

const Home: NextPage = ({ compounds }: { compounds: Compound[] }) => (
  <div>
    {compounds.map(({ compoundId }) => (
      <div key={compoundId}>{compoundId}</div>
    ))}
  </div>
);

export default Home;
