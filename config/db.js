const { Pool } = require("pg");

// ── PostgreSQL connection pool ───────────────────────────────
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
});

/**
 * Entity tables use a JSONB column (`data`) to store dynamic fields,
 * replicating Mongoose's `strict: false` behaviour. Every table has:
 *   id          SERIAL PRIMARY KEY
 *   data        JSONB  NOT NULL DEFAULT '{}'
 *   created_at  TIMESTAMPTZ
 *   updated_at  TIMESTAMPTZ
 *
 * The dropdown_options table has a fixed schema for its specific fields.
 */
const ENTITY_TABLES = [
    // ── Core masters (original 15) ───────────────────────────
    "companies",
    "employees",
    "contractors",
    "suppliers",
    "customers",
    "machines",
    "processes",
    "vehicles",
    "group_master",
    "accounts",
    "item_groups",
    "items",
    "characteristics",
    "service_jobs",
    "reference_groups",
    "reference_group_values",
    "references",
    "taxes",
    "products",

    // ── Config / Admin ───────────────────────────────────────
    "ledger_masters",
    "tax_masters",
    "users",
    "roles",
    "menus",
    "qc_check_methods",
    "qc_inspection_chars",
    "system_info",

    // ── Sales ────────────────────────────────────────────────
    "quotations",
    "quotation_details",
    "quotation_file_uploads",
    "quotation_masters",
    "quotation_trans",
    "quotation_sales_masters",
    "quotation_sales_trans",
    "quote_requests",
    "quote_request_details",
    "sales_masters",
    "sales_trans",
    "sales_plans",
    "bills_out",
    "dc_sales_masters",
    "dc_sales_trans",
    "conformation_masters",
    "conformation_details",
    "conformation_final_masters",
    "conformation_final_details",

    // ── Purchase ─────────────────────────────────────────────
    "purchase_requests",
    "purchase_orders",
    "purchase_orders2",
    "purchase_order_details",
    "purchase_order_details2",
    "purchase_freight",
    "purchase_price_link",
    "po_masters",
    "po_orders",
    "po_order_details",
    "gate_entries",
    "gate_entry_details",
    "grn_entries",
    "grn_entry_details",
    "grn_entry_details_track",
    "grn_entry_track",
    "grn_freight_details",
    "grn_return_details",

    // ── Inventory ────────────────────────────────────────────
    "material_requests",
    "material_requests1",
    "material_inward",
    "material_issue",
    "material_issue1",
    "stock_inward",
    "stock_outward",
    "stock_outward_correction",
    "stock_outward_correction_del",
    "stock_liability1",
    "stock_liability3",
    "stock_liability_track",
    "index_masters",
    "index_creation",
    "index_creation_track",
    "main_index_masters",
    "main_index_details",
    "ccms_entries",

    // ── Production ───────────────────────────────────────────
    "job_entries",
    "job_entry_details",
    "job_entry_details_update",
    "job_entry_details_audit",
    "job_file_uploads",
    "job_spare_entries",
    "approved_details",
    "process_card_main",
    "process_card_details",
    "process_card_tracking",
    "jobcard_rm_issue_master",
    "jobcard_rm_issue_details",
    "breakdown_entries",

    // ── Delivery ─────────────────────────────────────────────
    "delivery_challans",
    "delivery_challan_details",
    "dc_mains",
    "dc_details",
    "nc_dc_mains",
    "nc_dc_details",

    // ── Service ──────────────────────────────────────────────
    "booking_masters",
    "booking_service_details",
    "booking_service_spare_lists",
    "service_orders",
    "service_order_details",
    "service_requests",
    "service_trans",
    "part_spare_lists",
    "service_bill_masters",
    "service_bill_trans",
    "service_bill_labour_charges",
    "temp_service_bill_masters",
    "temp_service_bill_trans",
    "temp_service_bill_labour_charges",

    // ── Quality ──────────────────────────────────────────────
    "qc_entries",
    "qc_entry_details",
    "grn_qc_details",
    "nc_details",
    "prn_files",
    "fastener_list_links",
    "part_file_drawings",

    // ── Drawing ──────────────────────────────────────────────
    "drawing_masters",
    "drawing_details",
    "drawing_revision_details",

    // ── Automation ───────────────────────────────────────────
    "auto_po_details",
    "auto_po_details_track",
    "general_file_uploads",
    "current_edit_details",
    "error_logs",
    "backup_entries",
    "backup_tbl",
    "temp_entries",
    "test_entries",
    "test66_entries",
    "table1_entries",

    // ── Finance ──────────────────────────────────────────────
    "voucher_mast1",
    "voucher_entry1",
    "adjustment1",
    "account_tran1",
    "day_book1",
    "day_total1",
    "payment_master1",
    "auto_voucher_payment_adj1",
    "auto_voucher_payment_cash1",
    "receipt_master1",
    "receipt_trans1",
    "auto_voucher_receipt_adj1",
    "auto_voucher_receipt_cash1",
];

/**
 * Initialise the database: create tables if they don't exist.
 */
const connectDB = async () => {
    try {
        // Test connection
        const client = await pool.connect();
        console.log(`✅ PostgreSQL Connected: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
        console.log(`📦 Database: ${process.env.DB_DATABASE}`);
        client.release();

        // Create entity tables
        for (const table of ENTITY_TABLES) {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS "${table}" (
                    id          SERIAL PRIMARY KEY,
                    data        JSONB  NOT NULL DEFAULT '{}',
                    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );
            `);
        }

        // Create dropdown_options table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS dropdown_options (
                id            SERIAL PRIMARY KEY,
                dropdown_key  TEXT UNIQUE NOT NULL,
                added         JSONB NOT NULL DEFAULT '[]',
                removed       JSONB NOT NULL DEFAULT '[]',
                edits         JSONB NOT NULL DEFAULT '{}',
                created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        console.log("✅ All tables verified / created.");
        return pool;
    } catch (error) {
        console.error(`❌ PostgreSQL Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { connectDB, pool };
