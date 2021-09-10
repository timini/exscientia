import { gql } from "@apollo/client";
import {
  AssayResult,
  Compound,
  isDefinitelyAssayResult,
} from "@exscientia/types";
import client from "apollo-client";
import { Stat, Table } from "components";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Column } from "react-table";

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

const columns: Column<AssayResult>[] = [
  {
    Header: "",
    accessor: "resultId",
    Cell: ({ row }) => (
      <Link
        href={`/assay-result/${row.values.resultId}`}
        {...row.getRowProps()}
      >
        <a className="link link-primary">{row.values.resultId}</a>
      </Link>
    ),
  },
  {
    Header: "Bio Target",
    accessor: "bioTarget",
  },
  {
    Header: "Result",
    accessor: "result",
  },
  {
    Header: "Value",
    accessor: "val",
  },
];

const CompoundDetailPage: NextPage<{ compound: Compound | undefined }> = ({
  compound,
}) => {
  if (!compound) return <div>404</div>;
  return (
    <>
      <div className="card lg:card-side bordered rounded-lg shadow-lg">
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
            <Table<AssayResult>
              data={compound.assayResultsByCompoundId.nodes.filter(
                isDefinitelyAssayResult
              )}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompoundDetailPage;
