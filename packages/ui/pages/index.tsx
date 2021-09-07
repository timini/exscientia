import { gql } from "@apollo/client";
import { Compound, CompoundsConnection, isCompound } from "@exscientia/types";
import client from "apollo-client";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";

const GET_ALL_COMPOUNDS = gql`
  query GetAllCompounds {
    allCompounds {
      nodes {
        compoundId
        molecularFormula
        assayResultsByCompoundId {
          nodes {
            resultId
          }
        }
      }
    }
  }
`;

type GET_ALL_COMPOUNDS_DATA = {
  allCompounds: CompoundsConnection;
};

export const getServerSideProps: GetServerSideProps<{
  compounds: Compound[];
}> = async () => {
  const { data } = await client.query<GET_ALL_COMPOUNDS_DATA>({
    query: GET_ALL_COMPOUNDS,
  });
  return {
    props: {
      compounds: data.allCompounds.nodes.filter(isCompound),
    },
  };
};

const CompoundListPage: NextPage<{ compounds: Compound[] }> = ({
  compounds,
}) => (
  <article className="prose lg:prose-xl">
    <h1>Compounds</h1>
    {compounds.map((compound) => (
      <div key={compound.compoundId}>
        {compound.molecularFormula}{" "}
        <Link href={`/compound/${compound.compoundId}`}>
          <a className="link link-primary">{compound.compoundId}</a>
        </Link>
      </div>
    ))}
  </article>
);

export default CompoundListPage;
