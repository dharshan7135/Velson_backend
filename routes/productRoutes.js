const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    getProductStats,
} = require("../controllers/productController");

// Statistics (must be before /:id to avoid conflict)
router.get("/stats/overview", getProductStats);

// Bulk operations
router.delete("/bulk/delete", bulkDeleteProducts);

// Slug-based lookup
router.get("/slug/:slug", getProductBySlug);

// Standard CRUD
router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
