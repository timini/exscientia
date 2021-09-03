export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
};

/** The assay results for the compound (could be shown as Kd = 19uM) https://en.wikipedia.org/wiki/Assay. */
export type AssayResult = Node & {
  __typename?: 'AssayResult';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Unique identifier for an assay_result. */
  resultId: Scalars['Int'];
  /** The long name of the biological target used in the assay. */
  bioTarget?: Maybe<Scalars['String']>;
  /** The result type of the assay. */
  result?: Maybe<Result>;
  /** The value operator. */
  operator?: Maybe<Operator>;
  /** The result value. */
  val?: Maybe<Scalars['String']>;
  /** The result unit. */
  unit?: Maybe<Scalars['String']>;
  /** The compound this assay was run against. */
  compoundId?: Maybe<Scalars['Int']>;
  /** Reads a single `Compound` that is related to this `AssayResult`. */
  compoundByCompoundId?: Maybe<Compound>;
};

/**
 * A condition to be used against `AssayResult` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AssayResultCondition = {
  /** Checks for equality with the object’s `resultId` field. */
  resultId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `bioTarget` field. */
  bioTarget?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `result` field. */
  result?: Maybe<Result>;
  /** Checks for equality with the object’s `operator` field. */
  operator?: Maybe<Operator>;
  /** Checks for equality with the object’s `val` field. */
  val?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `unit` field. */
  unit?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `compoundId` field. */
  compoundId?: Maybe<Scalars['Int']>;
};

