const express = require("express");
const createCrudController = require("../controllers/crudController");

// Import all models
const Company = require("../models/Company");
const Employee = require("../models/Employee");
const Contractor = require("../models/Contractor");
const Supplier = require("../models/Supplier");
const Machine = require("../models/Machine");
const Process = require("../models/Process");
const GroupMaster = require("../models/GroupMaster");
const Account = require("../models/Account");
const ItemGroup = require("../models/ItemGroup");
const Item = require("../models/Item");
const Characteristic = require("../models/Characteristic");
const ServiceJob = require("../models/ServiceJob");
const ReferenceGroup = require("../models/ReferenceGroup");
const Reference = require("../models/Reference");
const Tax = require("../models/Tax");

/**
 * Route-to-Model mapping
 * Key = the URL path segment the frontend uses (must match AppContext.jsx entities)
 * Value = { model, name }
 */
const entityMap = {
    companies: { model: Company, name: "Company", uniqueField: "companyCode", sortField: "companyCode" },
    employees: { model: Employee, name: "Employee", uniqueField: "employeeCode", sortField: "employeeCode" },
    contractors: { model: Contractor, name: "Contractor", uniqueField: "contractorCode", sortField: "contractorCode" },
    suppliers: { model: Supplier, name: "Supplier", uniqueField: "supplierCode", sortField: "supplierCode" },
    machines: { model: Machine, name: "Machine", uniqueField: "machineCode", sortField: "machineCode" },
    processes: { model: Process, name: "Process", uniqueField: null, sortField: "processOrder" },
    groupMaster: { model: GroupMaster, name: "GroupMaster", uniqueField: "group", sortField: "group" },
    accounts: { model: Account, name: "Account", uniqueField: "acCode", sortField: "acCode" },
    itemGroups: { model: ItemGroup, name: "ItemGroup", uniqueField: "group", sortField: "group" },
    items: { model: Item, name: "Item", uniqueField: "partNo", sortField: "partNo" },
    characteristics: { model: Characteristic, name: "Characteristic", uniqueField: "characteristics", sortField: "characteristics" },
    serviceJobs: { model: ServiceJob, name: "ServiceJob", uniqueField: null, sortField: "jobName" },
    referenceGroups: { model: ReferenceGroup, name: "ReferenceGroup", uniqueField: "groupName", sortField: "groupName" },
    references: { model: Reference, name: "Reference", uniqueField: null, sortField: "referenceType" },
    taxes: { model: Tax, name: "Tax", uniqueField: "taxLedgerAc", sortField: "taxLedgerAc" },
};

/**
 * Create an Express router with CRUD routes for every entity
 */
const createEntityRoutes = () => {
    const router = express.Router();

    Object.entries(entityMap).forEach(([path, { model, name, uniqueField, sortField }]) => {
        const controller = createCrudController(model, name, { uniqueField, sortField });

        router.route(`/${path}`)
            .get(controller.getAll)
            .post(controller.create);

        router.route(`/${path}/:id`)
            .get(controller.getById)
            .put(controller.update)
            .delete(controller.remove);
    });

    return router;
};

module.exports = { createEntityRoutes, entityMap };
