const mongoose = require("mongoose");

const dropdownOptionSchema = new mongoose.Schema(
    {
        // Unique key identifying which dropdown this option belongs to
        // e.g. "GST Per_gstPer", "Currency_currency", "Vehicle Type_vehicleType"
        dropdownKey: {
            type: String,
            required: true,
            index: true,
        },
        // The list of custom options added by the user
        added: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
        // Original option values that were deleted
        removed: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
        // Map of original value → new value for edited options
        edits: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
        strict: false,
    }
);

// Compound unique index on dropdownKey
dropdownOptionSchema.index({ dropdownKey: 1 }, { unique: true });

module.exports = mongoose.model("DropdownOption", dropdownOptionSchema);
