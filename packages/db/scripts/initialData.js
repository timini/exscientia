const PROJECT_ROOT = `${__dirname}/../../../`;
require("dotenv").config({ path: `${PROJECT_ROOT}/.env` });
const { Client } = require("pg");
const { readFile } = require("fs/promises");

const loadDataFromFile = async () => {
  data = await readFile(`${PROJECT_ROOT}/instructions/compounds.json`, "utf8");
  return JSON.parse(data.trim());
};

const loadCompounds = async (compounds) => {
  const client = new Client();
  await client.connect();

  for (const compound of compounds) {
    const {
      compound_id,
      smiles,
      molecular_weight,
      ALogP,
      molecular_formula,
      num_rings,
      image,
      assay_results = [],
    } = compound;

    try {
      const res = await client.query(
        `INSERT INTO compounds
        (compound_id, smiles, molecular_weight, ALogP, molecular_formula, num_rings, img)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
        RETURNING *;`,
        [
          compound_id,
          smiles,
          molecular_weight,
          ALogP,
          molecular_formula,
          num_rings,
          image,
        ]
      );
      console.log(`inserted compound with ID=${compound_id}`);
    } catch (err) {
      console.log(err.stack);
    }
    for (const assay_result of assay_results) {
      const { result_id, target, result, operator, value, unit } = assay_result;
      try {
        const res = await client.query(
          `INSERT INTO assay_results 
          (result_id, bio_target, result, operator, val, unit, compound_id)
          VALUES 
          ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT DO NOTHING
          RETURNING *;`,
          [result_id, target, result, operator, value, unit, compound_id]
        );
        console.log(`inserted assay_result with ID=${result_id}`);
      } catch (err) {
        console.log(err.stack);
      }
    }
  }
  await client.end();
};

loadDataFromFile()
  .then(loadCompounds)
  .then(() => console.log("complete"));
