const Product = require("../models/Product");

/**
 * @desc    Get all products (with filtering, sorting, pagination)
 * @route   GET /api/products
 * @access  Public
 */
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

        // Build filter object
        const filter = {};

        if (category) filter.category = category;
        if (brand) filter.brand = { $regex: brand, $options: "i" };
        if (isActive !== undefined) filter.isActive = isActive === "true";

        // Price range filter
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Text search
        if (search) {
            filter.$text = { $search: search };
        }

        // Low stock filter
        if (lowStock === "true") {
            filter.$expr = { $lte: ["$stock", "$lowStockThreshold"] };
        }

        // Pagination
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
        const skip = (pageNum - 1) * limitNum;

        // Execute query
        const [products, total] = await Promise.all([
            Product.find(filter).sort(sort).skip(skip).limit(limitNum).lean(),
            Product.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single product by slug
 * @route   GET /api/products/slug/:slug
 * @access  Public
 */
const getProductBySlug = async (req, res, next) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public
 */
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Public
 */
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        // Update fields
        Object.keys(req.body).forEach((key) => {
            product[key] = req.body[key];
        });

        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Public
 */
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: { id: req.params.id },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Bulk delete products
 * @route   DELETE /api/products/bulk/delete
 * @access  Public
 */
const bulkDeleteProducts = async (req, res, next) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            res.status(400);
            throw new Error("Please provide an array of product IDs to delete");
        }

        const result = await Product.deleteMany({ _id: { $in: ids } });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} product(s) deleted successfully`,
            data: { deletedCount: result.deletedCount },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get product statistics
 * @route   GET /api/products/stats/overview
 * @access  Public
 */
const getProductStats = async (req, res, next) => {
    try {
        const [stats] = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    totalStock: { $sum: "$stock" },
                    averagePrice: { $avg: "$price" },
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" },
                    totalValue: { $sum: { $multiply: ["$price", "$stock"] } },
                },
            },
        ]);

        const categoryBreakdown = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                    totalStock: { $sum: "$stock" },
                    avgPrice: { $avg: "$price" },
                },
            },
            { $sort: { count: -1 } },
        ]);

        const lowStockProducts = await Product.find({
            $expr: { $lte: ["$stock", "$lowStockThreshold"] },
            isActive: true,
        })
            .select("name sku stock lowStockThreshold category")
            .lean();

        res.status(200).json({
            success: true,
            data: {
                overview: stats || {
                    totalProducts: 0,
                    totalStock: 0,
                    averagePrice: 0,
                    minPrice: 0,
                    maxPrice: 0,
                    totalValue: 0,
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
