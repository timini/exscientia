import { gql } from "@apollo/client";
import { Compound } from "@exscientia/types";
import client from "apollo-client";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";

const GET_COMPOUND_BY_ID = gql`
  query GetCompoundById($compoundId: Int!) {
    compoundByCompoundId(compoundId: $compoundId) {
      compoundId
      numRings
      smiles
      assayResultsByCompoundId {
        nodes {
          resultId
        }
      }
    }
  }
`;

type GET_COMPOUND_BY_ID_VARS = {
  compoundId: number;
};

type GET_COMPOUND_BY_ID_DATA = {
  compoundByCompoundId: Partial<Compound>;
};

export const getServerSideProps: GetServerSideProps<
  { compound?: Partial<Compound> },
  { compoundId: string }
> = async ({ params: { compoundId } = {} }) => {
  if (!compoundId || isNaN(parseInt(compoundId))) return { props: {} };
  const { data } = await client.query<
    GET_COMPOUND_BY_ID_DATA,
    GET_COMPOUND_BY_ID_VARS
  >({
    query: GET_COMPOUND_BY_ID,
    variables: {
      compoundId: parseInt(compoundId),
    },
  });
  return {
    props: {
      compound: data.compoundByCompoundId,
    },
  };
};

const CompoundDetailPage: NextPage<{ compound: Compound | undefined }> = ({
  compound,
}) => {
  if (!compound) return <div>404</div>;
  return (
    <div>
      <div>ID: {compound.compoundId}</div>
      <div>Num rings: {compound.numRings}</div>
      <div>smiles: {compound.smiles}</div>
      <div>
        {compound.assayResultsByCompoundId.nodes.map((ar) =>
          ar ? (
            <div key={ar.resultId}>
              <Link href={`/assay-result/${ar.resultId}`}>
                <a>{ar.resultId}</a>
              </Link>
              {ar.resultId}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default CompoundDetailPage;
