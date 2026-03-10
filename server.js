const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
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
        message: "🚀 Sri Amman Steels & Hardwares API is running",
        version: "1.0.0",
        entities: [
            "companies", "employees", "contractors", "suppliers", "machines",
            "processes", "groupMaster", "accounts", "itemGroups", "items",
            "characteristics", "serviceJobs", "referenceGroups", "references", "taxes",
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

// ── Error Handling ────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────
const startServer = async () => {
    try {
        // Connect to MongoDB Atlas
        await connectDB();

        // Seed demo data if collections are empty
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
