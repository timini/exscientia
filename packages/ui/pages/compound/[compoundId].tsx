import { gql } from "@apollo/client";
import { Compound } from "@exscientia/types";
import client from "apollo-client";
import { Stat } from "components";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";

const GET_COMPOUND_BY_ID = gql`
  query GetCompoundById($compoundId: Int!) {
    compoundByCompoundId(compoundId: $compoundId) {
      compoundId
      smiles
      molecularWeight
      alogp
      molecularFormula
      numRings
      img
      assayResultsByCompoundId {
        nodes {
          resultId
          bioTarget
          result
          val
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
    <>
      {/* <div>
        <article className="prose lg:prose-xl">
          <h1>Compound {compound.compoundId}</h1>
        </article>
      </div> */}
      <div className="card lg:card-side bordered rounded-lg  shadow-lg">
        <figure className="p-6">
          <img
            src={`/${compound.img}`}
            alt="compound image"
            className="w-full rounded-lg shadow-lg"
            width="500"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {compound.smiles} <div className="badge badge-accent">smiles</div>
          </h2>
          <div className="w-full shadow stats">
            <Stat
              title="AlogP"
              value={compound.alogp}
              description={
                <div className="">Molecular hydrophobicity (lipophilicity)</div>
              }
            />
            <Stat
              title="Molecular Weight"
              value={`${compound.molecularWeight}kDa`}
              description={<div className="">The weight of the compound.</div>}
            />
          </div>
          <div className="w-full shadow stats mt-2">
            {compound.molecularFormula && (
              <Stat
                title="Molecular Formula"
                value={compound.molecularFormula}
                description={
                  <div className="">
                    A short string representation of the compound.
                  </div>
                }
              />
            )}
            <Stat
              title="Num Rings"
              value={compound.numRings}
              description={
                <div className="">A count of the rings in the compound.</div>
              }
            />
          </div>
          <div className="mt-5">
            <h1>Assay Results</h1>
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Bio Target</th>
                  <th>Result</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {compound.assayResultsByCompoundId.nodes.map((ar) =>
                  ar ? (
                    <tr key={ar.resultId}>
                      <th>
                        <Link href={`/assay-result/${ar.resultId}`}>
                          <a className="link link-primary">{ar.resultId}</a>
                        </Link>
                      </th>
                      <td>{ar.bioTarget}</td>
                      <td>{ar.result}</td>
                      <td>{ar.val}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompoundDetailPage;
