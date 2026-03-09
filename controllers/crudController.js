/**
 * Generic CRUD Controller Factory
 * Creates standard CRUD operations for any Mongoose model.
 *
 * Options:
 *   uniqueField - field name to check for duplicates on create/update (e.g. "companyCode")
 *   sortField   - field name to sort by ascending (e.g. "companyCode")
 */

// Helper: transform document to include `id` field for frontend compatibility
const transformDoc = (doc) => {
    const obj = doc.toJSON ? doc.toJSON() : { ...doc };
    obj.id = obj._id?.toString() || obj.id;
    return obj;
};

const createCrudController = (Model, modelName, options = {}) => {
    const { uniqueField, sortField } = options;

    return {
        // GET all records — sorted ascending by sortField
        getAll: async (req, res, next) => {
            try {
                const sortBy = sortField ? { [sortField]: 1 } : { createdAt: 1 };
                const records = await Model.find().sort(sortBy).lean();
                // Add `id` field mapped from `_id` for frontend compatibility
                const transformed = records.map((r) => ({
                    ...r,
                    id: r._id.toString(),
                }));
                res.status(200).json(transformed);
            } catch (error) {
                next(error);
            }
        },

        // GET single record by ID
        getById: async (req, res, next) => {
            try {
                const record = await Model.findById(req.params.id);
                if (!record) {
                    res.status(404);
                    throw new Error(`${modelName} not found`);
                }
                res.status(200).json(transformDoc(record));
            } catch (error) {
                next(error);
            }
        },

        // POST create new record — with duplicate check
        create: async (req, res, next) => {
            try {
                // Duplicate check: if uniqueField is defined and a value is provided
                if (uniqueField && req.body[uniqueField]) {
                    const existing = await Model.findOne({
                        [uniqueField]: req.body[uniqueField],
                    });
                    if (existing) {
                        return res.status(400).json({
                            success: false,
                            message: `${modelName} with ${uniqueField} "${req.body[uniqueField]}" already exists. Please use a different code.`,
                        });
                    }
                }

                const record = await Model.create(req.body);
                res.status(201).json(transformDoc(record));
            } catch (error) {
                next(error);
            }
        },

        // PUT update record — with duplicate check (exclude current record)
        update: async (req, res, next) => {
            try {
                // Duplicate check on update: ensure no OTHER record has the same code
                if (uniqueField && req.body[uniqueField]) {
                    const existing = await Model.findOne({
                        [uniqueField]: req.body[uniqueField],
                        _id: { $ne: req.params.id },
                    });
                    if (existing) {
                        return res.status(400).json({
                            success: false,
                            message: `Another ${modelName} with ${uniqueField} "${req.body[uniqueField]}" already exists. Please use a different code.`,
                        });
                    }
                }

                const record = await Model.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true, runValidators: true }
                );
                if (!record) {
                    res.status(404);
                    throw new Error(`${modelName} not found`);
                }
                res.status(200).json(transformDoc(record));
            } catch (error) {
                next(error);
            }
        },

        // DELETE record
        remove: async (req, res, next) => {
            try {
                const record = await Model.findByIdAndDelete(req.params.id);
                if (!record) {
                    res.status(404);
                    throw new Error(`${modelName} not found`);
                }
                res.status(200).json({ message: `${modelName} deleted successfully`, id: req.params.id });
            } catch (error) {
                next(error);
            }
        },
    };
};

module.exports = createCrudController;
