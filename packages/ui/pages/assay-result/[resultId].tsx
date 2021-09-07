import { gql } from "@apollo/client";
import { AssayResult } from "@exscientia/types";
import client from "apollo-client";
import { Stat } from "components";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

const GET_ASSAY_RESULT_BY_ID = gql`
  query GetAssayResultById($resultId: Int!) {
    assayResultByResultId(resultId: $resultId) {
      resultId
      result
      bioTarget
      operator
      unit
      val
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
      </div>
    </div>
  );
};

export default AssayResultDetailPage;
