const express = require("express");
const createCrudController = require("../controllers/crudController");
const { pool } = require("../config/db");

/**
 * Route-to-Table mapping
 * Key   = URL path segment (matches frontend AppContext.jsx entities)
 * Value = { table (PG table name), name, uniqueField, sortField }
 *
 * For the original 15 core entities we keep uniqueField / sortField.
 * All new entities use null for both (generic JSONB store).
 */
const entityMap = {
    // ── Core masters ─────────────────────────────────────────
    companies:                      { table: "companies",                        name: "Company",                       uniqueField: "companyCode",     sortField: "companyCode" },
    employees:                      { table: "employees",                         name: "Employee",                      uniqueField: "employeeCode",    sortField: "employeeCode" },
    contractors:                    { table: "contractors",                        name: "Contractor",                    uniqueField: "contractorCode",  sortField: "contractorCode" },
    suppliers:                      { table: "suppliers",                          name: "Supplier",                      uniqueField: "supplierCode",    sortField: "supplierCode" },
    machines:                       { table: "machines",                           name: "Machine",                       uniqueField: "machineCode",     sortField: "machineCode" },
    processes:                      { table: "processes",                          name: "Process",                       uniqueField: null,              sortField: "processOrder" },
    groupMaster:                    { table: "group_master",                       name: "GroupMaster",                   uniqueField: "group",           sortField: "group" },
    accounts:                       { table: "accounts",                           name: "Account",                       uniqueField: "acCode",          sortField: "acCode" },
    itemGroups:                     { table: "item_groups",                        name: "ItemGroup",                     uniqueField: "group",           sortField: "group" },
    items:                          { table: "items",                              name: "Item",                          uniqueField: "partNo",          sortField: "partNo" },
    characteristics:                { table: "characteristics",                    name: "Characteristic",                uniqueField: "characteristics", sortField: "characteristics" },
    serviceJobs:                    { table: "service_jobs",                       name: "ServiceJob",                    uniqueField: null,              sortField: "jobName" },
    referenceGroups:                { table: "reference_groups",                   name: "ReferenceGroup",                uniqueField: "groupName",       sortField: "groupName" },
    references:                     { table: "references",                         name: "Reference",                     uniqueField: null,              sortField: "referenceType" },
    taxes:                          { table: "taxes",                              name: "Tax",                           uniqueField: "taxLedgerAc",     sortField: "taxLedgerAc" },

    // ── Sales ────────────────────────────────────────────────
    quotations:                     { table: "quotations",                         name: "Quotation",                     uniqueField: null, sortField: null },
    quotationDetails:               { table: "quotation_details",                  name: "QuotationDetail",               uniqueField: null, sortField: null },
    quotationFileUploads:           { table: "quotation_file_uploads",             name: "QuotationFileUpload",           uniqueField: null, sortField: null },
    quotationMasters:               { table: "quotation_masters",                  name: "QuotationMaster",               uniqueField: null, sortField: null },
    quotationTrans:                 { table: "quotation_trans",                    name: "QuotationTran",                 uniqueField: null, sortField: null },
    quotationSalesMasters:          { table: "quotation_sales_masters",            name: "QuotationSalesMaster",          uniqueField: null, sortField: null },
    quotationSalesTrans:            { table: "quotation_sales_trans",              name: "QuotationSalesTran",            uniqueField: null, sortField: null },
    quoteRequests:                  { table: "quote_requests",                     name: "QuoteRequest",                  uniqueField: null, sortField: null },
    quoteRequestDetails:            { table: "quote_request_details",              name: "QuoteRequestDetail",            uniqueField: null, sortField: null },
    salesMasters:                   { table: "sales_masters",                      name: "SalesMaster",                   uniqueField: null, sortField: null },
    salesTrans:                     { table: "sales_trans",                        name: "SalesTran",                     uniqueField: null, sortField: null },
    salesPlans:                     { table: "sales_plans",                        name: "SalesPlan",                     uniqueField: null, sortField: null },
    billsOut:                       { table: "bills_out",                          name: "BillOut",                       uniqueField: null, sortField: null },
    dcSalesMasters:                 { table: "dc_sales_masters",                   name: "DCSalesMaster",                 uniqueField: null, sortField: null },
    dcSalesTrans:                   { table: "dc_sales_trans",                     name: "DCSalesTran",                   uniqueField: null, sortField: null },
    conformationMasters:            { table: "conformation_masters",               name: "ConformationMaster",            uniqueField: null, sortField: null },
    conformationDetails:            { table: "conformation_details",               name: "ConformationDetail",            uniqueField: null, sortField: null },
    conformationFinalMasters:       { table: "conformation_final_masters",         name: "ConformationFinalMaster",       uniqueField: null, sortField: null },
    conformationFinalDetails:       { table: "conformation_final_details",         name: "ConformationFinalDetail",       uniqueField: null, sortField: null },

    // ── Purchase ─────────────────────────────────────────────
    purchaseRequests:               { table: "purchase_requests",                  name: "PurchaseRequest",               uniqueField: null, sortField: null },
    purchaseOrders:                 { table: "purchase_orders",                    name: "PurchaseOrder",                 uniqueField: null, sortField: null },
    purchaseOrders2:                { table: "purchase_orders2",                   name: "PurchaseOrder2",                uniqueField: null, sortField: null },
    purchaseOrderDetails:           { table: "purchase_order_details",             name: "PurchaseOrderDetail",           uniqueField: null, sortField: null },
    purchaseOrderDetails2:          { table: "purchase_order_details2",            name: "PurchaseOrderDetail2",          uniqueField: null, sortField: null },
    purchaseFreight:                { table: "purchase_freight",                   name: "PurchaseFreight",               uniqueField: null, sortField: null },
    purchasePriceLink:              { table: "purchase_price_link",                name: "PurchasePriceLink",             uniqueField: null, sortField: null },
    poMasters:                      { table: "po_masters",                         name: "POMaster",                      uniqueField: null, sortField: null },
    poOrders:                       { table: "po_orders",                          name: "POOrder",                       uniqueField: null, sortField: null },
    poOrderDetails:                 { table: "po_order_details",                   name: "POOrderDetail",                 uniqueField: null, sortField: null },
    gateEntries:                    { table: "gate_entries",                       name: "GateEntry",                     uniqueField: null, sortField: null },
    gateEntryDetails:               { table: "gate_entry_details",                 name: "GateEntryDetail",               uniqueField: null, sortField: null },
    grnEntries:                     { table: "grn_entries",                        name: "GRNEntry",                      uniqueField: null, sortField: null },
    grnEntryDetails:                { table: "grn_entry_details",                  name: "GRNEntryDetail",                uniqueField: null, sortField: null },
    grnEntryDetailsTrack:           { table: "grn_entry_details_track",            name: "GRNEntryDetailTrack",           uniqueField: null, sortField: null },
    grnEntryTrack:                  { table: "grn_entry_track",                    name: "GRNEntryTrack",                 uniqueField: null, sortField: null },
    grnFreightDetails:              { table: "grn_freight_details",                name: "GRNFreightDetail",              uniqueField: null, sortField: null },
    grnReturnDetails:               { table: "grn_return_details",                 name: "GRNReturnDetail",               uniqueField: null, sortField: null },

    // ── Inventory ────────────────────────────────────────────
    materialRequests:               { table: "material_requests",                  name: "MaterialRequest",               uniqueField: null, sortField: null },
    materialRequests1:              { table: "material_requests1",                 name: "MaterialRequest1",              uniqueField: null, sortField: null },
    materialInward:                 { table: "material_inward",                    name: "MaterialInward",                uniqueField: null, sortField: null },
    materialIssue:                  { table: "material_issue",                     name: "MaterialIssue",                 uniqueField: null, sortField: null },
    materialIssue1:                 { table: "material_issue1",                    name: "MaterialIssue1",                uniqueField: null, sortField: null },
    stockInward:                    { table: "stock_inward",                       name: "StockInward",                   uniqueField: null, sortField: null },
    stockOutward:                   { table: "stock_outward",                      name: "StockOutward",                  uniqueField: null, sortField: null },
    stockOutwardCorrection:         { table: "stock_outward_correction",           name: "StockOutwardCorrection",        uniqueField: null, sortField: null },
    stockOutwardCorrectionDel:      { table: "stock_outward_correction_del",       name: "StockOutwardCorrectionDel",     uniqueField: null, sortField: null },
    stockLiability1:                { table: "stock_liability1",                   name: "StockLiability1",               uniqueField: null, sortField: null },
    stockLiability3:                { table: "stock_liability3",                   name: "StockLiability3",               uniqueField: null, sortField: null },
    stockLiabilityTrack:            { table: "stock_liability_track",              name: "StockLiabilityTrack",           uniqueField: null, sortField: null },
    indexMasters:                   { table: "index_masters",                      name: "IndexMaster",                   uniqueField: null, sortField: null },
    indexCreation:                  { table: "index_creation",                     name: "IndexCreation",                 uniqueField: null, sortField: null },
    indexCreationTrack:             { table: "index_creation_track",               name: "IndexCreationTrack",            uniqueField: null, sortField: null },
    mainIndexMasters:               { table: "main_index_masters",                 name: "MainIndexMaster",               uniqueField: null, sortField: null },
    mainIndexDetails:               { table: "main_index_details",                 name: "MainIndexDetail",               uniqueField: null, sortField: null },
    ccmsEntries:                    { table: "ccms_entries",                       name: "CCMSEntry",                     uniqueField: null, sortField: null },

    // ── Production ───────────────────────────────────────────
    jobEntries:                     { table: "job_entries",                        name: "JobEntry",                      uniqueField: null, sortField: null },
    jobEntryDetails:                { table: "job_entry_details",                  name: "JobEntryDetail",                uniqueField: null, sortField: null },
    jobEntryDetailsUpdate:          { table: "job_entry_details_update",           name: "JobEntryDetailUpdate",          uniqueField: null, sortField: null },
    jobEntryDetailsAudit:           { table: "job_entry_details_audit",            name: "JobEntryDetailAudit",           uniqueField: null, sortField: null },
    jobFileUploads:                 { table: "job_file_uploads",                   name: "JobFileUpload",                 uniqueField: null, sortField: null },
    jobSpareEntries:                { table: "job_spare_entries",                  name: "JobSpareEntry",                 uniqueField: null, sortField: null },
    approvedDetails:                { table: "approved_details",                   name: "ApprovedDetail",                uniqueField: null, sortField: null },
    processCardMain:                { table: "process_card_main",                  name: "ProcessCardMain",               uniqueField: null, sortField: null },
    processCardDetails:             { table: "process_card_details",               name: "ProcessCardDetail",             uniqueField: null, sortField: null },
    processCardTracking:            { table: "process_card_tracking",              name: "ProcessCardTracking",           uniqueField: null, sortField: null },
    jobcardRMIssueMaster:           { table: "jobcard_rm_issue_master",            name: "JobcardRMIssueMaster",          uniqueField: null, sortField: null },
    jobcardRMIssueDetails:          { table: "jobcard_rm_issue_details",           name: "JobcardRMIssueDetail",          uniqueField: null, sortField: null },
    breakdownEntries:               { table: "breakdown_entries",                  name: "BreakdownEntry",                uniqueField: null, sortField: null },

    // ── Delivery ─────────────────────────────────────────────
    deliveryChallans:               { table: "delivery_challans",                  name: "DeliveryChallan",               uniqueField: null, sortField: null },
    deliveryChallanDetails:         { table: "delivery_challan_details",           name: "DeliveryChallanDetail",         uniqueField: null, sortField: null },
    dcMains:                        { table: "dc_mains",                           name: "DCMain",                        uniqueField: null, sortField: null },
    dcDetails:                      { table: "dc_details",                         name: "DCDetail",                      uniqueField: null, sortField: null },
    ncDCMains:                      { table: "nc_dc_mains",                        name: "NCDCMain",                      uniqueField: null, sortField: null },
    ncDCDetails:                    { table: "nc_dc_details",                      name: "NCDCDetail",                    uniqueField: null, sortField: null },

    // ── Service ──────────────────────────────────────────────
    bookingMasters:                 { table: "booking_masters",                    name: "BookingMaster",                 uniqueField: null, sortField: null },
    bookingServiceDetails:          { table: "booking_service_details",            name: "BookingServiceDetail",          uniqueField: null, sortField: null },
    bookingServiceSpareLists:       { table: "booking_service_spare_lists",        name: "BookingServiceSpareList",       uniqueField: null, sortField: null },
    serviceOrders:                  { table: "service_orders",                     name: "ServiceOrder",                  uniqueField: null, sortField: null },
    serviceOrderDetails:            { table: "service_order_details",              name: "ServiceOrderDetail",            uniqueField: null, sortField: null },
    serviceRequests:                { table: "service_requests",                   name: "ServiceRequest",                uniqueField: null, sortField: null },
    serviceTrans:                   { table: "service_trans",                      name: "ServiceTran",                   uniqueField: null, sortField: null },
    partSpareLists:                 { table: "part_spare_lists",                   name: "PartSpareList",                 uniqueField: null, sortField: null },
    serviceBillMasters:             { table: "service_bill_masters",               name: "ServiceBillMaster",             uniqueField: null, sortField: null },
    serviceBillTrans:               { table: "service_bill_trans",                 name: "ServiceBillTran",               uniqueField: null, sortField: null },
    serviceBillLabourCharges:       { table: "service_bill_labour_charges",        name: "ServiceBillLabourCharge",       uniqueField: null, sortField: null },
    tempServiceBillMasters:         { table: "temp_service_bill_masters",          name: "TempServiceBillMaster",         uniqueField: null, sortField: null },
    tempServiceBillTrans:           { table: "temp_service_bill_trans",            name: "TempServiceBillTran",           uniqueField: null, sortField: null },
    tempServiceBillLabourCharges:   { table: "temp_service_bill_labour_charges",   name: "TempServiceBillLabourCharge",   uniqueField: null, sortField: null },

    // ── Quality ──────────────────────────────────────────────
    qcEntries:                      { table: "qc_entries",                         name: "QCEntry",                       uniqueField: null, sortField: null },
    qcEntryDetails:                 { table: "qc_entry_details",                   name: "QCEntryDetail",                 uniqueField: null, sortField: null },
    grnQCDetails:                   { table: "grn_qc_details",                     name: "GRNQCDetail",                   uniqueField: null, sortField: null },
    ncDetails:                      { table: "nc_details",                         name: "NCDetail",                      uniqueField: null, sortField: null },
    prnFiles:                       { table: "prn_files",                          name: "PRNFile",                       uniqueField: null, sortField: null },
    fastenerListLinks:              { table: "fastener_list_links",                name: "FastenerListLink",              uniqueField: null, sortField: null },
    partFileDrawings:               { table: "part_file_drawings",                 name: "PartFileDrawing",               uniqueField: null, sortField: null },

    // ── Drawing ──────────────────────────────────────────────
    drawingMasters:                 { table: "drawing_masters",                    name: "DrawingMaster",                 uniqueField: null, sortField: null },
    drawingDetails:                 { table: "drawing_details",                    name: "DrawingDetail",                 uniqueField: null, sortField: null },
    drawingRevisionDetails:         { table: "drawing_revision_details",           name: "DrawingRevisionDetail",         uniqueField: null, sortField: null },

    // ── Automation ───────────────────────────────────────────
    autoPoDetails:                  { table: "auto_po_details",                    name: "AutoPoDetail",                  uniqueField: null, sortField: null },
    autoPoDetailsTrack:             { table: "auto_po_details_track",              name: "AutoPoDetailTrack",             uniqueField: null, sortField: null },
    generalFileUploads:             { table: "general_file_uploads",               name: "GeneralFileUpload",             uniqueField: null, sortField: null },
    currentEditDetails:             { table: "current_edit_details",               name: "CurrentEditDetail",             uniqueField: null, sortField: null },
    errorLogs:                      { table: "error_logs",                         name: "ErrorLog",                      uniqueField: null, sortField: null },
    backupEntries:                  { table: "backup_entries",                     name: "BackupEntry",                   uniqueField: null, sortField: null },
    backupTbl:                      { table: "backup_tbl",                         name: "BackupTbl",                     uniqueField: null, sortField: null },
    tempEntries:                    { table: "temp_entries",                       name: "TempEntry",                     uniqueField: null, sortField: null },
    testEntries:                    { table: "test_entries",                       name: "TestEntry",                     uniqueField: null, sortField: null },
    test66Entries:                  { table: "test66_entries",                     name: "Test66Entry",                   uniqueField: null, sortField: null },
    table1Entries:                  { table: "table1_entries",                     name: "Table1Entry",                   uniqueField: null, sortField: null },

    // ── Finance ──────────────────────────────────────────────
    voucherMast1:                   { table: "voucher_mast1",                      name: "VoucherMast1",                  uniqueField: null, sortField: null },
    voucherEntry1:                  { table: "voucher_entry1",                     name: "VoucherEntry1",                 uniqueField: null, sortField: null },
    adjustment1:                    { table: "adjustment1",                        name: "Adjustment1",                   uniqueField: null, sortField: null },
    accountTran1:                   { table: "account_tran1",                      name: "AccountTran1",                  uniqueField: null, sortField: null },
    dayBook1:                       { table: "day_book1",                          name: "DayBook1",                      uniqueField: null, sortField: null },
    dayTotal1:                      { table: "day_total1",                         name: "DayTotal1",                     uniqueField: null, sortField: null },
    paymentMaster1:                 { table: "payment_master1",                    name: "PaymentMaster1",                uniqueField: null, sortField: null },
    autoVoucherPaymentAdj1:         { table: "auto_voucher_payment_adj1",          name: "AutoVoucherPaymentAdj1",        uniqueField: null, sortField: null },
    autoVoucherPaymentCash1:        { table: "auto_voucher_payment_cash1",         name: "AutoVoucherPaymentCash1",       uniqueField: null, sortField: null },
    receiptMaster1:                 { table: "receipt_master1",                    name: "ReceiptMaster1",                uniqueField: null, sortField: null },
    receiptTrans1:                  { table: "receipt_trans1",                     name: "ReceiptTrans1",                 uniqueField: null, sortField: null },
    autoVoucherReceiptAdj1:         { table: "auto_voucher_receipt_adj1",          name: "AutoVoucherReceiptAdj1",        uniqueField: null, sortField: null },
    autoVoucherReceiptCash1:        { table: "auto_voucher_receipt_cash1",         name: "AutoVoucherReceiptCash1",       uniqueField: null, sortField: null },
};

