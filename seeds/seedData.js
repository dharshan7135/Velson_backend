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

// ── Demo Data (matching frontend field names exactly) ─────────

const demoCompanies = [
    { companyCode: "SASH", fullName: "Sri Amman Steels & Hardwares", address: "No. 45, Industrial Estate", state: "Tamil Nadu", code: "TN01", phoneOff: "0422-2345678", phoneRes: "0422-2345679", subHead: "Main Branch", subjectTo: "Coimbatore", bankName: "HDFC Bank", accountName: "Sri Amman Steels", accountNo: "50100012345678", ifscCode: "HDFC0001234", branch: "RS Puram", emailId: "info@sriammansteels.com", gstin: "33AABCS1234F1Z5", panNo: "AABCS1234F", salesPhoneNo: "9876500001", salesEmailId: "sales@sriammansteels.com", salesWebsite: "www.sriammansteels.com", purchasePhoneNo: "9876500002", purchaseEmailId: "purchase@sriammansteels.com", quotationPhoneNo: "9876500003", quotationEmailId: "quote@sriammansteels.com", quotationWebsite: "www.sriammansteels.com" },
    { companyCode: "VEPL", fullName: "Velson Engineering Pvt Ltd", address: "Plot 12, SIDCO Industrial Area", state: "Tamil Nadu", code: "TN02", phoneOff: "044-28901234", emailId: "admin@velsoneng.com", gstin: "33AABCV5678G2Z3", panNo: "AABCV5678G" },
];

const demoEmployees = [
    { employeeCode: "EMP001", employeeName: "Rajesh Kumar", department: "Warehouse", designation: "Store Manager", contactNo: "9876543210", emailId: "rajesh@sriammansteels.com", address: "12, Gandhi Street, Coimbatore", joinDate: "2020-03-15", companyName: "SASH" },
    { employeeCode: "EMP002", employeeName: "Priya Mani", department: "Finance", designation: "Accounts Officer", contactNo: "9876543211", emailId: "priya@sriammansteels.com", address: "45, Nehru Road, Coimbatore", joinDate: "2021-06-01", companyName: "SASH" },
    { employeeCode: "EMP003", employeeName: "Suresh Babu", department: "Sales", designation: "Sales Executive", contactNo: "9876543212", emailId: "suresh@sriammansteels.com", address: "78, Lake View, Coimbatore", joinDate: "2022-01-10", companyName: "SASH" },
    { employeeCode: "EMP004", employeeName: "Anitha Devi", department: "Procurement", designation: "Purchase Officer", contactNo: "9876543213", emailId: "anitha@sriammansteels.com", joinDate: "2021-09-15", companyName: "SASH" },
];

const demoContractors = [
    { contractorCode: "CON001", contractorName: "Kumar Fabrications", address: "Ganapathy, Coimbatore", city: "Coimbatore" },
    { contractorCode: "CON002", contractorName: "Ravi Transport Services", address: "Singanallur, Coimbatore", city: "Coimbatore" },
];

const demoSuppliers = [
    { supplierCode: "SUP001", supplierName: "Tata Steel Dealers", address: "Steel Market, Coimbatore", city: "Coimbatore", state: "Tamil Nadu", stateCode: "33", country: "India", pincode: "641002", phone1: "9111222001", grade: "A", emailId: "tata.dealers@gmail.com", gstNo: "33AABCT2222B1Z2", bankName: "SBI" },
    { supplierCode: "SUP002", supplierName: "JSW Steel Distributors", address: "Avinashi Road, Coimbatore", city: "Coimbatore", state: "Tamil Nadu", stateCode: "33", country: "India", pincode: "641014", phone1: "9111222002", grade: "A", emailId: "jsw.dist@gmail.com", gstNo: "33AABCJ3333C1Z3" },
    { supplierCode: "SUP003", supplierName: "Stanley Tools India", address: "Industrial Area, Chennai", city: "Chennai", state: "Tamil Nadu", stateCode: "33", country: "India", pincode: "600058", phone1: "9111222003", grade: "B", emailId: "stanley.ind@gmail.com" },
];

const demoMachines = [
    { machineCode: "MCH001", machineName: "CNC Cutting Machine", serialNo: "HYP-2023-001", machineCategory: "Cutting", workHoursPerDay: "8", model: "Powermax 105", manufacture: "Hypertherm", country: "USA", currency: "USD", price: "850000", installationPlace: "Workshop Bay 1", dateOfPurchase: "2023-01-15" },
    { machineCode: "MCH002", machineName: "Hydraulic Press Brake", serialNo: "AMD-2022-045", machineCategory: "Bending", workHoursPerDay: "8", model: "HFE 1003", manufacture: "Amada", country: "Japan", currency: "JPY", price: "1200000", installationPlace: "Workshop Bay 2", dateOfPurchase: "2022-06-20" },
    { machineCode: "MCH003", machineName: "MIG Welding Machine", serialNo: "ESB-2024-012", machineCategory: "Welding", model: "Warrior 500i", manufacture: "ESAB", country: "India", price: "125000", installationPlace: "Welding Station A" },
];

