BEGIN;

CREATE TABLE IF NOT EXISTS compounds (
    compound_id SERIAL PRIMARY KEY,
    smiles TEXT NOT NULL,
    molecular_weight DECIMAL,
    ALogP DECIMAL,
    molecular_formula TEXT,
    num_rings DECIMAL,
    img TEXT
);

COMMENT ON TABLE compounds IS 'A small data set of compounds and assay results extracted from ChEMBL';
COMMENT ON COLUMN compounds.compound_id IS 'Unique identifier for a compound, this is the primary key.';
COMMENT ON COLUMN compounds.smiles is 'String representation of the compound https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system.';
COMMENT ON COLUMN compounds.molecular_weight is 'The weight of the compound, could be plotted on the X axis.';
COMMENT ON COLUMN compounds.ALogP is 'Indicates if the compound will dissolve in water or not, could be plotted on the Y axis.';
COMMENT ON COLUMN compounds.molecular_formula is 'A short string representation of the compound.';
COMMENT ON COLUMN compounds.num_rings is 'A count of the rings in the compound, could be used to color a plot. https://en.wikipedia.org/wiki/Ring_(chemistry)';
COMMENT ON COLUMN compounds.img is 'Compounds are visualised as 2D graphs, path to a pre-calculated png image of the compound.';

CREATE TYPE result as ENUM ('IC50', 'Ki', 'Kd');
CREATE TYPE operator as ENUM ('=', '>', '<', '<=', '>=', '~', '*');

CREATE TABLE IF NOT EXISTS assay_results (
    result_id SERIAL PRIMARY KEY,
    bio_target TEXT,
    result result,
    operator operator,
    val TEXT,
    unit TEXT,
    compound_id INTEGER REFERENCES compounds(compound_id)
);

COMMENT ON TABLE assay_results IS 'The assay results for the compound (could be shown as Kd = 19uM) https://en.wikipedia.org/wiki/Assay.';
COMMENT ON COLUMN assay_results.result_id IS 'Unique identifier for an assay_result.';
COMMENT ON COLUMN assay_results.bio_target is 'The long name of the biological target used in the assay.';
COMMENT ON COLUMN assay_results.result is 'The result type of the assay.';
COMMENT ON COLUMN assay_results.operator is 'The value operator.';
COMMENT ON COLUMN assay_results.val is 'The result value.';
COMMENT ON COLUMN assay_results.unit is 'The result unit.';
COMMENT ON COLUMN assay_results.compound_id is 'The compound this assay was run against.';


COMMIT;