/** Flatten PG row → flat object with id string (same shape as old Mongoose docs) */
const flattenRow = (row) => ({
    ...row.data,
    id: String(row.id),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});

/**
 * Create an Express router with CRUD routes for every entity
 */
const createEntityRoutes = () => {
    const router = express.Router();

    // ── Bulk endpoint: fetch ALL entities + dropdown overrides ──
    router.get("/bulk", async (req, res, next) => {
        try {
            // Fetch all entities in parallel
            const entityPromises = Object.entries(entityMap).map(
                async ([key, { table, sortField }]) => {
                    const orderClause = sortField
                        ? `ORDER BY data->>'${sortField}' ASC`
                        : `ORDER BY created_at ASC`;

                    const { rows } = await pool.query(
                        `SELECT * FROM "${table}" ${orderClause}`
                    );
                    return [key, rows.map(flattenRow)];
                }
            );

            // Fetch dropdown overrides
            const dropdownPromise = pool.query(
                `SELECT * FROM dropdown_options`
            );

            const [entityResults, dropdownResult] = await Promise.all([
                Promise.all(entityPromises),
                dropdownPromise,
            ]);

            const payload = Object.fromEntries(entityResults);

            // Build dropdownState map
            const dropdownState = {};
            dropdownResult.rows.forEach((row) => {
                dropdownState[row.dropdown_key] = {
                    added: row.added || [],
                    removed: row.removed || [],
                    edits: row.edits || {},
                };
            });
            payload.dropdownState = dropdownState;

            res.status(200).json(payload);
        } catch (error) {
            next(error);
        }
    });

    // ── Per-entity CRUD routes ────────────────────────────────
    Object.entries(entityMap).forEach(([path, { table, name, uniqueField, sortField }]) => {
        const controller = createCrudController(table, name, { uniqueField, sortField });

        router.route(`/${path}`)
            .get(controller.getAll)
            .post(controller.create)
            // ── DELETE ALL — clears every record in the table ─
            .delete(async (req, res, next) => {
                try {
                    await pool.query(`DELETE FROM "${table}"`);
                    res.status(200).json({
                        message: `All ${name} records deleted successfully`,
                    });
                } catch (error) {
                    next(error);
                }
            });

        router.route(`/${path}/:id`)
            .get(controller.getById)
            .put(controller.update)
            .delete(controller.remove);
    });

    return router;
};

module.exports = { createEntityRoutes, entityMap };