const demoProcesses = [
    { partName: "Steel Plate", processName: "Cutting", team: "Team A", machineCode: "MCH001", machineName: "CNC Cutting Machine", processOrder: "1", cycleTime: "10", settingTime: "5" },
    { partName: "Steel Plate", processName: "Bending", team: "Team B", machineCode: "MCH002", machineName: "Hydraulic Press Brake", processOrder: "2", cycleTime: "15", settingTime: "8" },
];

const demoGroupMasters = [
    { group: "Current Assets", underGroupOf: "Assets", printingOrder: "1", groupTotal: "" },
    { group: "Fixed Assets", underGroupOf: "Assets", printingOrder: "2", groupTotal: "" },
    { group: "Current Liabilities", underGroupOf: "Liabilities", printingOrder: "3", groupTotal: "" },
    { group: "Direct Expenses", underGroupOf: "Expenses", printingOrder: "4", groupTotal: "" },
];

const demoAccounts = [
    { acCode: "AC001", acName: "Cash Account", ledgerType: "Cash", group: "Current Assets", dueDays: "0", creditLimit: "0", hireCharges: "0", taxType: "None", status: "Active", openingBalance: "50000" },
    { acCode: "AC002", acName: "HDFC Bank Current", ledgerType: "Bank", group: "Current Assets", dueDays: "0", creditLimit: "500000", hireCharges: "0", taxType: "None", status: "Active", openingBalance: "875000", bankAcNo: "50100012345678", ifscCode: "HDFC0001234", branch: "RS Puram", bank: "HDFC Bank" },
];

const demoItemGroups = [
    { group: "TMT Bars", storeName: "Main Store", underGroupOf: "" },
    { group: "MS Pipes", storeName: "Main Store", underGroupOf: "" },
    { group: "GI Sheets", storeName: "Main Store", underGroupOf: "" },
    { group: "Hand Tools", storeName: "Tools Store", underGroupOf: "" },
];

const demoItems = [
    { itemGroup: "TMT Bars", partNo: "ITM001", partName: "TMT Bar 8mm Fe500D", uom: "KG", hsnCode: "72142000", purchaseRate: "55", rate: "62", gstPer: "18", category: "Steel", reorderLevel: "500", minStock: "200", storeName: "Main Store", itemType: "Raw Material", qcType: "QUALITY" },
    { itemGroup: "TMT Bars", partNo: "ITM002", partName: "TMT Bar 12mm Fe500D", uom: "KG", hsnCode: "72142000", purchaseRate: "54", rate: "61", gstPer: "18", category: "Steel", reorderLevel: "400", minStock: "150", storeName: "Main Store", itemType: "Raw Material", qcType: "QUALITY" },
];

const demoCharacteristics = [
    { characteristics: "Diameter" },
    { characteristics: "Thickness" },
    { characteristics: "Length" },
    { characteristics: "Yield Strength" },
];

const demoServiceJobs = [
    { vehicleType: "Truck", jobName: "Custom Cutting Service", labourCharge: "500", materialCharge: "200" },
    { vehicleType: "Van", jobName: "Threading Service", labourCharge: "300", materialCharge: "100" },
];

const demoReferenceGroups = [
    { groupName: "Department" },
    { groupName: "Designation" },
    { groupName: "UOM" },
    { groupName: "Machine Category" },
    { groupName: "Team" },
    { groupName: "Currency" },
    { groupName: "Vehicle Type" },
    { groupName: "Store Name" },
];

