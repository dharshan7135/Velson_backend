/**
 * Generic CRUD Controller Factory — PostgreSQL / JSONB edition
 *
 * Each entity table has:
 *   id          SERIAL PRIMARY KEY
 *   data        JSONB  (holds all dynamic fields)
 *   created_at  TIMESTAMPTZ
 *   updated_at  TIMESTAMPTZ
 *
 * Options:
 *   uniqueField - JSONB key to check for duplicates (e.g. "companyCode")
 *   sortField   - JSONB key to sort by ascending   (e.g. "companyCode")
 */
const { pool } = require("../config/db");

// ── Helpers ──────────────────────────────────────────────────

/** Flatten a row from {id, data, created_at, updated_at} into a single object */
const flattenRow = (row) => ({
    ...row.data,
    id: String(row.id),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});

const createCrudController = (tableName, modelName, options = {}) => {
    const { uniqueField, sortField } = options;

    return {
        // ── GET all ──────────────────────────────────────────
        getAll: async (req, res, next) => {
            try {
                const orderClause = sortField
                    ? `ORDER BY data->>'${sortField}' ASC`
                    : `ORDER BY created_at ASC`;

                const { rows } = await pool.query(
                    `SELECT * FROM "${tableName}" ${orderClause}`
                );

                res.status(200).json(rows.map(flattenRow));
            } catch (error) {
                next(error);
            }
        },

        // ── GET by ID ────────────────────────────────────────
        getById: async (req, res, next) => {
            try {
                const { rows } = await pool.query(
                    `SELECT * FROM "${tableName}" WHERE id = $1`,
                    [req.params.id]
                );

                if (rows.length === 0) {
                    res.status(404);
                    throw new Error(`${modelName} not found`);
                }

                res.status(200).json(flattenRow(rows[0]));
            } catch (error) {
                next(error);
            }
        },

        // ── POST create ──────────────────────────────────────
        create: async (req, res, next) => {
            try {
                // Duplicate check
                if (uniqueField && req.body[uniqueField]) {
                    const { rows: dup } = await pool.query(
                        `SELECT id FROM "${tableName}" WHERE data->>$1 = $2 LIMIT 1`,
                        [uniqueField, req.body[uniqueField]]
                    );
                    if (dup.length > 0) {
                        return res.status(400).json({
                            success: false,
                            message: `${modelName} with ${uniqueField} "${req.body[uniqueField]}" already exists. Please use a different code.`,
                        });
                    }
                }

                const { rows } = await pool.query(
                    `INSERT INTO "${tableName}" (data) VALUES ($1) RETURNING *`,
                    [JSON.stringify(req.body)]
                );

                res.status(201).json(flattenRow(rows[0]));
            } catch (error) {
                next(error);
            }
        },

        // ── PUT update ───────────────────────────────────────
        update: async (req, res, next) => {
            try {
                // Duplicate check (exclude current record)
                if (uniqueField && req.body[uniqueField]) {
                    const { rows: dup } = await pool.query(
                        `SELECT id FROM "${tableName}" WHERE data->>$1 = $2 AND id != $3 LIMIT 1`,
                        [uniqueField, req.body[uniqueField], req.params.id]
                    );
                    if (dup.length > 0) {
                        return res.status(400).json({
                            success: false,
                            message: `Another ${modelName} with ${uniqueField} "${req.body[uniqueField]}" already exists. Please use a different code.`,
                        });
                    }
                }

                // Merge new fields into existing data (like Mongoose update)
                const { rows: existing } = await pool.query(
                    `SELECT data FROM "${tableName}" WHERE id = $1`,
                    [req.params.id]
                );

                if (existing.length === 0) {
                    res.status(404);
                    throw new Error(`${modelName} not found`);
                }

                const mergedData = { ...existing[0].data, ...req.body };

                const { rows } = await pool.query(
                    `UPDATE "${tableName}" SET data = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
                    [JSON.stringify(mergedData), req.params.id]
                );

                res.status(200).json(flattenRow(rows[0]));
            } catch (error) {
                next(error);
            }
        },

        // ── DELETE ────────────────────────────────────────────
        remove: async (req, res, next) => {
            try {
                const { rows } = await pool.query(
                    `DELETE FROM "${tableName}" WHERE id = $1 RETURNING id`,
                    [req.params.id]
                );

                if (rows.length === 0) {
                    res.status(404);
                    throw new Error(`${modelName} not found`);
                }

                res.status(200).json({
                    message: `${modelName} deleted successfully`,
                    id: req.params.id,
                });
            } catch (error) {
                next(error);
            }
        },
    };
};

module.exports = createCrudController;