/** An input for mutations affecting `AssayResult` */
export type AssayResultInput = {
  /** Unique identifier for an assay_result. */
  resultId?: Maybe<Scalars['Int']>;
  /** The long name of the biological target used in the assay. */
  bioTarget?: Maybe<Scalars['String']>;
  /** The result type of the assay. */
  result?: Maybe<Result>;
  /** The value operator. */
  operator?: Maybe<Operator>;
  /** The result value. */
  val?: Maybe<Scalars['String']>;
  /** The result unit. */
  unit?: Maybe<Scalars['String']>;
  /** The compound this assay was run against. */
  compoundId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `AssayResult`. Fields that are set will be updated. */
export type AssayResultPatch = {
  /** Unique identifier for an assay_result. */
  resultId?: Maybe<Scalars['Int']>;
  /** The long name of the biological target used in the assay. */
  bioTarget?: Maybe<Scalars['String']>;
  /** The result type of the assay. */
  result?: Maybe<Result>;
  /** The value operator. */
  operator?: Maybe<Operator>;
  /** The result value. */
  val?: Maybe<Scalars['String']>;
  /** The result unit. */
  unit?: Maybe<Scalars['String']>;
  /** The compound this assay was run against. */
  compoundId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `AssayResult` values. */
export type AssayResultsConnection = {
  __typename?: 'AssayResultsConnection';
  /** A list of `AssayResult` objects. */
  nodes: Array<Maybe<AssayResult>>;
  /** A list of edges which contains the `AssayResult` and cursor to aid in pagination. */
  edges: Array<AssayResultsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssayResult` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `AssayResult` edge in the connection. */
export type AssayResultsEdge = {
  __typename?: 'AssayResultsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AssayResult` at the end of the edge. */
  node?: Maybe<AssayResult>;
};

/** Methods to use when ordering `AssayResult`. */
export enum AssayResultsOrderBy {
  Natural = 'NATURAL',
  ResultIdAsc = 'RESULT_ID_ASC',
  ResultIdDesc = 'RESULT_ID_DESC',
  BioTargetAsc = 'BIO_TARGET_ASC',
  BioTargetDesc = 'BIO_TARGET_DESC',
  ResultAsc = 'RESULT_ASC',
  ResultDesc = 'RESULT_DESC',
  OperatorAsc = 'OPERATOR_ASC',
  OperatorDesc = 'OPERATOR_DESC',
  ValAsc = 'VAL_ASC',
  ValDesc = 'VAL_DESC',
  UnitAsc = 'UNIT_ASC',
  UnitDesc = 'UNIT_DESC',
  CompoundIdAsc = 'COMPOUND_ID_ASC',
  CompoundIdDesc = 'COMPOUND_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A small data set of compounds and assay results extracted from ChEMBL */
export type Compound = Node & {
  __typename?: 'Compound';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Unique identifier for a compound, this is the primary key. */
  compoundId: Scalars['Int'];
  /** String representation of the compound https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system. */
  smiles: Scalars['String'];
  /** The weight of the compound, could be plotted on the X axis. */
  molecularWeight?: Maybe<Scalars['BigFloat']>;
  /** Indicates if the compound will dissolve in water or not, could be plotted on the Y axis. */
  alogp?: Maybe<Scalars['BigFloat']>;
  /** A short string representation of the compound. */
  molecularFormula?: Maybe<Scalars['String']>;
  /** A count of the rings in the compound, could be used to color a plot. https://en.wikipedia.org/wiki/Ring_(chemistry) */
  numRings?: Maybe<Scalars['BigFloat']>;
  /** Compounds are visualised as 2D graphs, path to a pre-calculated png image of the compound. */
  img?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `AssayResult`. */
  assayResultsByCompoundId: AssayResultsConnection;
};


/** A small data set of compounds and assay results extracted from ChEMBL */
export type CompoundAssayResultsByCompoundIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AssayResultsOrderBy>>;
  condition?: Maybe<AssayResultCondition>;
};

/**
 * A condition to be used against `Compound` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CompoundCondition = {
  /** Checks for equality with the object’s `compoundId` field. */
  compoundId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `smiles` field. */
  smiles?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `molecularWeight` field. */
  molecularWeight?: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `alogp` field. */
  alogp?: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `molecularFormula` field. */
  molecularFormula?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `numRings` field. */
  numRings?: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `img` field. */
  img?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Compound` */
export type CompoundInput = {
  /** Unique identifier for a compound, this is the primary key. */
  compoundId?: Maybe<Scalars['Int']>;
  /** String representation of the compound https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system. */
  smiles: Scalars['String'];
  /** The weight of the compound, could be plotted on the X axis. */
  molecularWeight?: Maybe<Scalars['BigFloat']>;
  /** Indicates if the compound will dissolve in water or not, could be plotted on the Y axis. */
  alogp?: Maybe<Scalars['BigFloat']>;
  /** A short string representation of the compound. */
  molecularFormula?: Maybe<Scalars['String']>;
  /** A count of the rings in the compound, could be used to color a plot. https://en.wikipedia.org/wiki/Ring_(chemistry) */
  numRings?: Maybe<Scalars['BigFloat']>;
  /** Compounds are visualised as 2D graphs, path to a pre-calculated png image of the compound. */
  img?: Maybe<Scalars['String']>;
};

/** Represents an update to a `Compound`. Fields that are set will be updated. */
export type CompoundPatch = {
  /** Unique identifier for a compound, this is the primary key. */
  compoundId?: Maybe<Scalars['Int']>;
  /** String representation of the compound https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system. */
  smiles?: Maybe<Scalars['String']>;
  /** The weight of the compound, could be plotted on the X axis. */
  molecularWeight?: Maybe<Scalars['BigFloat']>;
  /** Indicates if the compound will dissolve in water or not, could be plotted on the Y axis. */
  alogp?: Maybe<Scalars['BigFloat']>;
  /** A short string representation of the compound. */
  molecularFormula?: Maybe<Scalars['String']>;
  /** A count of the rings in the compound, could be used to color a plot. https://en.wikipedia.org/wiki/Ring_(chemistry) */
  numRings?: Maybe<Scalars['BigFloat']>;
  /** Compounds are visualised as 2D graphs, path to a pre-calculated png image of the compound. */
  img?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Compound` values. */
export type CompoundsConnection = {
  __typename?: 'CompoundsConnection';
  /** A list of `Compound` objects. */
  nodes: Array<Maybe<Compound>>;
  /** A list of edges which contains the `Compound` and cursor to aid in pagination. */
  edges: Array<CompoundsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Compound` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Compound` edge in the connection. */
export type CompoundsEdge = {
  __typename?: 'CompoundsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Compound` at the end of the edge. */
  node?: Maybe<Compound>;
};

/** Methods to use when ordering `Compound`. */
export enum CompoundsOrderBy {
  Natural = 'NATURAL',
  CompoundIdAsc = 'COMPOUND_ID_ASC',
  CompoundIdDesc = 'COMPOUND_ID_DESC',
  SmilesAsc = 'SMILES_ASC',
  SmilesDesc = 'SMILES_DESC',
  MolecularWeightAsc = 'MOLECULAR_WEIGHT_ASC',
  MolecularWeightDesc = 'MOLECULAR_WEIGHT_DESC',
  AlogpAsc = 'ALOGP_ASC',
  AlogpDesc = 'ALOGP_DESC',
  MolecularFormulaAsc = 'MOLECULAR_FORMULA_ASC',
  MolecularFormulaDesc = 'MOLECULAR_FORMULA_DESC',
  NumRingsAsc = 'NUM_RINGS_ASC',
  NumRingsDesc = 'NUM_RINGS_DESC',
  ImgAsc = 'IMG_ASC',
  ImgDesc = 'IMG_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create `AssayResult` mutation. */
export type CreateAssayResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AssayResult` to be created by this mutation. */
  assayResult: AssayResultInput;
};

/** The output of our create `AssayResult` mutation. */
export type CreateAssayResultPayload = {
  __typename?: 'CreateAssayResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AssayResult` that was created by this mutation. */
  assayResult?: Maybe<AssayResult>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Compound` that is related to this `AssayResult`. */
  compoundByCompoundId?: Maybe<Compound>;
  /** An edge for our `AssayResult`. May be used by Relay 1. */
  assayResultEdge?: Maybe<AssayResultsEdge>;
};


/** The output of our create `AssayResult` mutation. */
export type CreateAssayResultPayloadAssayResultEdgeArgs = {
  orderBy?: Maybe<Array<AssayResultsOrderBy>>;
};

/** All input for the create `Compound` mutation. */
export type CreateCompoundInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Compound` to be created by this mutation. */
  compound: CompoundInput;
};

/** The output of our create `Compound` mutation. */
export type CreateCompoundPayload = {
  __typename?: 'CreateCompoundPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Compound` that was created by this mutation. */
  compound?: Maybe<Compound>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Compound`. May be used by Relay 1. */
  compoundEdge?: Maybe<CompoundsEdge>;
};


/** The output of our create `Compound` mutation. */
export type CreateCompoundPayloadCompoundEdgeArgs = {
  orderBy?: Maybe<Array<CompoundsOrderBy>>;
};

/** All input for the `deleteAssayResultByResultId` mutation. */
export type DeleteAssayResultByResultIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Unique identifier for an assay_result. */
  resultId: Scalars['Int'];
};

/** All input for the `deleteAssayResult` mutation. */
export type DeleteAssayResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AssayResult` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `AssayResult` mutation. */
export type DeleteAssayResultPayload = {
  __typename?: 'DeleteAssayResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AssayResult` that was deleted by this mutation. */
  assayResult?: Maybe<AssayResult>;
  deletedAssayResultId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Compound` that is related to this `AssayResult`. */
  compoundByCompoundId?: Maybe<Compound>;
  /** An edge for our `AssayResult`. May be used by Relay 1. */
  assayResultEdge?: Maybe<AssayResultsEdge>;
};


/** The output of our delete `AssayResult` mutation. */
export type DeleteAssayResultPayloadAssayResultEdgeArgs = {
  orderBy?: Maybe<Array<AssayResultsOrderBy>>;
};

/** All input for the `deleteCompoundByCompoundId` mutation. */
export type DeleteCompoundByCompoundIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Unique identifier for a compound, this is the primary key. */
  compoundId: Scalars['Int'];
};

/** All input for the `deleteCompound` mutation. */
export type DeleteCompoundInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Compound` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Compound` mutation. */
export type DeleteCompoundPayload = {
  __typename?: 'DeleteCompoundPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Compound` that was deleted by this mutation. */
  compound?: Maybe<Compound>;
  deletedCompoundId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Compound`. May be used by Relay 1. */
  compoundEdge?: Maybe<CompoundsEdge>;
};


/** The output of our delete `Compound` mutation. */
export type DeleteCompoundPayloadCompoundEdgeArgs = {
  orderBy?: Maybe<Array<CompoundsOrderBy>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `AssayResult`. */
  createAssayResult?: Maybe<CreateAssayResultPayload>;
  /** Creates a single `Compound`. */
  createCompound?: Maybe<CreateCompoundPayload>;
  /** Updates a single `AssayResult` using its globally unique id and a patch. */
  updateAssayResult?: Maybe<UpdateAssayResultPayload>;
  /** Updates a single `AssayResult` using a unique key and a patch. */
  updateAssayResultByResultId?: Maybe<UpdateAssayResultPayload>;
  /** Updates a single `Compound` using its globally unique id and a patch. */
  updateCompound?: Maybe<UpdateCompoundPayload>;
  /** Updates a single `Compound` using a unique key and a patch. */
  updateCompoundByCompoundId?: Maybe<UpdateCompoundPayload>;
  /** Deletes a single `AssayResult` using its globally unique id. */
  deleteAssayResult?: Maybe<DeleteAssayResultPayload>;
  /** Deletes a single `AssayResult` using a unique key. */
  deleteAssayResultByResultId?: Maybe<DeleteAssayResultPayload>;
  /** Deletes a single `Compound` using its globally unique id. */
  deleteCompound?: Maybe<DeleteCompoundPayload>;
  /** Deletes a single `Compound` using a unique key. */
  deleteCompoundByCompoundId?: Maybe<DeleteCompoundPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAssayResultArgs = {
  input: CreateAssayResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCompoundArgs = {
  input: CreateCompoundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssayResultArgs = {
  input: UpdateAssayResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssayResultByResultIdArgs = {
  input: UpdateAssayResultByResultIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompoundArgs = {
  input: UpdateCompoundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompoundByCompoundIdArgs = {
  input: UpdateCompoundByCompoundIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAssayResultArgs = {
  input: DeleteAssayResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAssayResultByResultIdArgs = {
  input: DeleteAssayResultByResultIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompoundArgs = {
  input: DeleteCompoundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompoundByCompoundIdArgs = {
  input: DeleteCompoundByCompoundIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export enum Operator {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  Tilde = 'TILDE',
  Asterisk = 'ASTERISK'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `AssayResult`. */
  allAssayResults?: Maybe<AssayResultsConnection>;
  /** Reads and enables pagination through a set of `Compound`. */
  allCompounds?: Maybe<CompoundsConnection>;
  assayResultByResultId?: Maybe<AssayResult>;
  compoundByCompoundId?: Maybe<Compound>;
  /** Reads a single `AssayResult` using its globally unique `ID`. */
  assayResult?: Maybe<AssayResult>;
  /** Reads a single `Compound` using its globally unique `ID`. */
  compound?: Maybe<Compound>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAssayResultsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AssayResultsOrderBy>>;
  condition?: Maybe<AssayResultCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllCompoundsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CompoundsOrderBy>>;
  condition?: Maybe<CompoundCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssayResultByResultIdArgs = {
  resultId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCompoundByCompoundIdArgs = {
  compoundId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssayResultArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCompoundArgs = {
  nodeId: Scalars['ID'];
};

export enum Result {
  Ic50 = 'IC50',
  Ki = 'KI',
  Kd = 'KD'
}

/** All input for the `updateAssayResultByResultId` mutation. */
export type UpdateAssayResultByResultIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `AssayResult` being updated. */
  assayResultPatch: AssayResultPatch;
  /** Unique identifier for an assay_result. */
  resultId: Scalars['Int'];
};

/** All input for the `updateAssayResult` mutation. */
export type UpdateAssayResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AssayResult` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `AssayResult` being updated. */
  assayResultPatch: AssayResultPatch;
};

/** The output of our update `AssayResult` mutation. */
export type UpdateAssayResultPayload = {
  __typename?: 'UpdateAssayResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AssayResult` that was updated by this mutation. */
  assayResult?: Maybe<AssayResult>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Compound` that is related to this `AssayResult`. */
  compoundByCompoundId?: Maybe<Compound>;
  /** An edge for our `AssayResult`. May be used by Relay 1. */
  assayResultEdge?: Maybe<AssayResultsEdge>;
};


/** The output of our update `AssayResult` mutation. */
export type UpdateAssayResultPayloadAssayResultEdgeArgs = {
  orderBy?: Maybe<Array<AssayResultsOrderBy>>;
};

/** All input for the `updateCompoundByCompoundId` mutation. */
export type UpdateCompoundByCompoundIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Compound` being updated. */
  compoundPatch: CompoundPatch;
  /** Unique identifier for a compound, this is the primary key. */
  compoundId: Scalars['Int'];
};

/** All input for the `updateCompound` mutation. */
export type UpdateCompoundInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Compound` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Compound` being updated. */
  compoundPatch: CompoundPatch;
};

/** The output of our update `Compound` mutation. */
export type UpdateCompoundPayload = {
  __typename?: 'UpdateCompoundPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Compound` that was updated by this mutation. */
  compound?: Maybe<Compound>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Compound`. May be used by Relay 1. */
  compoundEdge?: Maybe<CompoundsEdge>;
};


/** The output of our update `Compound` mutation. */
export type UpdateCompoundPayloadCompoundEdgeArgs = {
  orderBy?: Maybe<Array<CompoundsOrderBy>>;
};