const demoReferences = [
    { referenceType: "Department", code: "DEPT001", description: "Warehouse" },
    { referenceType: "Department", code: "DEPT002", description: "Finance" },
    { referenceType: "Department", code: "DEPT003", description: "Sales" },
    { referenceType: "Department", code: "DEPT004", description: "Procurement" },
    { referenceType: "Department", code: "DEPT005", description: "Production" },
    { referenceType: "Designation", code: "DESIG001", description: "Store Manager" },
    { referenceType: "Designation", code: "DESIG002", description: "Accounts Officer" },
    { referenceType: "Designation", code: "DESIG003", description: "Sales Executive" },
    { referenceType: "Designation", code: "DESIG004", description: "Purchase Officer" },
    { referenceType: "UOM", code: "UOM001", description: "KG" },
    { referenceType: "UOM", code: "UOM002", description: "NOS" },
    { referenceType: "UOM", code: "UOM003", description: "MTR" },
    { referenceType: "UOM", code: "UOM004", description: "SET" },
    { referenceType: "Machine Category", code: "MCAT001", description: "Cutting" },
    { referenceType: "Machine Category", code: "MCAT002", description: "Bending" },
    { referenceType: "Machine Category", code: "MCAT003", description: "Welding" },
    { referenceType: "Team", code: "TEAM001", description: "Team A" },
    { referenceType: "Team", code: "TEAM002", description: "Team B" },
    { referenceType: "Currency", code: "CUR001", description: "INR" },
    { referenceType: "Currency", code: "CUR002", description: "USD" },
    { referenceType: "Vehicle Type", code: "VT001", description: "Truck" },
    { referenceType: "Vehicle Type", code: "VT002", description: "Van" },
    { referenceType: "Store Name", code: "STR001", description: "Main Store" },
    { referenceType: "Store Name", code: "STR002", description: "Tools Store" },
];

const demoTaxes = [
    { taxLedgerAc: "GST 5%", taxPercent: "5", cgstPercent: "2.5", sgstPercent: "2.5", igstPercent: "5", purchaseCGST: "Input CGST 2.5%", purchaseSGST: "Input SGST 2.5%", purchaseIGST: "Input IGST 5%", salesCGST: "Output CGST 2.5%", salesSGST: "Output SGST 2.5%", salesIGST: "Output IGST 5%", hsnCode: "" },
    { taxLedgerAc: "GST 12%", taxPercent: "12", cgstPercent: "6", sgstPercent: "6", igstPercent: "12", purchaseCGST: "Input CGST 6%", purchaseSGST: "Input SGST 6%", purchaseIGST: "Input IGST 12%", salesCGST: "Output CGST 6%", salesSGST: "Output SGST 6%", salesIGST: "Output IGST 12%", hsnCode: "" },
    { taxLedgerAc: "GST 18%", taxPercent: "18", cgstPercent: "9", sgstPercent: "9", igstPercent: "18", purchaseCGST: "Input CGST 9%", purchaseSGST: "Input SGST 9%", purchaseIGST: "Input IGST 18%", salesCGST: "Output CGST 9%", salesSGST: "Output SGST 9%", salesIGST: "Output IGST 18%", hsnCode: "" },
    { taxLedgerAc: "GST 28%", taxPercent: "28", cgstPercent: "14", sgstPercent: "14", igstPercent: "28", purchaseCGST: "Input CGST 14%", purchaseSGST: "Input SGST 14%", purchaseIGST: "Input IGST 28%", salesCGST: "Output CGST 14%", salesSGST: "Output SGST 14%", salesIGST: "Output IGST 28%", hsnCode: "" },
];

// ── Seed Map ──────────────────────────────────────────────────

const seedMap = [
    { model: Company, data: demoCompanies, name: "Companies" },
    { model: Employee, data: demoEmployees, name: "Employees" },
    { model: Contractor, data: demoContractors, name: "Contractors" },
    { model: Supplier, data: demoSuppliers, name: "Suppliers" },
    { model: Machine, data: demoMachines, name: "Machines" },
    { model: Process, data: demoProcesses, name: "Processes" },
    { model: GroupMaster, data: demoGroupMasters, name: "GroupMasters" },
    { model: Account, data: demoAccounts, name: "Accounts" },
    { model: ItemGroup, data: demoItemGroups, name: "ItemGroups" },
    { model: Item, data: demoItems, name: "Items" },
    { model: Characteristic, data: demoCharacteristics, name: "Characteristics" },
    { model: ServiceJob, data: demoServiceJobs, name: "ServiceJobs" },
    { model: ReferenceGroup, data: demoReferenceGroups, name: "ReferenceGroups" },
    { model: Reference, data: demoReferences, name: "References" },
    { model: Tax, data: demoTaxes, name: "Taxes" },
];

/**
 * Seed all collections — only inserts if a collection is empty.
 */
const seedDatabase = async () => {
    console.log("\n🌱 Checking and seeding collections...");

    let seededCount = 0;
    let skippedCount = 0;

    for (const { model, data, name } of seedMap) {
        try {
            const count = await model.countDocuments();
            if (count === 0) {
                await model.insertMany(data);
                console.log(`   ✅ ${name}: seeded ${data.length} records`);
                seededCount++;
            } else {
                console.log(`   📦 ${name}: already has ${count} records — skipped`);
                skippedCount++;
            }
        } catch (error) {
            console.error(`   ❌ ${name}: seeding failed — ${error.message}`);
        }
    }

    console.log(`\n🌱 Seeding complete: ${seededCount} seeded, ${skippedCount} skipped.\n`);
};

module.exports = { seedDatabase };
