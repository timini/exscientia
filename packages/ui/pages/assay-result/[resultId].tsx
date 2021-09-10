import { gql } from "@apollo/client";
import { AssayResult, Compound } from "@exscientia/types";
import client from "apollo-client";
import { Stat, Table } from "components";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Column } from "react-table";

const GET_ASSAY_RESULT_BY_ID = gql`
  query GetAssayResultById($resultId: Int!) {
    assayResultByResultId(resultId: $resultId) {
      resultId
      result
      bioTarget
      operator
      unit
      val
      compoundByCompoundId {
        compoundId
        molecularFormula
      }
    }
  }
`;

type GET_ASSAY_RESULT_BY_ID_VARS = {
  resultId: number;
};

type GET_ASSAY_RESULT_BY_ID_DATA = {
  assayResultByResultId: Partial<AssayResult>;
};

export const getServerSideProps: GetServerSideProps<
  { assayResult?: Partial<AssayResult> },
  { resultId: string }
> = async ({ params: { resultId } = {} }) => {
  if (!resultId || isNaN(parseInt(resultId))) return { props: {} };
  const { data } = await client.query<
    GET_ASSAY_RESULT_BY_ID_DATA,
    GET_ASSAY_RESULT_BY_ID_VARS
  >({
    query: GET_ASSAY_RESULT_BY_ID,
    variables: {
      resultId: parseInt(resultId),
    },
  });
  return {
    props: {
      assayResult: data.assayResultByResultId,
    },
  };
};

const columns: Column<Compound>[] = [
  {
    Header: "",
    accessor: "compoundId",
    Cell: ({ row }) => (
      <Link href={`/compound/${row.values.compoundId}`} {...row.getRowProps()}>
        <a className="link link-primary">{row.values.compoundId}</a>
      </Link>
    ),
  },
  { Header: "Molecular Formula", accessor: "molecularFormula" },
  { Header: "ALogP", accessor: "alogp" },
  { Header: "Molecular Weight", accessor: "molecularWeight" },
];

const AssayResultDetailPage: NextPage<{
  assayResult: AssayResult | undefined;
}> = ({ assayResult }) => {
  if (!assayResult) return <div>404</div>;
  return (
    <div className="card bordered rounded-lg shadow-lg">
      <div className="card-body">
        <h2 className="card-title">
          {assayResult.bioTarget}{" "}
          <div className="badge badge-accent">target</div>
        </h2>
        <div className="w-full shadow stats">
          <Stat
            title="Result"
            value={assayResult.result || "Unknown"}
            description={<div className="">The result type of the assay.</div>}
          />
          <Stat
            title="Value"
            value={assayResult.val || "Unknown"}
            description={<div className="">The result value.</div>}
          />
        </div>
        <div className="w-full shadow stats">
          <Stat
            title="Operator"
            value={assayResult.operator || "Unknown"}
            description={<div className="">The value operator.</div>}
          />
          <Stat
            title="Unit"
            value={assayResult.unit || "Unknown"}
            description={<div className="">The result unit.</div>}
          />
        </div>
        <div className="mt-5">
          <h1>Compound</h1>
          {assayResult.compoundByCompoundId && (
            <Table<Compound>
              columns={columns}
              data={[assayResult.compoundByCompoundId]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AssayResultDetailPage;
