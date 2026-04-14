/**
 * Product Controller — PostgreSQL / JSONB edition
 *
 * Products live in the "products" table with a JSONB `data` column.
 * All filtering, sorting, pagination, aggregation are done via SQL.
 */
const { pool } = require("../config/db");

const TABLE = "products";

/** Flatten a DB row into a single flat object (same shape as Mongoose doc) */
const flattenRow = (row) => ({
    ...row.data,
    id: String(row.id),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});

// ────────────────────────────────────────────────────────────
// GET /api/products  — filtering, sorting, pagination
// ────────────────────────────────────────────────────────────
const getProducts = async (req, res, next) => {
    try {
        const {
            category,
            brand,
            minPrice,
            maxPrice,
            search,
            isActive,
            lowStock,
            sort = "-createdAt",
            page = 1,
            limit = 20,
        } = req.query;

        const conditions = [];
        const params = [];
        let paramIdx = 1;

        if (category) {
            conditions.push(`data->>'category' = $${paramIdx++}`);
            params.push(category);
        }
        if (brand) {
            conditions.push(`data->>'brand' ILIKE $${paramIdx++}`);
            params.push(`%${brand}%`);
        }
        if (isActive !== undefined) {
            conditions.push(`(data->>'isActive')::boolean = $${paramIdx++}`);
            params.push(isActive === "true");
        }
        if (minPrice) {
            conditions.push(`(data->>'price')::numeric >= $${paramIdx++}`);
            params.push(Number(minPrice));
        }
        if (maxPrice) {
            conditions.push(`(data->>'price')::numeric <= $${paramIdx++}`);
            params.push(Number(maxPrice));
        }
        if (search) {
            conditions.push(`(data->>'name' ILIKE $${paramIdx} OR data->>'description' ILIKE $${paramIdx})`);
            params.push(`%${search}%`);
            paramIdx++;
        }
        if (lowStock === "true") {
            conditions.push(`(data->>'stock')::numeric <= (data->>'lowStockThreshold')::numeric`);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

        // Sort
        let orderClause = "ORDER BY created_at DESC";
        if (sort) {
            const desc = sort.startsWith("-");
            const field = desc ? sort.slice(1) : sort;
            if (field === "createdAt") {
                orderClause = `ORDER BY created_at ${desc ? "DESC" : "ASC"}`;
            } else {
                orderClause = `ORDER BY data->>'${field}' ${desc ? "DESC" : "ASC"}`;
            }
        }

        // Pagination
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
        const offset = (pageNum - 1) * limitNum;

        const [dataResult, countResult] = await Promise.all([
            pool.query(
                `SELECT * FROM "${TABLE}" ${whereClause} ${orderClause} LIMIT ${limitNum} OFFSET ${offset}`,
                params
            ),
            pool.query(
                `SELECT COUNT(*) AS total FROM "${TABLE}" ${whereClause}`,
                params
            ),
        ]);

        const total = parseInt(countResult.rows[0].total, 10);

        res.status(200).json({
            success: true,
            count: dataResult.rows.length,
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            data: dataResult.rows.map(flattenRow),
        });
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────
// GET /api/products/:id
// ────────────────────────────────────────────────────────────
const getProductById = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM "${TABLE}" WHERE id = $1`,
            [req.params.id]
        );

        if (rows.length === 0) {
            res.status(404);
            throw new Error("Product not found");
        }

        res.status(200).json({ success: true, data: flattenRow(rows[0]) });
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────
// GET /api/products/slug/:slug
// ────────────────────────────────────────────────────────────
const getProductBySlug = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM "${TABLE}" WHERE data->>'slug' = $1`,
            [req.params.slug]
        );

        if (rows.length === 0) {
            res.status(404);
            throw new Error("Product not found");
        }

        res.status(200).json({ success: true, data: flattenRow(rows[0]) });
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────
// POST /api/products
// ────────────────────────────────────────────────────────────
const createProduct = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO "${TABLE}" (data) VALUES ($1) RETURNING *`,
            [JSON.stringify(req.body)]
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: flattenRow(rows[0]),
        });
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────
// PUT /api/products/:id
// ────────────────────────────────────────────────────────────
const updateProduct = async (req, res, next) => {
    try {
        const { rows: existing } = await pool.query(
            `SELECT * FROM "${TABLE}" WHERE id = $1`,
            [req.params.id]
        );

        if (existing.length === 0) {
            res.status(404);
            throw new Error("Product not found");
        }

        const mergedData = { ...existing[0].data, ...req.body };

        const { rows } = await pool.query(
            `UPDATE "${TABLE}" SET data = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
            [JSON.stringify(mergedData), req.params.id]
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: flattenRow(rows[0]),
        });
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────
// DELETE /api/products/:id
// ────────────────────────────────────────────────────────────
const deleteProduct = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            `DELETE FROM "${TABLE}" WHERE id = $1 RETURNING id`,
            [req.params.id]
        );

        if (rows.length === 0) {
            res.status(404);
            throw new Error("Product not found");
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: { id: req.params.id },
        });
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────
// DELETE /api/products/bulk/delete
// ────────────────────────────────────────────────────────────
const bulkDeleteProducts = async (req, res, next) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            res.status(400);
            throw new Error("Please provide an array of product IDs to delete");
        }

        // Build parameterised IN clause
        const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
        const result = await pool.query(
            `DELETE FROM "${TABLE}" WHERE id IN (${placeholders})`,
            ids
        );

        res.status(200).json({
            success: true,
            message: `${result.rowCount} product(s) deleted successfully`,
            data: { deletedCount: result.rowCount },
        });
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────
// GET /api/products/stats/overview
// ────────────────────────────────────────────────────────────
const getProductStats = async (req, res, next) => {
    try {
        // Overview aggregation
        const { rows: overviewRows } = await pool.query(`
            SELECT
                COUNT(*)::int                                            AS "totalProducts",
                COALESCE(SUM((data->>'stock')::numeric), 0)              AS "totalStock",
                COALESCE(AVG((data->>'price')::numeric), 0)              AS "averagePrice",
                COALESCE(MIN((data->>'price')::numeric), 0)              AS "minPrice",
                COALESCE(MAX((data->>'price')::numeric), 0)              AS "maxPrice",
                COALESCE(SUM((data->>'price')::numeric * (data->>'stock')::numeric), 0) AS "totalValue"
            FROM "${TABLE}"
        `);

        // Category breakdown
        const { rows: categoryBreakdown } = await pool.query(`
            SELECT
                data->>'category'                                AS "_id",
                COUNT(*)::int                                    AS count,
                COALESCE(SUM((data->>'stock')::numeric), 0)      AS "totalStock",
                COALESCE(AVG((data->>'price')::numeric), 0)      AS "avgPrice"
            FROM "${TABLE}"
            GROUP BY data->>'category'
            ORDER BY count DESC
        `);

        // Low stock
        const { rows: lowStockProducts } = await pool.query(`
            SELECT id, data->>'name' AS name, data->>'sku' AS sku,
                   data->>'stock' AS stock, data->>'lowStockThreshold' AS "lowStockThreshold",
                   data->>'category' AS category
            FROM "${TABLE}"
            WHERE (data->>'stock')::numeric <= (data->>'lowStockThreshold')::numeric
              AND (data->>'isActive')::boolean = true
        `);

        res.status(200).json({
            success: true,
            data: {
                overview: overviewRows[0] || {
                    totalProducts: 0, totalStock: 0, averagePrice: 0,
                    minPrice: 0, maxPrice: 0, totalValue: 0,
                },
                categoryBreakdown,
                lowStockProducts,
                lowStockCount: lowStockProducts.length,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    getProductStats,
};
