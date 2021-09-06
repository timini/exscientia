import { gql } from "@apollo/client";
import { AssayResult } from "@exscientia/types";
import client from "apollo-client";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

const GET_ASSAY_RESULT_BY_ID = gql`
  query GetAssayResultById($resultId: Int!) {
    assayResultByResultId(resultId: $resultId) {
      resultId
      result
      bioTarget
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
    <div>
      <div>ID: {assayResult.resultId}</div>
      <div>Result: {assayResult.result}</div>
      <div>bio target: {assayResult.bioTarget}</div>
    </div>
  );
};

export default AssayResultDetailPage;
