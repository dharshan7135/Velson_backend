const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { connectDB, pool } = require("./config/db");
const { createEntityRoutes } = require("./routes/entityRoutes");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { seedDatabase } = require("./seeds/seedData");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// ── Health Check ──────────────────────────────────────────────
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 VELSON Industries API is running",
        location: "Salem, Tamil Nadu",
        version: "1.0.0",
        database: "PostgreSQL (Docker)",
        entities: [
            "companies", "employees", "contractors", "suppliers", "customers",
            "machines", "processes", "vehicles", "groupMaster", "accounts",
            "itemGroups", "items", "characteristics", "serviceJobs",
            "referenceGroups", "referenceGroupValues", "references", "taxes",
            "ledgerMasters", "taxMasters", "users", "roles", "menus",
            "qcCheckMethods", "qcInspectionChars", "systemInfo",
        ],
        usage: "GET/POST /api/{entity}  |  GET/PUT/DELETE /api/{entity}/:id",
        products: "Full CRUD at /api/products with filtering, sorting, pagination",
    });
});

// ── API Routes ────────────────────────────────────────────────
// Generic CRUD for all 15 entities (matches frontend AppContext.jsx)
app.use("/api", createEntityRoutes());

// Advanced product routes (filtering, stats, bulk)
app.use("/api/products", productRoutes);

// ── Dropdown Options Persistence ──────────────────────────────

// GET all dropdown option overrides
app.get("/api/dropdownOptions", async (req, res, next) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM dropdown_options`);
        // Return as a map: { dropdownKey: { added, removed, edits } }
        const map = {};
        rows.forEach((row) => {
            map[row.dropdown_key] = {
                added: row.added || [],
                removed: row.removed || [],
                edits: row.edits || {},
            };
        });
        res.status(200).json(map);
    } catch (error) {
        next(error);
    }
});

// PUT upsert a single dropdown key's state
app.put("/api/dropdownOptions/:key", async (req, res, next) => {
    try {
        const { added, removed, edits } = req.body;
        const { rows } = await pool.query(
            `INSERT INTO dropdown_options (dropdown_key, added, removed, edits)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (dropdown_key)
             DO UPDATE SET added = $2, removed = $3, edits = $4, updated_at = NOW()
             RETURNING *`,
            [
                req.params.key,
                JSON.stringify(added || []),
                JSON.stringify(removed || []),
                JSON.stringify(edits || {}),
            ]
        );
        // Transform response to match old Mongoose shape
        const row = rows[0];
        res.status(200).json({
            _id: String(row.id),
            id: String(row.id),
            dropdownKey: row.dropdown_key,
            added: row.added,
            removed: row.removed,
            edits: row.edits,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        });
    } catch (error) {
        next(error);
    }
});

// ── Error Handling ────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────
const startServer = async () => {
    try {
        // Connect to PostgreSQL & create tables
        await connectDB();

        // Seed demo data if tables are empty
        await seedDatabase();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📋 API Docs: http://localhost:${PORT}/`);
            console.log(`🔧 Environment: ${process.env.NODE_ENV || "production"}\n`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
