import { gql } from "@apollo/client";
import {
  Compound,
  CompoundsConnection,
  isDefinitelyCompound,
} from "@exscientia/types";
import client from "apollo-client";
import { Table } from "components";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Column } from "react-table";

const GET_ALL_COMPOUNDS = gql`
  query GetAllCompounds {
    allCompounds {
      nodes {
        compoundId
        molecularFormula
        alogp
        molecularWeight
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
      compounds: data.allCompounds.nodes.filter(isDefinitelyCompound),
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

const CompoundListPage: NextPage<{ compounds: Compound[] }> = ({
  compounds,
}) => {
  return (
    <div className="card lg:card-side bordered rounded-lg shadow-lg">
      <div className="card-body">
        <h1 className="card-title">Compounds</h1>
        <Table<Compound> columns={columns} data={compounds} />
      </div>
    </div>
  );
};

export default CompoundListPage;
