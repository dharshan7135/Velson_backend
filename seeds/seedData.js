const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { pool } = require("../config/db");

// ════════════════════════════════════════════════════════════════
//  DEMO DATA — VELSON Industries ERP  (Salem, Tamil Nadu)
//  Fields match exact emptyForm keys from each frontend component
// ════════════════════════════════════════════════════════════════

// ── CORE MASTERS ─────────────────────────────────────────────────

const demoCompanies = [
    { CompanyCode: "C0001", CompanyName: "VELSON Industries", CompanyTypeId: 121, Status: "Active", DoorNumber: "No. 12", Street: "Industrial Estate", Place: "Hasthampatty", Post: "Hasthampatty", City: "Salem", Taluk: "Salem", District: "Salem", DistrictCode: "33", State: "Tamil Nadu", StateCode: "33", Country: "India", PinCode: "636007", FullAddress: "No. 12, Industrial Estate, Hasthampatty, Salem - 636007", GSTIN: "33AABCV9999A1Z9", PanNo: "AABCV9999A", CPhoneNumber: "9876500001", CEMailId: "info@velsonindustries.com", CWebsiteURL: "www.velsonindustries.com", MPhoneNumber: "9876500002", MEMailId: "marketing@velsonindustries.com", MWebsiteURL: "www.velsonindustries.com", PPhoneNumber: "9876500004", PEMailId: "purchase@velsonindustries.com", PWebsiteURL: "", SPhoneNumber: "9876500003", SEMailId: "sales@velsonindustries.com", SWebsiteURL: "www.velsonindustries.com", SERPhoneNumber: "9876500005", SEREMailId: "service@velsonindustries.com", SERWebsiteURL: "", BankAccountType: "Current", BankAccountName: "VELSON Industries", BankAccountNumber: "50200098765432", BankName: "HDFC Bank", BankIFSCCode: "HDFC0002567", BankMICRCode: "636240002", BankBranch: "Salem Main", BankDistrict: "Salem", BankState: "Tamil Nadu", BankPinCode: "636007", BankCountry: "India", BankFullAddress: "HDFC Bank, Salem Main Branch, Opp Town Hall, Salem - 636007" },
    { CompanyCode: "C0002", CompanyName: "VELSON Industries - Branch", CompanyTypeId: 122, Status: "Active", DoorNumber: "Plot 8", Street: "SIPCOT Industrial Area", Place: "Salem", Post: "Salem", City: "Salem", Taluk: "Salem", District: "Salem", DistrictCode: "33", State: "Tamil Nadu", StateCode: "33", Country: "India", PinCode: "636008", FullAddress: "Plot 8, SIPCOT Industrial Area, Salem", GSTIN: "33AABCV9999A2Z8", PanNo: "AABCV9999A", CPhoneNumber: "9876500006", CEMailId: "branch@velsonindustries.com", CWebsiteURL: "", MPhoneNumber: "", MEMailId: "", MWebsiteURL: "", PPhoneNumber: "9876500007", PEMailId: "branch.purchase@velsonindustries.com", PWebsiteURL: "", SPhoneNumber: "9876500008", SEMailId: "branch.sales@velsonindustries.com", SWebsiteURL: "", SERPhoneNumber: "", SEREMailId: "", SERWebsiteURL: "", BankAccountType: "Current", BankAccountName: "VELSON Branch", BankAccountNumber: "50200098765433", BankName: "SBI", BankIFSCCode: "SBIN0001234", BankMICRCode: "636002003", BankBranch: "Salem", BankDistrict: "Salem", BankState: "Tamil Nadu", BankPinCode: "636008", BankCountry: "India", BankFullAddress: "SBI, SIPCOT Branch, Salem - 636008" },
];


const demoEmployees = [
    { EM_Code: "EMP001", EM_Employee_Name: "Rajesh Kumar", DepartmentId: 101, DepartmentName: "Production", DesignationId: 111, DesignationName: "Manager", ContractId: "", ContractorName: "", CompanyId: 1, CompanyName: "VELSON Industries", Contact_No: "9876543210", Adhar_No: "234567890123", Join_Date: "2020-03-15", EM_DOB: "1985-08-12", Releving_Date: "", EM_Team: "Team A", EM_Email_ID: "rajesh@velsonindustries.com", EM_Rep_Person: "Karthik Raj", EM_Status: "Active", Address: "12, Gandhi Street, Salem" },
    { EM_Code: "EMP002", EM_Employee_Name: "Priya Mani", DepartmentId: 103, DepartmentName: "Sales", DesignationId: 112, DesignationName: "Engineer", ContractId: "", ContractorName: "", CompanyId: 1, CompanyName: "VELSON Industries", Contact_No: "9876543211", Adhar_No: "345678901234", Join_Date: "2021-06-01", EM_DOB: "1993-03-22", Releving_Date: "", EM_Team: "", EM_Email_ID: "priya@velsonindustries.com", EM_Rep_Person: "Rajesh Kumar", EM_Status: "Active", Address: "45, Nehru Road, Salem" },
    { EM_Code: "EMP003", EM_Employee_Name: "Suresh Babu", DepartmentId: 102, DepartmentName: "Quality", DesignationId: 113, DesignationName: "Supervisor", ContractId: "", ContractorName: "", CompanyId: 1, CompanyName: "VELSON Industries", Contact_No: "9876543212", Adhar_No: "456789012345", Join_Date: "2022-01-10", EM_DOB: "1990-11-05", Releving_Date: "", EM_Team: "Team B", EM_Email_ID: "suresh@velsonindustries.com", EM_Rep_Person: "Rajesh Kumar", EM_Status: "Active", Address: "78, Lake View, Salem" },
    { EM_Code: "EMP004", EM_Employee_Name: "Anitha Devi", DepartmentId: 104, DepartmentName: "Purchase", DesignationId: 114, DesignationName: "Operator", ContractId: 1, ContractorName: "Kumar Fabrications", CompanyId: 1, CompanyName: "VELSON Industries", Contact_No: "9876543213", Adhar_No: "567890123456", Join_Date: "2021-09-15", EM_DOB: "1988-07-18", Releving_Date: "2025-03-31", EM_Team: "", EM_Email_ID: "anitha@velsonindustries.com", EM_Rep_Person: "Rajesh Kumar", EM_Status: "Relieved", Address: "90, Anna Nagar, Salem" },
    { EM_Code: "EMP005", EM_Employee_Name: "Karthik Raj", DepartmentId: 101, DepartmentName: "Production", DesignationId: 111, DesignationName: "Manager", ContractId: "", ContractorName: "", CompanyId: 1, CompanyName: "VELSON Industries", Contact_No: "9876543214", Adhar_No: "678901234567", Join_Date: "2019-05-01", EM_DOB: "1982-12-30", Releving_Date: "", EM_Team: "Team A", EM_Email_ID: "karthik@velsonindustries.com", EM_Rep_Person: "", EM_Status: "Active", Address: "15, Shevapet, Salem" },
];

const demoContractors = [
    { Contract_Code: "CON001", Contract_Name: "Kumar Fabrications", Address: "Suramangalam, Salem", Phone: "9944221100", Email: "info@kumarfab.com", Status: "Active" },
    { Contract_Code: "CON002", Contract_Name: "Ravi Transport Services", Address: "Hasthampatti, Salem", Phone: "9944221101", Email: "ravi@transport.com", Status: "Active" },
    { Contract_Code: "CON003", Contract_Name: "Siva Welding Works", Address: "Fairlands, Salem", Phone: "9944221102", Email: "siva@welding.com", Status: "Inactive" },
];

const demoSuppliers = [
    { SupplierTypeId: 141, LM_Ledger_Name: "Tata Steel Dealers", LM_Code: "S-001", LM_Address1: "Steel Market, Salem", LM_Area: "Salem", LM_State: "Tamil Nadu", LM_StateCode: "33", LM_Country: "India", LM_Contact_Person: "Mr. Singh", LM_Phone_Number: "9111222001", LM_GSTIN: "33AABCT2222B1Z2" },
    { SupplierTypeId: 142, LM_Ledger_Name: "JSW Steel Distributors", LM_Code: "S-002", LM_Address1: "Omalur Road, Salem", LM_Area: "Salem", LM_State: "Tamil Nadu", LM_StateCode: "33", LM_Country: "India", LM_Contact_Person: "Purchase Mgr", LM_Phone_Number: "9111222002", LM_GSTIN: "33AABCJ3333C1Z3" },
    { SupplierTypeId: 141, LM_Ledger_Name: "Stanley Tools India", LM_Code: "S-003", LM_Address1: "Industrial Area, Chennai", LM_Area: "Chennai", LM_State: "Tamil Nadu", LM_StateCode: "33", LM_Country: "India", LM_Contact_Person: "Sales Team", LM_Phone_Number: "9111222003", LM_GSTIN: "" },
    { SupplierTypeId: 142, LM_Ledger_Name: "Bosch Hardware Pvt Ltd", LM_Code: "S-004", LM_Address1: "Mount Road, Chennai", LM_Area: "Chennai", LM_State: "Tamil Nadu", LM_StateCode: "33", LM_Country: "India", LM_Contact_Person: "Vendor Support", LM_Phone_Number: "9111222004", LM_GSTIN: "33AAACB4444D1Z4" },
];


const demoMachines = [
    { MachineCategoryId: 151, MachineCategoryName: "CNC", VendorId: 161, VendorName: "Haas Automation", Machine_Code: "M001", Machine_Name: "CNC Cutting Machine", Machine_Description: "High precision plasma cutter", Location: "Workshop Bay 1", Status: "Active" },
    { MachineCategoryId: 152, MachineCategoryName: "Lathe", VendorId: 162, VendorName: "DMG Mori", Machine_Code: "M002", Machine_Name: "Hydraulic Press Brake", Machine_Description: "HFE 1003 press brake", Location: "Workshop Bay 2", Status: "Active" },
    { MachineCategoryId: 153, MachineCategoryName: "Milling", VendorId: 161, VendorName: "Haas Automation", Machine_Code: "M003", Machine_Name: "MIG Welding Machine", Machine_Description: "Warrior 500i", Location: "Welding Station A", Status: "Active" },
    { MachineCategoryId: 152, MachineCategoryName: "Lathe", VendorId: 162, VendorName: "DMG Mori", Machine_Code: "M004", Machine_Name: "Lathe Machine", Machine_Description: "NH26 CNC lathe", Location: "Turning Section", Status: "Active" },
];


const demoProcesses = [
    { PM_Process_Name: "Cutting", PM_Process_Name1: "CUT", ProcessTypeId: 171, ProcessTypeName: "In-House", TeamId: 181, TeamName: "Team A", PM_Process_Order: 1, PM_Days: 0, PM_Hours: 2, Minutes: 30, Setting_Time: 5, Cycle_Time: 10, Handling_Time: 2, Idle_Time: 1, Machine_id: 1, Machine_Name: "CNC Cutting Machine" },
    { PM_Process_Name: "Bending", PM_Process_Name1: "BEND", ProcessTypeId: 171, ProcessTypeName: "In-House", TeamId: 182, TeamName: "Team B", PM_Process_Order: 2, PM_Days: 0, PM_Hours: 3, Minutes: 0, Setting_Time: 8, Cycle_Time: 15, Handling_Time: 3, Idle_Time: 2, Machine_id: 2, Machine_Name: "Hydraulic Press Brake" },
    { PM_Process_Name: "Welding", PM_Process_Name1: "WELD", ProcessTypeId: 171, ProcessTypeName: "In-House", TeamId: 181, TeamName: "Team A", PM_Process_Order: 3, PM_Days: 0, PM_Hours: 4, Minutes: 0, Setting_Time: 10, Cycle_Time: 20, Handling_Time: 5, Idle_Time: 3, Machine_id: 3, Machine_Name: "MIG Welding Machine" },
    { PM_Process_Name: "Turning", PM_Process_Name1: "TURN", ProcessTypeId: 172, ProcessTypeName: "Outsource", TeamId: 182, TeamName: "Team B", PM_Process_Order: 1, PM_Days: 0, PM_Hours: 2, Minutes: 0, Setting_Time: 6, Cycle_Time: 12, Handling_Time: 3, Idle_Time: 1, Machine_id: 4, Machine_Name: "Lathe Machine" },
];

const demoGroupMasters = [
    { group: "Current Assets",        underGroupOf: "Assets",      printingOrder: "1", groupTotal: "" },
    { group: "Fixed Assets",          underGroupOf: "Assets",      printingOrder: "2", groupTotal: "" },
    { group: "Current Liabilities",   underGroupOf: "Liabilities", printingOrder: "3", groupTotal: "" },
    { group: "Long Term Liabilities", underGroupOf: "Liabilities", printingOrder: "4", groupTotal: "" },
    { group: "Direct Expenses",       underGroupOf: "Expenses",    printingOrder: "5", groupTotal: "" },
    { group: "Indirect Expenses",     underGroupOf: "Expenses",    printingOrder: "6", groupTotal: "" },
    { group: "Sales",                 underGroupOf: "Income",      printingOrder: "7", groupTotal: "" },
];

// AccountCreation emptyForm: acCode, lId, acName, address, dueDays, tdsPercent,
// shortName, creditLimit, tcsPercent, ledgerType, hireCharges, km,
// group, accountName, openingBalance, acType, area,
// bankAcNo, ifscCode, branch, taxType, stateName, stateCode,
// gstNo, panNo, aadhaarNo, emailId, phoneNo, cellNo, contactPerson, bank, status, ledgerId
const demoAccounts = [
    {
        acCode: "AC001", lId: "", acName: "Cash Account", shortName: "CASH",
        ledgerType: "Cash", group: "Current Assets",
        openingBalance: "50000", acType: "Debit",
        dueDays: "0", creditLimit: "0", hireCharges: "0", km: "0",
        taxType: "None", status: "Active",
        address: "", area: "", stateName: "", stateCode: "",
        bankAcNo: "", ifscCode: "", branch: "", bank: "", accountName: "",
        gstNo: "", panNo: "", aadhaarNo: "", emailId: "", phoneNo: "",
        cellNo: "", contactPerson: "", ledgerId: "", tdsPercent: "", tcsPercent: "",
    },
    {
        acCode: "AC002", lId: "L002", acName: "HDFC Bank Current", shortName: "HDFC",
        ledgerType: "Bank", group: "Current Assets",
        openingBalance: "875000", acType: "Debit",
        dueDays: "0", creditLimit: "500000", hireCharges: "0", km: "0",
        taxType: "None", status: "Active",
        address: "HDFC Bank, Salem Main Branch", area: "Salem",
        stateName: "Tamil Nadu", stateCode: "33",
        bankAcNo: "50200098765432", ifscCode: "HDFC0002567", branch: "Salem Main",
        bank: "HDFC Bank", accountName: "VELSON Industries",
        gstNo: "", panNo: "", aadhaarNo: "",
        emailId: "", phoneNo: "", cellNo: "", contactPerson: "",
        ledgerId: "", tdsPercent: "", tcsPercent: "",
    },
    {
        acCode: "AC003", lId: "L003", acName: "Tata Steel Dealers", shortName: "TATA-STL",
        ledgerType: "Party", group: "Current Liabilities",
        openingBalance: "0", acType: "Credit",
        dueDays: "30", creditLimit: "200000", hireCharges: "0", km: "0",
        taxType: "GST 18%", status: "Active",
        address: "Steel Market, Salem", area: "Salem",
        stateName: "Tamil Nadu", stateCode: "33",
        bankAcNo: "", ifscCode: "", branch: "", bank: "", accountName: "Tata Steel",
        gstNo: "33AABCT2222B1Z2", panNo: "", aadhaarNo: "",
        emailId: "tata.dealers@gmail.com", phoneNo: "9111222001", cellNo: "",
        contactPerson: "Purchase Manager", ledgerId: "", tdsPercent: "", tcsPercent: "",
    },
    {
        acCode: "AC004", lId: "L004", acName: "VELSON Sales A/c", shortName: "VEL-SALES",
        ledgerType: "Sales", group: "Sales",
        openingBalance: "0", acType: "Credit",
        dueDays: "0", creditLimit: "0", hireCharges: "0", km: "0",
        taxType: "None", status: "Active",
        address: "", area: "", stateName: "", stateCode: "",
        bankAcNo: "", ifscCode: "", branch: "", bank: "", accountName: "",
        gstNo: "", panNo: "", aadhaarNo: "", emailId: "", phoneNo: "",
        cellNo: "", contactPerson: "", ledgerId: "", tdsPercent: "", tcsPercent: "",
    },
];


const demoItemGroups = [
    { IM_PartName: "Raw Materials", StoreId: 1, StoreName: "Main Store", PrefixId: 1, PrefixName: "RM", status: "A" },
    { IM_PartName: "Finished Goods", StoreId: 1, StoreName: "Main Store", PrefixId: 2, PrefixName: "FG", status: "A" },
    { IM_PartName: "Bought Out Parts", StoreId: 2, StoreName: "Sub Store", PrefixId: 3, PrefixName: "BO", status: "A" },
    { IM_PartName: "Hand Tools", StoreId: 2, StoreName: "Tools Store", PrefixId: 4, PrefixName: "HT", status: "A" },
    { IM_PartName: "Fasteners", StoreId: 2, StoreName: "Tools Store", PrefixId: 5, PrefixName: "FN", status: "A" },
];

const demoItems = [
    { GroupId: 1, GroupName: "Raw Materials", IM_Part_No: "RM00001", Outsource_Part_No: "", IM_PartName: "SS304 Round Bar 25mm", ModelId: "", Brand: "Jindal", IM_Description: "Stainless Steel 304 Round Bar", IM_Size: "25mm", IM_WEIGHT: 12.5, UnitId: 192, UnitName: "Kg", SubGroupId: "", ItemTypeId: 201, ItemTypeName: "Raw Material", QcTypeId: "", IM_HSN_Code: "72041000", IM_Purchase_Rate: 250, IM_Margin_per: 20, IM_Rate: 300, CurrencyId: "", TaxId: "", StoreId: 1, MaterialGradeId: "", MaterialTypeId: "", RawMaterialId: "", Rack_No: "R1-A", Location: "Main Store", IM_ReorderLevel: 50, IM_Min_Stock: 20, RM_length: "6m", Raw_material_wt: 12.5, FG_material_wt: "", RouteCardNumber: "", Status: "Active" },
    { GroupId: 2, GroupName: "Finished Goods", IM_Part_No: "FG00001", Outsource_Part_No: "OSP-001", IM_PartName: "Shaft Assembly SA-100", ModelId: "", Brand: "VELSON", IM_Description: "Precision turned shaft assembly", IM_Size: "100mm", IM_WEIGHT: 3.2, UnitId: 191, UnitName: "Nos", SubGroupId: "", ItemTypeId: 202, ItemTypeName: "Finished Good", QcTypeId: "", IM_HSN_Code: "84831020", IM_Purchase_Rate: 1500, IM_Margin_per: 46.67, IM_Rate: 2200, CurrencyId: "", TaxId: "", StoreId: 1, MaterialGradeId: "", MaterialTypeId: "", RawMaterialId: "", Rack_No: "R2-B", Location: "FG Store", IM_ReorderLevel: 10, IM_Min_Stock: 5, RM_length: "", Raw_material_wt: "", FG_material_wt: 3.2, RouteCardNumber: "RC-SA100", Status: "Active" },
    { GroupId: 1, GroupName: "Raw Materials", IM_Part_No: "RM00002", Outsource_Part_No: "", IM_PartName: "EN8 Round Bar 50mm", ModelId: "", Brand: "Tata", IM_Description: "Carbon Steel EN8 Round Bar", IM_Size: "50mm", IM_WEIGHT: 25, UnitId: 192, UnitName: "Kg", SubGroupId: "", ItemTypeId: 201, ItemTypeName: "Raw Material", QcTypeId: "", IM_HSN_Code: "72142000", IM_Purchase_Rate: 180, IM_Margin_per: 22.22, IM_Rate: 220, CurrencyId: "", TaxId: "", StoreId: 1, MaterialGradeId: "", MaterialTypeId: "", RawMaterialId: "", Rack_No: "R1-B", Location: "Main Store", IM_ReorderLevel: 100, IM_Min_Stock: 50, RM_length: "6m", Raw_material_wt: 25, FG_material_wt: "", RouteCardNumber: "", Status: "Active" },
    { GroupId: 3, GroupName: "Bought Out Parts", IM_Part_No: "BO00001", Outsource_Part_No: "", IM_PartName: "Grinding Wheel 7inch", ModelId: "", Brand: "Norton", IM_Description: "Norton 7 inch grinding wheel", IM_Size: "7 inch", IM_WEIGHT: 0.3, UnitId: 191, UnitName: "Nos", SubGroupId: "", ItemTypeId: 201, ItemTypeName: "Raw Material", QcTypeId: "", IM_HSN_Code: "68042100", IM_Purchase_Rate: 45, IM_Margin_per: 22.22, IM_Rate: 55, CurrencyId: "", TaxId: "", StoreId: 2, MaterialGradeId: "", MaterialTypeId: "", RawMaterialId: "", Rack_No: "R3-A", Location: "Tools Store", IM_ReorderLevel: 20, IM_Min_Stock: 10, RM_length: "", Raw_material_wt: "", FG_material_wt: "", RouteCardNumber: "", Status: "Active" },
    { GroupId: 5, GroupName: "Fasteners", IM_Part_No: "FN00001", Outsource_Part_No: "", IM_PartName: "Hex Bolt M12x50", ModelId: "", Brand: "Unbrako", IM_Description: "M12x50 hex bolt grade 8.8", IM_Size: "M12x50", IM_WEIGHT: 0.055, UnitId: 191, UnitName: "Nos", SubGroupId: "", ItemTypeId: 201, ItemTypeName: "Raw Material", QcTypeId: "", IM_HSN_Code: "73181500", IM_Purchase_Rate: 5, IM_Margin_per: 40, IM_Rate: 7, CurrencyId: "", TaxId: "", StoreId: 2, MaterialGradeId: "", MaterialTypeId: "", RawMaterialId: "", Rack_No: "R4-C", Location: "Tools Store", IM_ReorderLevel: 200, IM_Min_Stock: 100, RM_length: "", Raw_material_wt: "", FG_material_wt: "", RouteCardNumber: "", Status: "Active" },
];


const demoCharacteristics = [
    { characteristics: "Diameter" }, { characteristics: "Thickness" },
    { characteristics: "Length" },   { characteristics: "Yield Strength" },
    { characteristics: "Width" },    { characteristics: "Grade" },
];

const demoServiceJobs = [
    { vehicleType: "Truck",  jobName: "Custom Cutting Service", labourCharge: "500", materialCharge: "200" },
    { vehicleType: "Van",    jobName: "Threading Service",       labourCharge: "300", materialCharge: "100" },
    { vehicleType: "Truck",  jobName: "Bending Service",         labourCharge: "600", materialCharge: "250" },
    { vehicleType: "Others", jobName: "Welding Service",         labourCharge: "800", materialCharge: "300" },
];

const demoReferenceGroups = [
    { RG_vCode: "Department", RG_vDescription: "Department", status: "A" },
    { RG_vCode: "Designation", RG_vDescription: "Designation", status: "A" },
    { RG_vCode: "Company Type", RG_vDescription: "Company Type", status: "A" },
    { RG_vCode: "Customer Type", RG_vDescription: "Customer Type", status: "A" },
    { RG_vCode: "Supplier Type", RG_vDescription: "Supplier Type", status: "A" },
    { RG_vCode: "Machine Category", RG_vDescription: "Machine Category", status: "A" },
    { RG_vCode: "Vendor", RG_vDescription: "Vendor", status: "A" },
    { RG_vCode: "Process Type", RG_vDescription: "Process Type", status: "A" },
    { RG_vCode: "Team", RG_vDescription: "Team", status: "A" },
    { RG_vCode: "UOM", RG_vDescription: "Unit of Measurement", status: "A" },
];

const demoReferences = [
    { referenceType: "Department",       code: "DEPT001", description: "Warehouse" },
    { referenceType: "Department",       code: "DEPT002", description: "Finance" },
    { referenceType: "Department",       code: "DEPT003", description: "Sales" },
    { referenceType: "Department",       code: "DEPT004", description: "Procurement" },
    { referenceType: "Department",       code: "DEPT005", description: "Production" },
    { referenceType: "Designation",      code: "DESIG001",description: "Store Manager" },
    { referenceType: "Designation",      code: "DESIG002",description: "Accounts Officer" },
    { referenceType: "Designation",      code: "DESIG003",description: "Sales Executive" },
    { referenceType: "UOM",              code: "UOM001",  description: "KG" },
    { referenceType: "UOM",              code: "UOM002",  description: "NOS" },
    { referenceType: "UOM",              code: "UOM003",  description: "MTR" },
    { referenceType: "Machine Category", code: "MCAT001", description: "Cutting" },
    { referenceType: "Machine Category", code: "MCAT002", description: "Bending" },
    { referenceType: "Machine Category", code: "MCAT003", description: "Welding" },
    { referenceType: "Team",             code: "TEAM001", description: "Team A" },
    { referenceType: "Team",             code: "TEAM002", description: "Team B" },
    { referenceType: "Currency",         code: "CUR001",  description: "INR" },
    { referenceType: "Currency",         code: "CUR002",  description: "USD" },
    { referenceType: "Vehicle Type",     code: "VT001",   description: "Truck" },
    { referenceType: "Vehicle Type",     code: "VT002",   description: "Van" },
    { referenceType: "Store Name",       code: "STR001",  description: "Main Store" },
    { referenceType: "Store Name",       code: "STR002",  description: "Tools Store" },
    { referenceType: "Payment Mode",     code: "PM001",   description: "Cash" },
    { referenceType: "Payment Mode",     code: "PM002",   description: "Bank Transfer" },
    { referenceType: "Job Status",       code: "JS001",   description: "Open" },
    { referenceType: "Job Status",       code: "JS002",   description: "In Progress" },
    { referenceType: "Job Status",       code: "JS003",   description: "Completed" },
];

const demoTaxes = [
    { taxLedgerAc: "GST 5%",  taxPercent: "5",  cgstPercent: "2.5", sgstPercent: "2.5", igstPercent: "5",  purchaseCGST: "Input CGST 2.5%", purchaseSGST: "Input SGST 2.5%", purchaseIGST: "Input IGST 5%",  salesCGST: "Output CGST 2.5%", salesSGST: "Output SGST 2.5%", salesIGST: "Output IGST 5%",  hsnCode: "" },
    { taxLedgerAc: "GST 12%", taxPercent: "12", cgstPercent: "6",   sgstPercent: "6",   igstPercent: "12", purchaseCGST: "Input CGST 6%",   purchaseSGST: "Input SGST 6%",   purchaseIGST: "Input IGST 12%", salesCGST: "Output CGST 6%",   salesSGST: "Output SGST 6%",   salesIGST: "Output IGST 12%", hsnCode: "" },
    { taxLedgerAc: "GST 18%", taxPercent: "18", cgstPercent: "9",   sgstPercent: "9",   igstPercent: "18", purchaseCGST: "Input CGST 9%",   purchaseSGST: "Input SGST 9%",   purchaseIGST: "Input IGST 18%", salesCGST: "Output CGST 9%",   salesSGST: "Output SGST 9%",   salesIGST: "Output IGST 18%", hsnCode: "" },
    { taxLedgerAc: "GST 28%", taxPercent: "28", cgstPercent: "14",  sgstPercent: "14",  igstPercent: "28", purchaseCGST: "Input CGST 14%",  purchaseSGST: "Input SGST 14%",  purchaseIGST: "Input IGST 28%", salesCGST: "Output CGST 14%",  salesSGST: "Output SGST 14%",  salesIGST: "Output IGST 28%", hsnCode: "" },
];


// ── FRONTEND-ALIGNED ENTITIES (field keys match mockData.js exactly) ─────

// CustomerMaster — keys: CustomerTypeId, LM_Ledger_Name, LM_Code, LM_Address1, LM_Area, etc.
const demoCustomers = [
    { CustomerTypeId: 131, LM_Ledger_Name: "Tata Motors Ltd", LM_Code: "C-001", LM_Address1: "14 Haddows Road", LM_Address2: "Nungambakkam", LM_Address3: "", LM_Address4: "", LM_Address5: "", LM_Area: "Chennai", LM_State: "Tamil Nadu", LM_StateCode: "33", LM_Country: "India", LM_PinCode: "600006", LM_Contact_Person: "Mr. Arvind", LM_Phone_Number: "044-28240000", LM_Cell_No: "9876540001", LM_EmailID: "arvind@tatamotors.com", LM_WebSite: "www.tatamotors.com", LM_GSTIN: "33AAACT1234Z1Z1", LM_PAN_No: "AAACT1234Z", LM_Aadhar_No: "", LM_Bank_Name: "SBI", LM_Branch: "Chennai Main", LM_Account_Name: "Tata Motors Ltd", LM_Account_Number: "10987654321", LM_IFSC_Code: "SBIN0001234", LM_MICRCODEBANK: "", LM_Cus_Remarks: "" },
    { CustomerTypeId: 132, LM_Ledger_Name: "Ashok Leyland", LM_Code: "C-002", LM_Address1: "1 Sardar Patel Rd", LM_Address2: "Guindy", LM_Address3: "", LM_Address4: "", LM_Address5: "", LM_Area: "Chennai", LM_State: "Tamil Nadu", LM_StateCode: "33", LM_Country: "India", LM_PinCode: "600032", LM_Contact_Person: "Ms. Deepa", LM_Phone_Number: "044-28200000", LM_Cell_No: "9876540002", LM_EmailID: "deepa@ashokleyland.com", LM_WebSite: "www.ashokleyland.com", LM_GSTIN: "33AACCA5678B1Z2", LM_PAN_No: "AACCA5678B", LM_Aadhar_No: "", LM_Bank_Name: "HDFC", LM_Branch: "Anna Salai", LM_Account_Name: "Ashok Leyland", LM_Account_Number: "20987654321", LM_IFSC_Code: "HDFC0005678", LM_MICRCODEBANK: "", LM_Cus_Remarks: "" },
    { CustomerTypeId: 131, LM_Ledger_Name: "Mahindra & Mahindra", LM_Code: "C-003", LM_Address1: "Gateway Building", LM_Address2: "Apollo Bunder", LM_Address3: "", LM_Address4: "", LM_Address5: "", LM_Area: "Mumbai", LM_State: "Maharashtra", LM_StateCode: "27", LM_Country: "India", LM_PinCode: "400001", LM_Contact_Person: "Mr. Ravi", LM_Phone_Number: "022-24901441", LM_Cell_No: "9876540003", LM_EmailID: "ravi@mahindra.com", LM_WebSite: "www.mahindra.com", LM_GSTIN: "27AABCM1234E1Z5", LM_PAN_No: "AABCM1234E", LM_Aadhar_No: "", LM_Bank_Name: "ICICI", LM_Branch: "Fort Mumbai", LM_Account_Name: "Mahindra & Mahindra", LM_Account_Number: "30987654321", LM_IFSC_Code: "ICIC0009012", LM_MICRCODEBANK: "", LM_Cus_Remarks: "" },
];

// VehicleMaster — keys: Customer_Id, CustomerName, Vehicle_Model_No_Id, etc.
const demoVehicles = [
    { Customer_Id: 1, CustomerName: "Tata Motors Ltd", Contact_Person: "Mr. Arvind", LM_Address1: "14 Haddows Road", LM_GSTIN: "33AAACT1234Z1Z1", Vehicle_Model_No_Id: "VM001", Model_Sub_Type_Id: "Standard", Vehicle_Name_Id: "Nexon", Serial_No: "1", Vehicle_No: "TN-01-AB-1234", Customer_Vehicle_Count: 1, BOM_Type: "Standard", Model_Row_Id: "", Remarks: "", Status: "Active" },
    { Customer_Id: 2, CustomerName: "Ashok Leyland", Contact_Person: "Ms. Deepa", LM_Address1: "1 Sardar Patel Rd", LM_GSTIN: "33AACCA5678B1Z2", Vehicle_Model_No_Id: "VM002", Model_Sub_Type_Id: "Heavy", Vehicle_Name_Id: "Dost", Serial_No: "1", Vehicle_No: "TN-09-CD-5678", Customer_Vehicle_Count: 1, BOM_Type: "Custom", Model_Row_Id: "", Remarks: "", Status: "Active" },
];

// ReferenceGroupValue — keys: RG_iID, groupName, RGV_vCode, RGV_vDescription, status
const demoReferenceGroupValues = [
    // Department
    { RG_iID: 1, groupName: "Department", RGV_vCode: "D001", RGV_vDescription: "Production", status: "A" },
    { RG_iID: 1, groupName: "Department", RGV_vCode: "D002", RGV_vDescription: "Quality", status: "A" },
    { RG_iID: 1, groupName: "Department", RGV_vCode: "D003", RGV_vDescription: "Sales", status: "A" },
    { RG_iID: 1, groupName: "Department", RGV_vCode: "D004", RGV_vDescription: "Purchase", status: "A" },
    { RG_iID: 1, groupName: "Department", RGV_vCode: "D005", RGV_vDescription: "HR", status: "A" },
    // Designation
    { RG_iID: 2, groupName: "Designation", RGV_vCode: "DG001", RGV_vDescription: "Manager", status: "A" },
    { RG_iID: 2, groupName: "Designation", RGV_vCode: "DG002", RGV_vDescription: "Engineer", status: "A" },
    { RG_iID: 2, groupName: "Designation", RGV_vCode: "DG003", RGV_vDescription: "Supervisor", status: "A" },
    { RG_iID: 2, groupName: "Designation", RGV_vCode: "DG004", RGV_vDescription: "Operator", status: "A" },
    // Company Type
    { RG_iID: 3, groupName: "Company Type", RGV_vCode: "CT001", RGV_vDescription: "Manufacturing", status: "A" },
    { RG_iID: 3, groupName: "Company Type", RGV_vCode: "CT002", RGV_vDescription: "Trading", status: "A" },
    // Customer Type
    { RG_iID: 4, groupName: "Customer Type", RGV_vCode: "CU001", RGV_vDescription: "Domestic", status: "A" },
    { RG_iID: 4, groupName: "Customer Type", RGV_vCode: "CU002", RGV_vDescription: "Export", status: "A" },
    // Supplier Type
    { RG_iID: 5, groupName: "Supplier Type", RGV_vCode: "SU001", RGV_vDescription: "Raw Material", status: "A" },
    { RG_iID: 5, groupName: "Supplier Type", RGV_vCode: "SU002", RGV_vDescription: "Service", status: "A" },
    // Machine Category
    { RG_iID: 6, groupName: "Machine Category", RGV_vCode: "MC001", RGV_vDescription: "CNC", status: "A" },
    { RG_iID: 6, groupName: "Machine Category", RGV_vCode: "MC002", RGV_vDescription: "Lathe", status: "A" },
    { RG_iID: 6, groupName: "Machine Category", RGV_vCode: "MC003", RGV_vDescription: "Milling", status: "A" },
    // Vendor
    { RG_iID: 7, groupName: "Vendor", RGV_vCode: "V001", RGV_vDescription: "Haas Automation", status: "A" },
    { RG_iID: 7, groupName: "Vendor", RGV_vCode: "V002", RGV_vDescription: "DMG Mori", status: "A" },
    // Process Type
    { RG_iID: 8, groupName: "Process Type", RGV_vCode: "PT001", RGV_vDescription: "In-House", status: "A" },
    { RG_iID: 8, groupName: "Process Type", RGV_vCode: "PT002", RGV_vDescription: "Outsource", status: "A" },
    // Team
    { RG_iID: 9, groupName: "Team", RGV_vCode: "T001", RGV_vDescription: "Team A", status: "A" },
    { RG_iID: 9, groupName: "Team", RGV_vCode: "T002", RGV_vDescription: "Team B", status: "A" },
    // UOM
    { RG_iID: 10, groupName: "UOM", RGV_vCode: "U001", RGV_vDescription: "Nos", status: "A" },
    { RG_iID: 10, groupName: "UOM", RGV_vCode: "U002", RGV_vDescription: "Kg", status: "A" },
    { RG_iID: 10, groupName: "UOM", RGV_vCode: "U003", RGV_vDescription: "Mtr", status: "A" },
    // Item Type
    { RG_iID: 12, groupName: "Item Type", RGV_vCode: "IT001", RGV_vDescription: "Raw Material", status: "A" },
    { RG_iID: 12, groupName: "Item Type", RGV_vCode: "IT002", RGV_vDescription: "Finished Good", status: "A" },
    // Currency
    { RG_iID: 16, groupName: "Currency", RGV_vCode: "C001", RGV_vDescription: "INR", status: "A" },
    { RG_iID: 16, groupName: "Currency", RGV_vCode: "C002", RGV_vDescription: "USD", status: "A" },
    // Material Grade
    { RG_iID: 17, groupName: "Material Grade", RGV_vCode: "MG001", RGV_vDescription: "SS304", status: "A" },
    { RG_iID: 17, groupName: "Material Grade", RGV_vCode: "MG002", RGV_vDescription: "EN8", status: "A" },
    // Tax Type
    { RG_iID: 25, groupName: "Tax Type", RGV_vCode: "TT001", RGV_vDescription: "Local", status: "A" },
    { RG_iID: 25, groupName: "Tax Type", RGV_vCode: "TT002", RGV_vDescription: "Interstate", status: "A" },
    // Quotation Type
    { RG_iID: 23, groupName: "Quotation Type", RGV_vCode: "QT001", RGV_vDescription: "Standard", status: "A" },
    { RG_iID: 23, groupName: "Quotation Type", RGV_vCode: "QT002", RGV_vDescription: "Custom", status: "A" },
];

// LedgerMaster — keys: LM_Ledger_Name, LM_Code, LedgerID
const demoLedgerMasters = [
    { LM_Ledger_Name: "GST Output Tax", LM_Code: "LM001", LedgerID: 1 },
    { LM_Ledger_Name: "GST Input Tax", LM_Code: "LM002", LedgerID: 2 },
    { LM_Ledger_Name: "IGST Payable", LM_Code: "LM003", LedgerID: 3 },
];

// TaxMaster — keys: LedgerID, LedgerName, TM_Tax_Percent, TM_CGST_Tax, etc.
const demoTaxMasters = [
    { LedgerID: 1, LedgerName: "GST Output Tax", TM_Tax_Percent: 18, TM_CGST_Tax: 9, TM_SGST_Tax: 9, TM_IGST_Tax: 18, TM_PCGST: 9, TM_PSGST: 9, TM_PIGST: 18, TM_SCGST: 9, TM_SSGST: 9, TM_SIGST: 18 },
    { LedgerID: 2, LedgerName: "GST Input Tax", TM_Tax_Percent: 12, TM_CGST_Tax: 6, TM_SGST_Tax: 6, TM_IGST_Tax: 12, TM_PCGST: 6, TM_PSGST: 6, TM_PIGST: 12, TM_SCGST: 6, TM_SSGST: 6, TM_SIGST: 12 },
    { LedgerID: 1, LedgerName: "GST Output Tax", TM_Tax_Percent: 5, TM_CGST_Tax: 2.5, TM_SGST_Tax: 2.5, TM_IGST_Tax: 5, TM_PCGST: 2.5, TM_PSGST: 2.5, TM_PIGST: 5, TM_SCGST: 2.5, TM_SSGST: 2.5, TM_SIGST: 5 },
];

// Users — keys: UserName, FirstName, LastName, EmailId, Gender, MobileNo, Status, RoleId, RoleName
const demoUsers = [
    { UserName: "admin", FirstName: "Admin", LastName: "User", EmailId: "admin@velson.com", Gender: "Male", MobileNo: "9876543210", Status: "Active", RoleId: 1, RoleName: "SuperAdmin" },
    { UserName: "manager1", FirstName: "Rajesh", LastName: "Kumar", EmailId: "rajesh@velson.com", Gender: "Male", MobileNo: "9876543211", Status: "Active", RoleId: 3, RoleName: "Admin" },
    { UserName: "user1", FirstName: "Priya", LastName: "Sharma", EmailId: "priya@velson.com", Gender: "Female", MobileNo: "9876543212", Status: "Active", RoleId: 2, RoleName: "User" },
];

// Roles — keys: RoleName, Status
const demoRoles = [
    { RoleName: "SuperAdmin", Status: "Active" },
    { RoleName: "User", Status: "Active" },
    { RoleName: "Admin", Status: "Active" },
];

// Menus — keys: MenuName, MenuOrder, Status
const demoMenus = [
    { MenuName: "Dashboard", MenuOrder: 1, Status: "Active" },
    { MenuName: "Masters", MenuOrder: 2, Status: "Active" },
    { MenuName: "Inventory", MenuOrder: 3, Status: "Active" },
    { MenuName: "Sales", MenuOrder: 4, Status: "Active" },
    { MenuName: "Accounting", MenuOrder: 5, Status: "Active" },
    { MenuName: "Quality Control", MenuOrder: 6, Status: "Active" },
    { MenuName: "Configuration", MenuOrder: 7, Status: "Active" },
];

// QCCheckMethod — keys: CM_vCode, CM_vName, CM_vDescription, CM_cStatus
const demoQCCheckMethods = [
    { CM_vCode: "QCM001", CM_vName: "Visual Inspection", CM_vDescription: "Visual check for surface defects", CM_cStatus: "A" },
    { CM_vCode: "QCM002", CM_vName: "Dimensional Check", CM_vDescription: "Measurement using gauges", CM_cStatus: "A" },
    { CM_vCode: "QCM003", CM_vName: "Hardness Test", CM_vDescription: "Rockwell/Brinell hardness testing", CM_cStatus: "A" },
];

// QCInspectionChar — keys: Code, Name, Description, Status
const demoQCInspectionChars = [
    { Code: "IC001", Name: "Surface Finish", Description: "Surface roughness measurement", Status: "A" },
    { Code: "IC002", Name: "Roundness", Description: "Circularity tolerance check", Status: "A" },
    { Code: "IC003", Name: "Hardness", Description: "Material hardness value", Status: "A" },
];

// SystemInfo — keys: IPAddress, MACAddress, DeviceName, USERNAME, DEPT
const demoSystemInfo = [
    { IPAddress: "192.168.1.100", MACAddress: "AA:BB:CC:DD:EE:01", DeviceName: "WORK-PC-01", USERNAME: "admin", DEPT: "IT" },
    { IPAddress: "192.168.1.101", MACAddress: "AA:BB:CC:DD:EE:02", DeviceName: "PROD-PC-01", USERNAME: "rajesh", DEPT: "Production" },
];

// ── SALES ────────────────────────────────────────────────────────
const demoQuotations = [
    { PO_No: "25-26/Q00001", PODate: "2025-04-15", CustomerName: "Tata Motors Ltd", Customer_ID: 1, TaxType: "Local", Net_Amt: 125000.00, Status: "Open" },
    { PO_No: "25-26/Q00002", PODate: "2025-04-18", CustomerName: "Ashok Leyland", Customer_ID: 2, TaxType: "Interstate", Net_Amt: 85000.00, Status: "Confirmed" },
    { PO_No: "25-26/Q00003", PODate: "2025-05-01", CustomerName: "Mahindra & Mahindra", Customer_ID: 3, TaxType: "Local", Net_Amt: 53100.00, Status: "Open" },
];

// QuotationDetails columns: PO_NO, Item_Code, Item_Name, Qty, Net_Amt
const demoQuotationDetails = [
    { PO_NO: "QT-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",   UOM: "KG",  Qty: 500,  Unit_Price: 62, GST_Per: 18, GST_Amt: 5580,  Net_Amt: 36580, Statsu: "Active", Created_Date: "2025-01-10", Currency: "INR", Exchange_Rate_Price: 1 },
    { PO_NO: "QT-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D",  UOM: "KG",  Qty: 1000, Unit_Price: 61, GST_Per: 18, GST_Amt: 10980, Net_Amt: 71980, Statsu: "Active", Created_Date: "2025-01-10", Currency: "INR", Exchange_Rate_Price: 1 },
    { PO_NO: "QT-2025-002", Item_Code: "ITM003", Item_Name: "MS Hollow Pipe 2inch", UOM: "MTR", Qty: 200,  Unit_Price: 95, GST_Per: 18, GST_Amt: 3420,  Net_Amt: 22420, Statsu: "Active", Created_Date: "2025-01-15", Currency: "INR", Exchange_Rate_Price: 1 },
];

// QuotationFileUpload columns: Quotation_No, Customer_Name, Item_Name, File_Name, Status
const demoQuotationFileUploads = [
    { Quotation_No: "QT-2025-001", Customer_Name: "ABC Engineering", Item_Name: "TMT Bar 8mm Fe500D",  File_Name: "QT-2025-001-drawing.pdf",  Status: "A", Industry_Type: "Steel", Quotation_Date: "2025-01-10", Created_Date: "2025-01-10", Created_By: "EMP003" },
    { Quotation_No: "QT-2025-002", Customer_Name: "XYZ Fabricators", Item_Name: "MS Hollow Pipe 2inch",File_Name: "QT-2025-002-spec.pdf",      Status: "A", Industry_Type: "Steel", Quotation_Date: "2025-01-15", Created_Date: "2025-01-15", Created_By: "EMP003" },
];

// QuotationMaster columns: BILLNO, CUST_NAME, BILLDATE, BILL_AMT, Quotation_Status
const demoQuotationMasters = [
    { BILLNO: "QT-2025-001", CUST_NAME: "ABC Engineering", BILLDATE: "2025-01-10", BILL_AMT: 147500, Quotation_Status: "Active", STATUS: "A", BILL_MODE: "Credit", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-10", TAX_GROSSAMT: 125000, TAXABLE_AMT: 125000, CGST_AMT: 11250, SGST_AMT: 11250, TOTAL_TAX: 22500, TAX_AMT: 22500, TAX_YESNO: "Yes", TAX_REVYES: "No", BRANCHID: "VELSON" },
    { BILLNO: "QT-2025-002", CUST_NAME: "XYZ Fabricators", BILLDATE: "2025-01-15", BILL_AMT: 100300, Quotation_Status: "Active", STATUS: "A", BILL_MODE: "Credit", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-15", TAX_GROSSAMT: 85000, TAXABLE_AMT: 85000, CGST_AMT: 7650, SGST_AMT: 7650, TOTAL_TAX: 15300, TAX_AMT: 15300, TAX_YESNO: "Yes", TAX_REVYES: "No", BRANCHID: "VELSON" },
];

// QuotationTran columns: BILLNO, Item_name, Qty, NET_AMT, Batch
const demoQuotationTrans = [
    { BILLNO: "QT-2025-001", Item_name: "TMT Bar 8mm Fe500D",  UNIT: "KG",  Qty: 500,  NET_RATE: 62, NET_AMT: 36580, TAXABLE_AMT: 31000, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 2790, SGST_TAX_AMT: 2790, TOTAL_TAX: 5580, TOT_AMT: 31000, STATUS: "A", BILL_MODE: "Credit", BILLDATE: "2025-01-10", Batch: "B001", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-10" },
    { BILLNO: "QT-2025-001", Item_name: "TMT Bar 12mm Fe500D", UNIT: "KG",  Qty: 1000, NET_RATE: 61, NET_AMT: 71980, TAXABLE_AMT: 61000, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 5490, SGST_TAX_AMT: 5490, TOTAL_TAX: 10980,TOT_AMT: 61000, STATUS: "A", BILL_MODE: "Credit", BILLDATE: "2025-01-10", Batch: "B002", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-10" },
];

// QuotationSalesMaster columns: BILLNO, CUST_NAME, BILLDATE, BILL_AMT, Stock_Reduce
const demoQuotationSalesMasters = [
    { BILLNO: "SO-2025-001", CUST_NAME: "ABC Engineering", BILLDATE: "2025-01-28", BILL_AMT: 147500, Stock_Reduce: "Yes", STATUS: "A", BILL_MODE: "Credit", Order_No: "QT-2025-001", GSTNO: "33AABCA1234E1Z1", STATE: "Tamil Nadu", STATECODE: "33", ADDR1: "No.5, Industrial Estate, Salem", DCUST_NAME: "ABC Engineering", Delivery_Place: "Salem", TRANSPORT: "Ravi Transport", COMMODITY: "Steel", TAX_GROSSAMT: 125000, TAXABLE_AMT: 125000, CGST_AMT: 11250, SGST_AMT: 11250, TOTAL_TAX: 22500, TAX_AMT: 22500, TOTAL_DISC: 0, Round_Off: 0, CARTAGE_AMT: 0, SERVICE_AMT: 0, UNLOAD_AMT: 0, ADD_AMT: 0, DIS_AMT: 0, LIABILITY_VALUE: 0, TAX_YESNO: "Yes", TAX_REVYES: "No", TAX_TYPE: "GST", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-28", BRANCHID: "VELSON" },
];

// QuotationSalesTran columns: BILLNO, Item_name, Qty, NET_AMT, Barcode
const demoQuotationSalesTrans = [
    { BILLNO: "SO-2025-001", Item_name: "TMT Bar 8mm Fe500D",  UNIT: "KG",  Qty: 500,  NET_RATE: 62, NET_AMT: 36580, TAXABLE_AMT: 31000, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 2790, SGST_TAX_AMT: 2790, TOTAL_TAX: 5580,  TOT_AMT: 31000, STATUS: "A", BILL_MODE: "Credit", BILLDATE: "2025-01-28", Barcode: "BC-ITM001-001", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-28" },
    { BILLNO: "SO-2025-001", Item_name: "TMT Bar 12mm Fe500D", UNIT: "KG",  Qty: 1000, NET_RATE: 61, NET_AMT: 71980, TAXABLE_AMT: 61000, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 5490, SGST_TAX_AMT: 5490, TOTAL_TAX: 10980, TOT_AMT: 61000, STATUS: "A", BILL_MODE: "Credit", BILLDATE: "2025-01-28", Barcode: "BC-ITM002-001", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-28" },
];

// QuoteRequest columns: Req_No, Dept_Name, Item_Name, Qty, Approval_Status
const demoQuoteRequests = [
    { Req_No: "QR-2025-001", Dept_Name: "Production", Item_Name: "TMT Bar 8mm Fe500D",  Item_Code: "ITM001", UOM: "KG",  Qty: 500,  Req_Date: "2025-01-05", Required_Date: "2025-01-20", Status: "A", Approval_Status: "Approved", Created_Date: "2025-01-05", Created_by: "EMP004", Request_User: "Karthik Raj", Purpose: "Production requirement" },
    { Req_No: "QR-2025-002", Dept_Name: "Maintenance", Item_Name: "Grinding Wheel 7inch",Item_Code: "ITM004", UOM: "NOS", Qty: 20,   Req_Date: "2025-01-20", Required_Date: "2025-02-01", Status: "A", Approval_Status: "Pending",  Created_Date: "2025-01-20", Created_by: "EMP001", Request_User: "Rajesh Kumar",  Purpose: "Maintenance stock" },
];

// QuoteRequestDetails columns: Req_No, Item_Code, Item_Name, Qty, Total_Amount
const demoQuoteRequestDetails = [
    { Req_No: "QR-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",   UOM: "KG",  Qty: 500, Rate: 62,  Total_Amount: 31000, Status: "Active", Created_Date: "2025-01-05", Specification: "Fe500D grade", Remarks: "" },
    { Req_No: "QR-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D",  UOM: "KG",  Qty: 1000,Rate: 61,  Total_Amount: 61000, Status: "Active", Created_Date: "2025-01-05", Specification: "Fe500D grade", Remarks: "" },
    { Req_No: "QR-2025-002", Item_Code: "ITM004", Item_Name: "Grinding Wheel 7inch", UOM: "NOS", Qty: 20,  Rate: 55,  Total_Amount: 1100,  Status: "Active", Created_Date: "2025-01-20", Specification: "7 inch",       Remarks: "Specify brand" },
];

// SalesMaster columns: BILLNO, CUST_NAME, BILLDATE, BILL_AMT, STATUS
const demoSalesMasters = [
    { BILLNO: "SI-2025-001", Order_No: "SO-2025-001", BILL_MODE: "Credit", STATUS: "A", BILLDATE: "2025-02-20", CUST_NAME: "ABC Engineering", PHONE: "9876540001", GSTNO: "33AABCA1234E1Z1", STATE: "Tamil Nadu", STATECODE: "33", ADDR1: "No. 5, Industrial Estate", ADDR2: "Salem", DCUST_NAME: "ABC Engineering Works", Delivery_Place: "Salem", TRANSPORT: "Ravi Transport", LR_NO: "LR-2025-001", Dc_NO: "DC-2025-001", Remarks: "Urgent delivery", COMMODITY: "Steel", Stock_Reduce: "Yes", CREATED_BY: "EMP003", CREATED_DATE: "2025-02-20", TAX_GROSSAMT: 125000, TAXABLE_AMT: 125000, CGST_AMT: 11250, SGST_AMT: 11250, IGST_AMT: 0, TOTAL_TAX: 22500, TAX_AMT: 22500, BILL_AMT: 147500, TOTAL_DISC: 0, Round_Off: 0, TAX_YESNO: "Yes", TAX_REVYES: "No", TAX_TYPE: "GST", BRANCHID: "VELSON" },
    { BILLNO: "SI-2025-002", Order_No: "SO-2025-002", BILL_MODE: "Cash",   STATUS: "A", BILLDATE: "2025-02-25", CUST_NAME: "XYZ Fabricators",  PHONE: "9876540003", GSTNO: "33AABCX5678F2Z2", STATE: "Tamil Nadu", STATECODE: "33", ADDR1: "78, Second Street",        ADDR2: "Salem", DCUST_NAME: "XYZ Fabricators",        Delivery_Place: "Salem",                               TRANSPORT: "Kumar Logistics",  LR_NO: "LR-2025-002", Dc_NO: "",              Remarks: "",              COMMODITY: "Steel Pipes", Stock_Reduce: "Yes", CREATED_BY: "EMP003", CREATED_DATE: "2025-02-25", TAX_GROSSAMT: 85000,  TAXABLE_AMT: 85000,  CGST_AMT: 7650,  SGST_AMT: 7650,  IGST_AMT: 0, TOTAL_TAX: 15300, TAX_AMT: 15300, BILL_AMT: 100300, TOTAL_DISC: 0, Round_Off: 0, TAX_YESNO: "Yes", TAX_REVYES: "No", TAX_TYPE: "GST", BRANCHID: "VELSON" },
];

// SalesTran columns: BILLNO, Item_name, Qty, NET_AMT, Barcode
const demoSalesTrans = [
    { BILLNO: "SI-2025-001", Item_name: "TMT Bar 8mm Fe500D",  UNIT: "KG",  Qty: 500,  NET_RATE: 62, NET_AMT: 36580, TAXABLE_AMT: 31000, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 2790, SGST_TAX_AMT: 2790, TOTAL_TAX: 5580,  TOT_AMT: 31000, STATUS: "A", BILL_MODE: "Credit", BILLDATE: "2025-02-20", Barcode: "BC-ITM001-001", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-02-20" },
    { BILLNO: "SI-2025-001", Item_name: "TMT Bar 12mm Fe500D", UNIT: "KG",  Qty: 1000, NET_RATE: 61, NET_AMT: 71980, TAXABLE_AMT: 61000, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 5490, SGST_TAX_AMT: 5490, TOTAL_TAX: 10980, TOT_AMT: 61000, STATUS: "A", BILL_MODE: "Credit", BILLDATE: "2025-02-20", Barcode: "BC-ITM002-001", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-02-20" },
];

// SalesPlan columns: Customer_Name, Product_Name, Plan_Date, Delivery_Status, Critical
const demoSalesPlans = [
    { ID: "SP-001", Customer_Name: "ABC Engineering", Product_Name: "TMT Bar 8mm Fe500D",  Plan_Date: "2025-01-01", Delivery: "2025-02-28", Delivery_Status: "Delivered", Critical: "No",  Status: "A", Qty: 500,  Unit: "KG",  Product_Type: "Steel",   Pay_Type: "Credit", Created_Date: "2025-01-01", Created_by: "EMP003" },
    { ID: "SP-002", Customer_Name: "XYZ Fabricators", Product_Name: "MS Hollow Pipe 2inch",Plan_Date: "2025-02-01", Delivery: "2025-03-15", Delivery_Status: "Pending",   Critical: "Yes", Status: "A", Qty: 200,  Unit: "MTR", Product_Type: "Steel",   Pay_Type: "Cash",   Created_Date: "2025-02-01", Created_by: "EMP003" },
];

// BillsOut columns: BILLNO, Narration1 (REMARK), REFBILL_DATE, BILL_AMT, STATUS
const demoBillsOut = [
    { BILLNO: "BO-2025-001", REFBILL_NO: "SI-2025-001", BILLDATE: "2025-02-20", BILL_AMT: 147500, STATUS: "A", BILL_STATUS: "Unpaid", REMARK: "Balance pending", CRAMT: 100000, DBAMT: 147500, PAIDAMT: 100000, VOURTYPE: "Sales", PAYTYPE: "Credit", CREATED_BY: "EMP002", CREATED_DATE: "2025-02-20" },
    { BILLNO: "BO-2025-002", REFBILL_NO: "SI-2025-002", BILLDATE: "2025-02-25", BILL_AMT: 100300, STATUS: "A", BILL_STATUS: "Paid",   REMARK: "Payment received",CRAMT: 100300, DBAMT: 100300, PAIDAMT: 100300, VOURTYPE: "Sales", PAYTYPE: "Cash",   CREATED_BY: "EMP002", CREATED_DATE: "2025-02-25" },
];

// DCSalesMaster columns: BILLNO, CUST_NAME, BILLDATE, BILL_AMT, DC_Status
const demoDCSalesMasters = [
    { BILLNO: "DSM-2025-001", CUST_NAME: "ABC Engineering", BILLDATE: "2025-02-18", BILL_AMT: 147500, DC_Status: "Delivered", STATUS: "A", BILL_MODE: "Credit", Order_No: "SI-2025-001", Dc_NO: "DC-2025-001", GSTNO: "33AABCA1234E1Z1", STATE: "Tamil Nadu", STATECODE: "33", ADDR1: "No.5, Industrial Estate, Salem", DCUST_NAME: "ABC Engineering", Delivery_Place: "Salem", TRANSPORT: "Ravi Transport", LR_NO: "LR-2025-001", COMMODITY: "Steel", TAX_GROSSAMT: 125000, TAXABLE_AMT: 125000, CGST_AMT: 11250, SGST_AMT: 11250, TOTAL_TAX: 22500, TAX_AMT: 22500, TOTAL_DISC: 0, Round_Off: 0, TAX_YESNO: "Yes", TAX_REVYES: "No", TAX_TYPE: "GST", CREATED_BY: "EMP003", CREATED_DATE: "2025-02-18", BRANCHID: "VELSON" },
];

// DCSalesTran columns: BILLNO, Item_name, Qty, NET_AMT, DC_Status
const demoDCSalesTrans = [
    { BILLNO: "DSM-2025-001", Item_name: "TMT Bar 8mm Fe500D",  UNIT: "KG",  Qty: 500,  NET_RATE: 62, NET_AMT: 36580, TAXABLE_AMT: 31000, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 2790, SGST_TAX_AMT: 2790, TOTAL_TAX: 5580,  TOT_AMT: 31000, STATUS: "A", DC_Status: "Delivered", BILL_MODE: "Credit", BILLDATE: "2025-02-18", Barcode: "BC-ITM001-001", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-02-18" },
    { BILLNO: "DSM-2025-001", Item_name: "TMT Bar 12mm Fe500D", UNIT: "KG",  Qty: 1000, NET_RATE: 61, NET_AMT: 71980, TAXABLE_AMT: 61000, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 5490, SGST_TAX_AMT: 5490, TOTAL_TAX: 10980, TOT_AMT: 61000, STATUS: "A", DC_Status: "Delivered", BILL_MODE: "Credit", BILLDATE: "2025-02-18", Barcode: "BC-ITM002-001", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-02-18" },
];

// ConformationMaster columns (not standard — use Row_Id, Conformation_No, Booking_No, Customer_Name, Conformation_status)
const demoConformationMasters = [
    { Conformation_No: "CF-2025-001", Booking_No: "BM-2025-001", Customer_Code: "CUST001", Customer_Name: "ABC Engineering", Vehicle_No: "TN09XX1234", Serial_No: "SNO-001", Booking_Date: "2025-01-27", Status: "A", Booking_Status: "Closed", Conformation_status: "Open", Approval_Status: "Approved", Approval_Date: "2025-01-27", Approval_By: "EMP001", Created_Date: "2025-01-27", Created_By: "EMP003" },
];

const demoConformationDetails = [
    { Conformation_No: "CF-2025-001", Booking_No: "BM-2025-001", Display_No: "1", Customer_Name: "ABC Engineering", Item_Name: "TMT Bar 8mm Fe500D",  confomation_Qty: "500",  Status: "A", Service_Status: "Pending", Created_By: "EMP003", Created_Date: "2025-01-27" },
    { Conformation_No: "CF-2025-001", Booking_No: "BM-2025-001", Display_No: "2", Customer_Name: "ABC Engineering", Item_Name: "TMT Bar 12mm Fe500D", confomation_Qty: "1000", Status: "A", Service_Status: "Pending", Created_By: "EMP003", Created_Date: "2025-01-27" },
];

const demoConformationFinalMasters = [
    { Conformation_No: "FCF-2025-001", Booking_No: "BM-2025-001", Customer_Code: "CUST001", Customer_Name: "ABC Engineering", Serial_No: "SNO-001", Booking_Date: "2025-01-28", Status: "A", Conformation_status: "Open", Approval_Status: "Approved", Approval_Date: "2025-01-28", Approval_By: "EMP001", Created_Date: "2025-01-28", Created_By: "EMP003", Remarks: "Final confirmation done" },
];

const demoConformationFinalDetails = [
    { Conformation_No: "FCF-2025-001", Booking_No: "BM-2025-001", Display_No: "1", Customer_Name: "ABC Engineering", Item_Name: "TMT Bar 8mm Fe500D",  confomation_Qty: "500",  Status: "A", Service_Status: "Pending", Created_By: "EMP003", Created_Date: "2025-01-28" },
    { Conformation_No: "FCF-2025-001", Booking_No: "BM-2025-001", Display_No: "2", Customer_Name: "ABC Engineering", Item_Name: "TMT Bar 12mm Fe500D", confomation_Qty: "1000", Status: "A", Service_Status: "Pending", Created_By: "EMP003", Created_Date: "2025-01-28" },
];

// ── PURCHASE ─────────────────────────────────────────────────────
// PurchaseRequest cols: Req_No, Item_Name, Dept_Name, Qty, Approval_Status
const demoPurchaseRequests = [
    { Req_No: "PR-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",   Dept_Name: "Production",  UOM: "KG",  Qty: 500,  Req_Date: "2025-01-02", Required_Date: "2025-01-15", Status: "A", Approval_Status: "Approved", Created_Date: "2025-01-02", Created_by: "EMP004", Request_User: "Karthik Raj",  Purpose: "Production use" },
    { Req_No: "PR-2025-002", Item_Code: "ITM004", Item_Name: "Grinding Wheel 7inch", Dept_Name: "Maintenance", UOM: "NOS", Qty: 20,   Req_Date: "2025-01-10", Required_Date: "2025-01-20", Status: "A", Approval_Status: "Pending",  Created_Date: "2025-01-10", Created_by: "EMP001", Request_User: "Rajesh Kumar", Purpose: "Maintenance" },
    { Req_No: "PR-2025-003", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D",  Dept_Name: "Production",  UOM: "KG",  Qty: 1000, Req_Date: "2025-02-01", Required_Date: "2025-02-10", Status: "A", Approval_Status: "Approved", Created_Date: "2025-02-01", Created_by: "EMP004", Request_User: "Karthik Raj",  Purpose: "Production batch 2" },
];

// PurchaseOrder cols: PO_No, Supplier_Name, PO_Date, Net_Amt, PO_Status
const demoPurchaseOrders = [
    { PO_No: "PO-2025-001", Supplier_Name: "Tata Steel Dealers",    PO_Date: "2025-01-05", Net_Amt: 129800, PO_Status: "Open", Approval_Status: "Pending", Statsu: "A", Purchase_Req_No: "PR-2025-001", Contact_No: "9111222001", Supplier_Address: "Steel Market, Salem", Total_Before_Disc: 110000, Taxable_Amount: 110000, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 9900, SGST_Amt: 9900, Net_Amt: 129800, Payment_Terms: "30 days credit", Delivery_Date: "2025-01-15", Created_Date: "2025-01-05", Created_by: "EMP004" },
    { PO_No: "PO-2025-002", Supplier_Name: "JSW Steel Distributors",PO_Date: "2025-01-12", Net_Amt: 70800,  PO_Status: "Open", Approval_Status: "Pending", Statsu: "A", Purchase_Req_No: "PR-2025-002", Contact_No: "9111222002", Supplier_Address: "Omalur Road, Salem",  Total_Before_Disc: 60000,  Taxable_Amount: 60000,  CGST_Per: 9, SGST_Per: 9, CGST_Amt: 5400, SGST_Amt: 5400, Net_Amt: 70800,  Payment_Terms: "Advance",       Delivery_Date: "2025-01-22", Created_Date: "2025-01-12", Created_by: "EMP004" },
    { PO_No: "PO-2025-003", Supplier_Name: "Stanley Tools India",   PO_Date: "2025-02-05", Net_Amt: 16800,  PO_Status: "Open", Approval_Status: "Pending", Statsu: "A", Purchase_Req_No: "PR-2025-003", Contact_No: "9111222003", Supplier_Address: "Industrial Area, Chennai", Total_Before_Disc: 15000, Taxable_Amount: 15000, CGST_Per: 6, SGST_Per: 6, CGST_Amt: 900, SGST_Amt: 900, Net_Amt: 16800, Payment_Terms: "Spot",     Delivery_Date: "2025-02-12", Created_Date: "2025-02-05", Created_by: "EMP004" },
];

const demoPurchaseOrders2 = [
    { PO_No: "PO2-2025-001", Supplier_Name: "Bosch Hardware Pvt Ltd", PO_Date: "2025-01-08", Net_Amt: 28000, PO_Status: "Open", Approval_Status: "Pending", Statsu: "A", Contact_No: "9111222004", Supplier_Address: "Mount Road, Chennai", Total_Before_Disc: 25000, Taxable_Amount: 25000, CGST_Per: 6, SGST_Per: 6, CGST_Amt: 1500, SGST_Amt: 1500, Payment_Terms: "30 days", Delivery_Date: "2025-01-20", Created_Date: "2025-01-08", Created_by: "EMP004" },
];

// PurchaseOrderDetails cols: PO_NO, Item_Name, Qty, Net_Amt, Statsu
const demoPurchaseOrderDetails = [
    { PO_NO: "PO-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",   HSN_Code: "72142000", UOM: "KG",  Qty: 500,  Unit_Price: 55, GST_Per: 18, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 2475, SGST_Amt: 2475, Net_Amt: 32450, Statsu: "A", PO_Date: "2025-01-05", Created_Date: "2025-01-05", Created_by: "EMP004" },
    { PO_NO: "PO-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D",  HSN_Code: "72142000", UOM: "KG",  Qty: 1500, Unit_Price: 54, GST_Per: 18, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 7290, SGST_Amt: 7290, Net_Amt: 95580, Statsu: "A", PO_Date: "2025-01-05", Created_Date: "2025-01-05", Created_by: "EMP004" },
    { PO_NO: "PO-2025-002", Item_Code: "ITM003", Item_Name: "MS Hollow Pipe 2inch", HSN_Code: "73063000", UOM: "MTR", Qty: 200,  Unit_Price: 85, GST_Per: 18, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 1530, SGST_Amt: 1530, Net_Amt: 20060, Statsu: "A", PO_Date: "2025-01-12", Created_Date: "2025-01-12", Created_by: "EMP004" },
];

const demoPurchaseOrderDetails2 = [
    { PO_NO: "PO2-2025-001", Item_Code: "ITM004", Item_Name: "Grinding Wheel 7inch", HSN_Code: "68042100", UOM: "NOS", Qty: 50, Unit_Price: 45, GST_Per: 12, CGST_Per: 6, SGST_Per: 6, CGST_Amt: 135, SGST_Amt: 135, Net_Amt: 2520, Statsu: "A", PO_Date: "2025-01-08", Created_Date: "2025-01-08", Created_by: "EMP004" },
];

// PurchaseFreight cols: PO_NO, Freight_Name, Amount, Status
const demoPurchaseFreight = [
    { PO_NO: "PO-2025-001", Freight_Name: "Ravi Transport Services", Amount: 3500, Percentage: 0, Status: "A", Created_Date: "2025-01-15", Created_by: "EMP004" },
    { PO_NO: "PO-2025-002", Freight_Name: "Kumar Logistics",         Amount: 2000, Percentage: 0, Status: "A", Created_Date: "2025-01-22", Created_by: "EMP004" },
];

// PurchasePriceLink cols: PL_Supplier_id, PL_Item_id, PL_Rate, PL_Status
const demoPurchasePriceLink = [
    { PL_Supplier_id: "SUP001", PL_Item_id: "ITM001", PL_Rate: 55, PL_From_Dt: "2025-01-01", PL_To_Dt: "2025-03-31", PL_Status: "A", PL_CreatedDate: "2025-01-01", PL_User: "EMP004" },
    { PL_Supplier_id: "SUP001", PL_Item_id: "ITM002", PL_Rate: 54, PL_From_Dt: "2025-01-01", PL_To_Dt: "2025-03-31", PL_Status: "A", PL_CreatedDate: "2025-01-01", PL_User: "EMP004" },
    { PL_Supplier_id: "SUP002", PL_Item_id: "ITM003", PL_Rate: 85, PL_From_Dt: "2025-01-01", PL_To_Dt: "2025-06-30", PL_Status: "A", PL_CreatedDate: "2025-01-01", PL_User: "EMP004" },
];

// POMaster cols: PO_vID, PO_vRemarks, PO_vStatus
const demoPOMasters = [
    { PO_vID: "POM-2025-001", PO_vRemarks: "Annual steel supply contract", PO_vStatus: "A", PO_vCreated_By: "EMP004", PO_vCreated_Date: "2025-01-01", PO_vM_Despatch: "Ex-Works", PO_vDelivery: "30 days", PO_vPayment_Terms: "Net 30", PO_vFreight: "Supplier" },
];

// POOrder cols: PO_PO_NO, PO_Invoice_No, PO_Date, PO_Status
const demoPOOrders = [
    { PO_PO_NO: "POO-2025-001", PO_Invoice_No: "INV-TAT-001", PO_Date: "2025-01-05", PO_Invoice_Date: "2025-01-14", PO_Status: "A", PO_Created_Date: "2025-01-05", PO_TransID: "TRANS-001", PO_Supllier_Id: "SUP001", PO_CreatedBy: "EMP004" },
];

// POOrderDetails cols: POD_Item_Name, POD_Qty, POD_Rate, POD_Status
const demoPOOrderDetails = [
    { POD_Item_Name: "TMT Bar 8mm Fe500D",  POD_Rate: 55, POD_UOM: "KG",  POD_Qty: 500,  POD_Status: "A", POD_Created_By: "EMP004", POD_Created_Date: "2025-01-05" },
    { POD_Item_Name: "TMT Bar 12mm Fe500D", POD_Rate: 54, POD_UOM: "KG",  POD_Qty: 1500, POD_Status: "A", POD_Created_By: "EMP004", POD_Created_Date: "2025-01-05" },
];

// GateEntry cols: Vou_No, Supplier_Name, PO_No, GRN_Status, Statsu
const demoGateEntries = [
    { Vou_No: "GE-2025-001", Supplier_Name: "Tata Steel Dealers",    PO_No: "PO-2025-001", Invoice_No: "INV-TAT-001", Vou_Date: "2025-01-15", GRN_Status: "Done",    Statsu: "A", Vehicle_Name: "TN41CD5678", Carrier_Name: "Ravi Transport", GRN_No: "GRN-2025-001", Supplier_Address: "Steel Market, Salem",    Created_Date: "2025-01-15", Created_by: "EMP001" },
    { Vou_No: "GE-2025-002", Supplier_Name: "JSW Steel Distributors",PO_No: "PO-2025-002", Invoice_No: "INV-JSW-001", Vou_Date: "2025-01-22", GRN_Status: "Done",    Statsu: "A", Vehicle_Name: "TN11EF9012", Carrier_Name: "Kumar Logistics", GRN_No: "GRN-2025-002", Supplier_Address: "Omalur Road, Salem",      Created_Date: "2025-01-22", Created_by: "EMP001" },
];

// GateEntryDetails cols: Vou_No, Item_Name, Qty, Net_Amt, GRN_Status
const demoGateEntryDetails = [
    { Vou_No: "GE-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",   HSN_Code: "72142000", UOM: "KG",  Qty: 500,  Unit_Price: 55, Net_Amt: 32450, GRN_Status: "Done", Statsu: "A", PO_No: "PO-2025-001", Created_Date: "2025-01-15", Created_by: "EMP001" },
    { Vou_No: "GE-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D",  HSN_Code: "72142000", UOM: "KG",  Qty: 1500, Unit_Price: 54, Net_Amt: 95580, GRN_Status: "Done", Statsu: "A", PO_No: "PO-2025-001", Created_Date: "2025-01-15", Created_by: "EMP001" },
    { Vou_No: "GE-2025-002", Item_Code: "ITM003", Item_Name: "MS Hollow Pipe 2inch", HSN_Code: "73063000", UOM: "MTR", Qty: 200,  Unit_Price: 85, Net_Amt: 20060, GRN_Status: "Done", Statsu: "A", PO_No: "PO-2025-002", Created_Date: "2025-01-22", Created_by: "EMP001" },
];

// GRNEntry cols: GRN_No, Supplier_Name, PO_No, Net_Amt, Status
const demoGRNEntries = [
    { GRN_No: "GRN-2025-001", Supplier_Name: "Tata Steel Dealers",    PO_No: "PO-2025-001", Invoice_No: "INV-TAT-001", Gate_Entry_No: "GE-2025-001", GRN_Date: "2025-01-15", Invoice_Date: "2025-01-14", PO_Date: "2025-01-05", Net_Amt: 129800, Status: "A", Approval_Status: "Pending", PO_Status: "Open", Bill_Amt: 129800, Tax_Amt: 19800, Taxable_Amount: 110000, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 9900, SGST_Amt: 9900, Supplier_Address: "Steel Market, Salem", Desc_Per: 0, Inward_Type: "Purchase", QC_Type: "QUALITY", Created_Date: "2025-01-15", Created_by: "EMP001" },
    { GRN_No: "GRN-2025-002", Supplier_Name: "JSW Steel Distributors",PO_No: "PO-2025-002", Invoice_No: "INV-JSW-001", Gate_Entry_No: "GE-2025-002", GRN_Date: "2025-01-22", Invoice_Date: "2025-01-21", PO_Date: "2025-01-12", Net_Amt: 70800,  Status: "A", Approval_Status: "Pending", PO_Status: "Open", Bill_Amt: 70800,  Tax_Amt: 10800, Taxable_Amount: 60000,  CGST_Per: 9, SGST_Per: 9, CGST_Amt: 5400, SGST_Amt: 5400, Supplier_Address: "Omalur Road, Salem",  Desc_Per: 0, Inward_Type: "Purchase", QC_Type: "VISUAL",   Created_Date: "2025-01-22", Created_by: "EMP001" },
];

// GRNEntryDetails cols: GRN_No, Item_Name, Qty, Net_Amt, QC_Status
const demoGRNEntryDetails = [
    { GRN_No: "GRN-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",  HSN_Code: "72142000", UOM: "KG",  Order_Qty: 500,  Qty: 500,  QC_OK_Qty: 500,  QC_Reject_Qty: 0,  Unit_Price: 55, Net_Amt: 32450, GST_Per: 18, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 2475, SGST_Amt: 2475, Status: "A", QC_Status: "Pending", PO_NO: "PO-2025-001", GRN_Date: "2025-01-15", Created_Date: "2025-01-15", Created_by: "EMP001" },
    { GRN_No: "GRN-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D", HSN_Code: "72142000", UOM: "KG",  Order_Qty: 1500, Qty: 1500, QC_OK_Qty: 1480, QC_Reject_Qty: 20, Unit_Price: 54, Net_Amt: 95580, GST_Per: 18, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 7290, SGST_Amt: 7290, Status: "A", QC_Status: "Pending", PO_NO: "PO-2025-001", GRN_Date: "2025-01-15", Created_Date: "2025-01-15", Created_by: "EMP001" },
];

// GRNEntryDetailsTrack cols: GRN_No, Item_Name, Qty, Net_Amt, Track_details
const demoGRNEntryDetailsTrack = [
    { GRN_No: "GRN-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D", Qty: 1500, Net_Amt: 95580, Track_details: "QC Hold - 20 KG damaged", QC_Status: "Pending", Status: "A", GRN_Date: "2025-01-16", deleted_by: "", deleted_system: "", Created_Date: "2025-01-15", Created_by: "EMP001" },
    { GRN_No: "GRN-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D", Qty: 20,   Net_Amt: 0,     Track_details: "QC Rejected - Return to supplier", QC_Status: "Rejected", Status: "A", GRN_Date: "2025-01-17", Created_Date: "2025-01-17", Created_by: "EMP001" },
];

// GRNEntryTrack cols: GRN_No, Supplier_Name, PO_No, Bill_Amt, Track_details
const demoGRNEntryTrack = [
    { GRN_No: "GRN-2025-001", Supplier_Name: "Tata Steel Dealers",    PO_No: "PO-2025-001", Bill_Amt: 129800, Track_details: "Gate Entry completed", Status: "A", Approval_Status: "Pending", PO_Status: "Open", GRN_Date: "2025-01-15", Created_Date: "2025-01-15", Created_by: "EMP001" },
    { GRN_No: "GRN-2025-002", Supplier_Name: "JSW Steel Distributors",PO_No: "PO-2025-002", Bill_Amt: 70800,  Track_details: "QC cleared - stock updated",  Status: "A", Approval_Status: "Pending", PO_Status: "Open", GRN_Date: "2025-01-22", Created_Date: "2025-01-22", Created_by: "EMP001" },
];

// GRNFreightDetails cols: GRN_No, Fright_Name, Amount, Net_Amount, Status
const demoGRNFreightDetails = [
    { GRN_No: "GRN-2025-001", Fright_Name: "Ravi Transport Services", Amount: 3500, Net_Amount: 3500, GST_Per: 0, GST_Amt: 0, Status: "A", FPO_No: "PO-2025-001", BILL_MODE: "Cash", Created_Date: "2025-01-15", Created_by: "EMP004" },
];

// GRNReturnDetails cols: GRN_No, Item_Name, Qty, Net_Amt, QC_Status
const demoGRNReturnDetails = [
    { GRN_No: "GRN-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D", HSN_Code: "72142000", UOM: "KG", Order_Qty: 20, Qty: 20, Unit_Price: 54, Net_Amt: 1080, QC_Status: "Rejected", Status: "A", GRN_Date: "2025-01-17", QC_Remarks: "Below yield strength spec", Created_Date: "2025-01-17", Created_by: "EMP001" },
];

// ── INVENTORY ─────────────────────────────────────────────────────

// MaterialRequest cols: MR_Material_No, MR_Material_Name, MR_Qty, MR_Request_Status
const demoMaterialRequests = [
    { MR_Req_No: "MR-2025-001", MR_Material_No: "ITM001", MR_Material_Name: "TMT Bar 8mm Fe500D",  MR_Size: "8mm", MR_Qty: 200, MR_Req_Date: "2025-01-20", MR_Status: "A", MR_Request_Status: "Issued",  MR_Approval_Person: "EMP001", MR_Approval_Date: "2025-01-20", MR_Created_by: "EMP005", MR_Created_date: "2025-01-20", MR_Department: "Production", MR_JOB_Card: "JO-2025-001" },
    { MR_Req_No: "MR-2025-002", MR_Material_No: "ITM002", MR_Material_Name: "TMT Bar 12mm Fe500D", MR_Size: "12mm",MR_Qty: 300, MR_Req_Date: "2025-01-28", MR_Status: "A", MR_Request_Status: "Pending", MR_Approval_Person: "",        MR_Approval_Date: "",          MR_Created_by: "EMP005", MR_Created_date: "2025-01-28", MR_Department: "Production" },
];

// MaterialRequest1 cols: Req_No, Item_Name, Qty, Approval_Status, Issue_Status
const demoMaterialRequests1 = [
    { Req_No: "MR1-2025-001", Item_Code: "ITM004", Item_Name: "Grinding Wheel 7inch", Dept_Name: "Maintenance", UOM: "NOS", Qty: 5, Req_Date: "2025-02-05", Required_Date: "2025-02-07", Status: "A", Approval_Status: "Approved", Issue_Status: "Issued", Approval_By: "EMP001", Approval_Date: "2025-02-06", Created_Date: "2025-02-05", Created_by: "EMP001" },
];

// MaterialInward cols: MI_Document_Number, MI_Vendor_Name, MI_Item_Description, MI_Qty, MI_TotalAmount
const demoMaterialInward = [
    { MI_Document_Number: "MI-2025-001", MI_Reference_No: "GRN-2025-001", MI_Vendor_Code: "SUP001", MI_Item_No: "ITM001", MI_Vendor_Name: "Tata Steel Dealers",    MI_Item_Description: "TMT Bar 8mm Fe500D",   MI_Size: "8mm",  MI_Qty: 500,  MI_Price: 55, MI_GST_Per: 18, MI_GST_Amount: 4950,  MI_TotalAmount: 32450, MI_Status: "A", MI_Posting_Date: "2025-01-15", MI_Created_date: "2025-01-15", MI_Created_by: "EMP001" },
    { MI_Document_Number: "MI-2025-002", MI_Reference_No: "GRN-2025-001", MI_Vendor_Code: "SUP001", MI_Item_No: "ITM002", MI_Vendor_Name: "Tata Steel Dealers",    MI_Item_Description: "TMT Bar 12mm Fe500D",  MI_Size: "12mm", MI_Qty: 1480, MI_Price: 54, MI_GST_Per: 18, MI_GST_Amount: 14320, MI_TotalAmount: 94000, MI_Status: "A", MI_Posting_Date: "2025-01-15", MI_Created_date: "2025-01-15", MI_Created_by: "EMP001" },
];

// MaterialIssue cols: MI_Material_No, MI_Material_Name, MI_Qty, MI_Return_Qty, MI_Status
const demoMaterialIssue = [
    { MI_Req_No: "MR-2025-001", MI_Material_No: "ITM001", MI_Material_Name: "TMT Bar 8mm Fe500D",  MI_Size: "8mm",  MI_Qty: 200, MI_Return_Qty: 0, MI_Status: "A", MI_Department: "Production", MI_JOB_Card: "JO-2025-001", MI_Req_Date: "2025-01-22", MI_Created_date: "2025-01-22", MI_Created_by: "EMP001" },
    { MI_Req_No: "MR-2025-002", MI_Material_No: "ITM002", MI_Material_Name: "TMT Bar 12mm Fe500D", MI_Size: "12mm", MI_Qty: 300, MI_Return_Qty: 0, MI_Status: "A", MI_Department: "Production",                          MI_Req_Date: "2025-01-30", MI_Created_date: "2025-01-30", MI_Created_by: "EMP001" },
];

// MaterialIssue1 cols: MI_No, Item_Name, Qty, Status
const demoMaterialIssue1 = [
    { MI_No: "MIS-2025-001", Req_No: "MR-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",   Dept_Name: "Production",  UOM: "KG",  Qty: 200, Status: "A", MI_Date: "2025-01-22", Created_Date: "2025-01-22", Created_by: "EMP001", Job_No: "JO-2025-001" },
    { MI_No: "MIS-2025-001", Req_No: "MR-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D",  Dept_Name: "Production",  UOM: "KG",  Qty: 300, Status: "A", MI_Date: "2025-01-22", Created_Date: "2025-01-22", Created_by: "EMP001", Job_No: "JO-2025-001" },
    { MI_No: "MIS-2025-002", Req_No: "MR1-2025-001",Item_Code: "ITM004", Item_Name: "Grinding Wheel 7inch", Dept_Name: "Maintenance", UOM: "NOS", Qty: 5,   Status: "A", MI_Date: "2025-02-07", Created_Date: "2025-02-07", Created_by: "EMP001" },
];

// StockInward cols: GRN_No, Item_Name, Qty, Amount, Status
const demoStockInward = [
    { GRN_No: "GRN-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",  INV_No: "INV-TAT-001", Supplier_Code: "SUP001", Supplier_Name: "Tata Steel Dealers", Rate: 55, Amount: 27500, Qty: 500,  UOM: "KG",  Status: "A", GRN_Date: "2025-01-15", Created_date: "2025-01-15", Created_by: "EMP001" },
    { GRN_No: "GRN-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D", INV_No: "INV-TAT-001", Supplier_Code: "SUP001", Supplier_Name: "Tata Steel Dealers", Rate: 54, Amount: 79920, Qty: 1480, UOM: "KG",  Status: "A", GRN_Date: "2025-01-15", Created_date: "2025-01-15", Created_by: "EMP001" },
    { GRN_No: "GRN-2025-002", Item_Code: "ITM003", Item_Name: "MS Hollow Pipe 2inch",INV_No: "INV-JSW-001", Supplier_Code: "SUP002", Supplier_Name: "JSW Steel Distributors", Rate: 85, Amount: 17000, Qty: 200, UOM: "MTR", Status: "A", GRN_Date: "2025-01-22", Created_date: "2025-01-22", Created_by: "EMP001" },
];

// StockOutward cols: Issue_No, Item_Name, Issue_Qty, Return_Qty, Status
const demoStockOutward = [
    { Issue_No: "MIS-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",  Issue_Qty: 200, Return_Qty: 0, Rate: 55, Amount: 11000, UOM: "KG",  Status: "A", Issue_Date: "2025-01-22", Job_No: "JO-2025-001", Department: "Production", Created_date: "2025-01-22", Created_by: "EMP001" },
    { Issue_No: "MIS-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D", Issue_Qty: 300, Return_Qty: 0, Rate: 54, Amount: 16200, UOM: "KG",  Status: "A", Issue_Date: "2025-01-22", Job_No: "JO-2025-001", Department: "Production", Created_date: "2025-01-22", Created_by: "EMP001" },
];

// StockOutwardCorrection cols: Issue_No, Item_Name, Issue_Qty, Return_Qty
const demoStockOutwardCorrection = [
    { Issue_No: "MIS-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D", Qty: 200, UOM: "KG", Issue_Qty: 200, Return_Qty: 5, Outward_Ref_No: "SOC-001", Customer_Code: "CUST001", Remarks: "5 KG returned - damaged", Issue_Date: "2025-01-23", Created_date: "2025-01-23", Created_by: "EMP001" },
];

const demoStockOutwardCorrectionDel = [
    { Issue_No: "MIS-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D", Qty: 5, UOM: "KG", Issue_Qty: 5, Return_Qty: 5, Outward_Ref_No: "SOC-001", Customer_Code: "CUST001", Remarks: "Deleted after approval", Issue_Date: "2025-01-24", Created_date: "2025-01-24", Created_by: "EMP001" },
];

// StockLiability1 cols: VOUCHER_NO, VOURTYPE, INWARD_QTY, OUTWARD_QTY, AMOUNT
const demoStockLiability1 = [
    { VOUCHER_NO: "GRN-2025-001", VOURTYPE: "GRN",   INWARD_QTY: 500,  OUTWARD_QTY: 200, AMOUNT: 27500, RATE: 55, VOUCHER_DATE: "2025-01-15", CREATED_DATE: "2025-01-15", CREATED_BY: "EMP001", STATUES: "A", Old_Qty: 0 },
    { VOUCHER_NO: "MIS-2025-001", VOURTYPE: "Issue", INWARD_QTY: 0,    OUTWARD_QTY: 200, AMOUNT: 11000, RATE: 55, VOUCHER_DATE: "2025-01-22", CREATED_DATE: "2025-01-22", CREATED_BY: "EMP001", STATUES: "A", Old_Qty: 500 },
];

const demoStockLiability3 = [
    { VOUCHER_NO: "GRN-2025-001", VOURTYPE: "GRN",   INWARD_QTY: 1480, OUTWARD_QTY: 300, AMOUNT: 79920, RATE: 54, VOUCHER_DATE: "2025-01-15", CREATED_DATE: "2025-01-15", CREATED_BY: "EMP001", STATUES: "A", Old_Qty: 0 },
];

const demoStockLiabilityTrack = [
    { VOUCHER_NO: "GRN-2025-001", VOURTYPE: "GRN",   INWARD_QTY: 500, OUTWARD_QTY: 0,   AMOUNT: 27500, RATE: 55, VOUCHER_DATE: "2025-01-15", Remarks: "Stock inward from GRN", CREATED_DATE: "2025-01-15", CREATED_BY: "EMP001", STATUES: "A" },
    { VOUCHER_NO: "MIS-2025-001", VOURTYPE: "Issue", INWARD_QTY: 0,   OUTWARD_QTY: 200, AMOUNT: 11000, RATE: 55, VOUCHER_DATE: "2025-01-22", Remarks: "Production issue",     CREATED_DATE: "2025-01-22", CREATED_BY: "EMP001", STATUES: "A" },
];

// IndexMaster cols: Model_No, Model_Name, Status
const demoIndexMasters = [
    { Model_No: "IDX-001", Model_Name: "Steel Products Index",     Status: "A", Created_By: "EMP001", Created_Date: "2025-01-01" },
    { Model_No: "IDX-002", Model_Name: "Tool & Consumables Index", Status: "A", Created_By: "EMP001", Created_Date: "2025-01-01" },
];

// IndexCreation cols: Model_No, Vehicle_Model_Name, Assembly_Part_Name, Qty, Status
const demoIndexCreation = [
    { Model_No: "IDX-001", Vehicle_Model_Name: "Steel Products Index", Assembly_Part_No: "ITM001", Assembly_Part_Name: "TMT Bar 8mm Fe500D",   Qty: 500,  Status: "A", Remarks: "Primary index", System_Name: "SERVER01", Created_By: "EMP001", Created_Date: "2025-01-01" },
    { Model_No: "IDX-001", Vehicle_Model_Name: "Steel Products Index", Assembly_Part_No: "ITM002", Assembly_Part_Name: "TMT Bar 12mm Fe500D",  Qty: 1480, Status: "A", Remarks: "",              System_Name: "SERVER01", Created_By: "EMP001", Created_Date: "2025-01-01" },
    { Model_No: "IDX-002", Vehicle_Model_Name: "Tool Index",           Assembly_Part_No: "ITM004", Assembly_Part_Name: "Grinding Wheel 7inch", Qty: 15,   Status: "A", Remarks: "",              System_Name: "SERVER01", Created_By: "EMP001", Created_Date: "2025-01-01" },
];

// IndexCreationTrack cols: Model_No, Vehicle_Model_Name, Assembly_Part_Name, Qty
const demoIndexCreationTrack = [
    { Model_No: "IDX-001", Vehicle_Model_Name: "Steel Products Index", Assembly_Part_No: "ITM001", Assembly_Part_Name: "TMT Bar 8mm Fe500D",  Qty: 500,  Status: "A", Remarks: "Added to index",  Created_By: "EMP001", Created_Date: "2025-01-01" },
    { Model_No: "IDX-001", Vehicle_Model_Name: "Steel Products Index", Assembly_Part_No: "ITM001", Assembly_Part_Name: "TMT Bar 8mm Fe500D",  Qty: 300,  Status: "A", Remarks: "Qty corrected",   Created_By: "EMP003", Created_Date: "2025-01-10" },
];

// MainIndexMaster cols: Booking_Code, Customer_Name, Vehicle_Model_Name, Model_No, Status
const demoMainIndexMasters = [
    { Booking_Code: "MIDX-001", Customer_Name: "ABC Engineering", Vehicle_Model_Name: "Steel Products",   Model_No: "IDX-001", Status: "A", created_By: "EMP001", Created_date: "2025-01-01" },
    { Booking_Code: "MIDX-002", Customer_Name: "XYZ Fabricators", Vehicle_Model_Name: "Tool & Consumable",Model_No: "IDX-002", Status: "A", created_By: "EMP001", Created_date: "2025-01-01" },
];

// MainIndexDetails cols: Booking_Code, Assembly_part_Name, Child_Part_Name, Qty, Status
const demoMainIndexDetails = [
    { Booking_Code: "MIDX-001", Assembly_part_No: "ITM001", Assembly_part_Name: "TMT Bar 8mm Fe500D",  Child_Part_Name: "Fe500D Grade", Qty: 500,  UOM: "KG",  Status: "A", created_By: "EMP001", Created_date: "2025-01-01" },
    { Booking_Code: "MIDX-002", Assembly_part_No: "ITM004", Assembly_part_Name: "Grinding Wheel 7inch",Child_Part_Name: "7inch Abrasive",Qty: 50,   UOM: "NOS", Status: "A", created_By: "EMP001", Created_date: "2025-01-01" },
];

// CCMSEntry — using CCMSEntry emptyForm fields
const demoCCMSEntries = [
    { CCMC_No: "CCMS-2025-001", Booking_Code: "BK-001", Serial_No: "SNO-001", Mobile_No: "9876540001", Customer_Name: "ABC Engineering", Model_Name: "Steel Bracket", Complaint_Type_Name: "Dimensional Issue", Service_Type_Name: "Rework", Complaint_Status: "O", Approval_Status: "Pending", Site_Address: "No.5, Industrial Estate, Salem", Complainted_Date: "2025-01-20", Created_Date: "2025-01-20", Created_By: "EMP003", Nature_Of_Complaint: "Dimension mismatch", Action_Taken: "Rework scheduled" },
    { CCMC_No: "CCMS-2025-002", Booking_Code: "BK-002", Serial_No: "SNO-002", Mobile_No: "9876540003", Customer_Name: "XYZ Fabricators", Model_Name: "MS Frame",       Complaint_Type_Name: "Surface Finish",    Service_Type_Name: "Inspection", Complaint_Status: "O", Approval_Status: "Pending", Site_Address: "78, Second Street, Salem",             Complainted_Date: "2025-01-25", Created_Date: "2025-01-25", Created_By: "EMP003", Nature_Of_Complaint: "Surface rough finish", Action_Taken: "QC inspection done" },
];

// ── PRODUCTION ────────────────────────────────────────────────────

// JobEntry cols: JE_Job_No, JE_Product_name, JE_Qty, Job_Status, JE_Status
const demoJobEntries = [
    { JE_Job_No: "JO-2025-001", JE_Product_name: "TMT Bar 8mm Fe500D",   JE_Qty: 200, JE_Size: "8mm",  Job_Status: "In Progress", JE_Status: "A", JE_Customer: "ABC Engineering", Vehicle_Type_Name: "Truck", Priority: "High",   JE_Target_Date: "2025-02-05", JE_Created_Date: "2025-01-20", JE_Created_by: "EMP005", Remarks: "", Complete_Status: "" },
    { JE_Job_No: "JO-2025-002", JE_Product_name: "TMT Bar 12mm Fe500D",  JE_Qty: 300, JE_Size: "12mm", Job_Status: "Open",        JE_Status: "A", JE_Customer: "ABC Engineering", Vehicle_Type_Name: "Truck", Priority: "Normal", JE_Target_Date: "2025-02-05", JE_Created_Date: "2025-01-25", JE_Created_by: "EMP005", Remarks: "", Complete_Status: "" },
];

// JobEntryDetails cols: JED_Job_No, JED_Part_No, JED_Qty, JED_Process_Status, QC_Status
const demoJobEntryDetails = [
    { JED_Job_No: "JO-2025-001", JED_Part_No: "ITM001", JED_Qty: 200, JED_Unit: "KG", JED_Weight: 200, JED_Process_Status: "Completed",   QC_Status: "Passed",  JED_Statsu: "A", JED_Created_Date: "2025-01-20", JED_Created_by: "EMP005", GC_No: "PC-2025-001", Raw_Material_Qty: 200, Cutting_Size: "8mm x 6m" },
    { JED_Job_No: "JO-2025-001", JED_Part_No: "ITM001", JED_Qty: 200, JED_Unit: "KG", JED_Weight: 200, JED_Process_Status: "In Progress", QC_Status: "Pending", JED_Statsu: "A", JED_Created_Date: "2025-01-22", JED_Created_by: "EMP005", GC_No: "PC-2025-001", Raw_Material_Qty: 200, Cutting_Size: "8mm x 6m" },
    { JED_Job_No: "JO-2025-002", JED_Part_No: "ITM002", JED_Qty: 300, JED_Unit: "KG", JED_Weight: 300, JED_Process_Status: "Not Started", QC_Status: "Pending", JED_Statsu: "A", JED_Created_Date: "2025-01-25", JED_Created_by: "EMP005", GC_No: "PC-2025-002", Raw_Material_Qty: 300 },
];

// JobEntryDetailsUpdate cols: GC_No, Raw_Material_Part_Name, Raw_Material_Qty, Created_By
const demoJobEntryDetailsUpdate = [
    { GC_No: "PC-2025-001", JED_Barcode_: "BC-JED-001", Raw_Material_Part_Name: "TMT Bar 8mm Fe500D", Raw_Material_Qty: 200, Raw_Material_Wt: 200, Heat_TB_Wt: 0, Cutting_Size: "8mm x 6m", Material_Specification: "Fe500D", No_Of_Drawing_Sheet: "2", Raw_Material_Entry_By: "EMP005", Raw_Material_Entry_Date: "2025-01-22", Created_Date: "2025-01-22", Created_By: "EMP005" },
];

// JobEntryDetailsAudit cols: JED_Part_No, JED_Qty, JED_Process_Status, JED_Statsu
const demoJobEntryDetailsAudit = [
    { JED_Part_No: "ITM001", JED_Qty: 200, JED_Unit: "KG", JED_Process_Status: "Completed", JED_Statsu: "A", JED_Job_No: "JO-2025-001", GC_No: "PC-2025-001", JED_Material: "Steel", JED_Dimension: "8mm", JED_Created_Date: "2025-01-22", JED_Created_by: "EMP005", JED_UPDATE_DATE: "2025-01-22", Raw_Material_Qty: 200, Cutting_Size: "8mm x 6m", Material_Specification: "Fe500D" },
];

// JobFileUploaded cols: Job_No, Item_Name, Drawing_No, File_Name, Status
const demoJobFileUploads = [
    { Job_No: "JO-2025-001", Item_Name: "TMT Bar 8mm Fe500D",  Drawing_No: "DRW-ITM001", Revision_No: "B", File_Name: "JO-2025-001-drawing.pdf",   Status: "A", Industry_Type: "Steel Manufacturing", Job_Date: "2025-01-20", Created_Date: "2025-01-20", Created_By: "EMP005" },
    { Job_No: "JO-2025-001", Item_Name: "TMT Bar 8mm Fe500D",  Drawing_No: "DRW-ITM001", Revision_No: "B", File_Name: "JO-2025-001-traveller.pdf",  Status: "A", Industry_Type: "Steel Manufacturing", Job_Date: "2025-01-20", Created_Date: "2025-01-20", Created_By: "EMP005" },
];

// JobSpareEntry cols: JS_Material_Name, JS_Size, JS_Qty, JS_Type, JS_Status
const demoJobSpareEntries = [
    { JS_Material_Name: "Grinding Wheel 7inch", JS_Size: "7 inch", JS_Qty: 2, JS_Unit: "NOS", JS_Type: "Consumable", JS_Status: "A", JS_Notes: "Used for finishing", JS_Approval_Rejection_Person: "EMP001", JS_Approval_Rejection_Date: "2025-01-22", JS_Created_by: "EMP005", JS_Created_Date: "2025-01-22", JS_Job_ID: "JO-2025-001" },
];

// ApprovedDetails cols: Order_Date, Order_Numer, Remarks, Approval_Satus (table view)
const demoApprovedDetails = [
    { App_Level: "L1", App_User: "EMP001", Order_Date: "2025-01-22", Order_Numer: "JO-2025-001", Remarks: "Quality approved", Approval_Satus: "Approved", Approval_Date: "2025-01-22", Approved_By: "EMP001", Status: "A", Form: "Job Entry", Department: "Production", Created_Date: "2025-01-22", Created_by: "EMP001" },
];

// ProcessCardMain cols: PC_Job_Card_No, PC_Part_No, PC_Customer, PC_Status
const demoProcessCardMain = [
    { PC_Job_Card_No: "PC-2025-001", PC_Part_No: "ITM001", PC_SNo: "1", PC_Customer: "ABC Engineering", PC_Size: "8mm", PC_Status: "A", PC_Created_By: "EMP005", PC_Created_Date: "2025-01-20", PC_Tech_Issue_Date: "2025-01-20", PC_Store_Receive_Date: "2025-01-21", PC_Prodc_Receive_Date: "2025-01-21" },
];

// ProcessCardDetails cols: PCD_Jobcard_No, PCD_Process_Name, Production_Qty, QC_Accepted_Qty, Job_Status
const demoProcessCardDetails = [
    { PCD_Jobcard_No: "PC-2025-001", PCD_Process_Name: "Cutting", PCD_Machine_Name: "CNC Cutting Machine", Production_Qty: 200, Rejected_Qty: 0, QC_Accepted_Qty: 200, QC_Rejected_Qty: 0, PCD_Qty: 200, Job_Status: "Completed",   PCD_Status: "A", Process_Order: 1, PCD_date: "2025-01-22", PCD_Created_Date: "2025-01-20", PCD_created_By: "EMP005", PCD_Team: "Team A" },
    { PCD_Jobcard_No: "PC-2025-001", PCD_Process_Name: "Bending", PCD_Machine_Name: "Hydraulic Press Brake",Production_Qty: 0,   Rejected_Qty: 0, QC_Accepted_Qty: 0,   QC_Rejected_Qty: 0, PCD_Qty: 200, Job_Status: "In Progress", PCD_Status: "A", Process_Order: 2, PCD_date: "2025-01-23", PCD_Created_Date: "2025-01-20", PCD_created_By: "EMP005", PCD_Team: "Team B" },
    { PCD_Jobcard_No: "PC-2025-001", PCD_Process_Name: "Welding", PCD_Machine_Name: "MIG Welding Machine",   Production_Qty: 0,   Rejected_Qty: 0, QC_Accepted_Qty: 0,   QC_Rejected_Qty: 0, PCD_Qty: 200, Job_Status: "Not Started", PCD_Status: "A", Process_Order: 3, PCD_date: "",           PCD_Created_Date: "2025-01-20", PCD_created_By: "EMP005", PCD_Team: "Team A" },
];

// ProcessCardTracking cols: PCD_Jobcard_No, PCD_Process_Name, Production_Qty, Job_Status
const demoProcessCardTracking = [
    { PCD_Jobcard_No: "PC-2025-001", PCD_Process_Name: "Cutting", Production_Qty: "200", Rejected_Qty: "0", Job_Status: "Completed",   PCD_Status: "A", PCD_date: "2025-01-22", PCD_Created_Date: "2025-01-22", PCD_created_By: "EMP005", PCD_Team: "Team A", System_Name: "SERVER01" },
    { PCD_Jobcard_No: "PC-2025-001", PCD_Process_Name: "Bending", Production_Qty: "0",   Rejected_Qty: "0", Job_Status: "In Progress", PCD_Status: "A", PCD_date: "2025-01-23", PCD_Created_Date: "2025-01-23", PCD_created_By: "EMP005", PCD_Team: "Team B" },
];

// JobcardRMIssueMaster cols: Job_No, Barcode, Status
const demoJobcardRMIssueMaster = [
    { Job_No: "JO-2025-001", Barcode: "BC-RM-001", Status: "A", System_Name: "SERVER01", created_By: "EMP001", created_Date: "2025-01-21" },
];

// JobcardRMIssueDetails cols: Job_No, Part_No, RM_Barcode_Item_Name, Qty
const demoJobcardRMIssueDetails = [
    { Job_No: "JO-2025-001", Part_No: "ITM001", RM_Barcode_Item_Name: "TMT Bar 8mm Fe500D",  Qty: 200, RM_Barcode_Qty: 200, Barcode: "BC-RM-001", RM_Barcode: "BC-RM-001", created_By: "EMP001", created_Date: "2025-01-21" },
    { Job_No: "JO-2025-001", Part_No: "ITM002", RM_Barcode_Item_Name: "TMT Bar 12mm Fe500D", Qty: 10,  RM_Barcode_Qty: 10,  Barcode: "BC-RM-002", RM_Barcode: "BC-RM-002", created_By: "EMP001", created_Date: "2025-01-21" },
];

// BreakdownEntry uses: BE_MachineName, BE_Item_Name, BE_ProbemDescription, BE_Status, BEC_Status
const demoBreakdownEntries = [
    { BE_MachineName: "CNC Cutting Machine",   BE_Item_Name: "TMT Bar 8mm Fe500D",  BE_ProbemDescription: "Coolant pump failure", BE_Priority: "High",   BE_Location: "Workshop Bay 1", BE_Mode_Of_Report: "Verbal", BE_ReportedBy: "EMP005", BE_Status: "A", BEC_Status: "Resolved", BEC_Action_Taken: "Pump replaced",          BEC_ProbleamSloved_by: "Maintenance", BE_Date: "2025-01-24", BE_CreatedDate: "2025-01-24", BEC_Sloved_Date: "2025-01-24" },
    { BE_MachineName: "Hydraulic Press Brake", BE_Item_Name: "Steel Plate",         BE_ProbemDescription: "Hydraulic oil leak",   BE_Priority: "Medium", BE_Location: "Workshop Bay 2", BE_Mode_Of_Report: "Written",BE_ReportedBy: "EMP005", BE_Status: "A", BEC_Status: "Resolved", BEC_Action_Taken: "Seal replaced, oil refilled",BEC_ProbleamSloved_by: "Maintenance", BE_Date: "2025-02-02", BE_CreatedDate: "2025-02-02", BEC_Sloved_Date: "2025-02-02" },
];

// ── DELIVERY ──────────────────────────────────────────────────────

// DeliveryChallan cols: Doc_No, Supplier_Name, Net_Amt, Chellan_Type, PO_Status
const demoDeliveryChallans = [
    { Doc_No: "DC-2025-001", Supplier_Name: "ABC Engineering (Outward)", Net_Amt: 147500, Chellan_Type: "Sales DC", PO_Status: "Delivered", Approval_Status: "Pending", Statsu: "A", Contact_No: "9876540001", Vehicle_Name: "TN37AB1234", Carrier_Name: "Ravi Transport", Total_Before_Disc: 125000, Taxable_Amount: 125000, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 11250, SGST_Amt: 11250, Doc_Date: "2025-02-18", Delivery_Date: "2025-02-18", Created_Date: "2025-02-18", Created_by: "EMP003" },
    { Doc_No: "DC-2025-002", Supplier_Name: "XYZ Fabricators (Outward)",  Net_Amt: 100300, Chellan_Type: "Sales DC", PO_Status: "In Transit",  Approval_Status: "Pending", Statsu: "A", Contact_No: "9876540003", Vehicle_Name: "TN38BC5678", Carrier_Name: "Kumar Logistics", Total_Before_Disc: 85000, Taxable_Amount: 85000, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 7650, SGST_Amt: 7650, Doc_Date: "2025-02-25", Delivery_Date: "2025-02-25", Created_Date: "2025-02-25", Created_by: "EMP003" },
];

// DeliveryChallanDetails cols: Doc_No, Item_Name, Qty, Net_Amt, Statsu
const demoDeliveryChallanDetails = [
    { Doc_No: "DC-2025-001", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",   HSN_Code: "72142000", UOM: "KG",  Qty: 200, Unit_Price: 62, Net_Amt: 12400, GST_Per: 18, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 1116, SGST_Amt: 1116, Statsu: "A", Doc_Date: "2025-02-18", Created_Date: "2025-02-18", Created_by: "EMP003" },
    { Doc_No: "DC-2025-002", Item_Code: "ITM003", Item_Name: "MS Hollow Pipe 2inch", HSN_Code: "73063000", UOM: "MTR", Qty: 200, Unit_Price: 95, Net_Amt: 22420, GST_Per: 18, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 1710, SGST_Amt: 1710, Statsu: "A", Doc_Date: "2025-02-25", Created_Date: "2025-02-25", Created_by: "EMP003" },
];

// DCMain cols: DC_Date, Customer_Name, DC_Type, Total_Amount, DC_Status
const demoDCMains = [
    { DC_Date: "2025-02-18", Customer_Name: "ABC Engineering", DC_Type: "Sales", Total_Amount: 147500, DC_Status: "Billed", Status: "A", Contact_No: "9876540001", Vehicle_No: "TN37AB1234", Driver_Name: "Murugan", Total_qty: 200, Created_Date: "2025-02-18", Created_by: "EMP003" },
];

// DCDetails cols: DC_No, Part_Name, Qty, Amount, Status
const demoDCDetails = [
    { DC_No: "DC-2025-001", Part_No: "ITM001", Part_Name: "TMT Bar 8mm Fe500D", Qty: 200, Rate: 62, Amount: 12400, UOM: "KG", Status: "A", DC_Date: "2025-02-18", Created_Date: "2025-02-18", Created_By: "EMP003", Barcode: "BC-ITM001-001", Material_Source: "GRN-2025-001" },
];

// NCDCMain cols: NC_no, Customer_Name, DC_Type, Total_Amount, DC_Status
const demoNCDCMains = [
    { NC_no: "NCDC-2025-001", Customer_Name: "ABC Engineering", DC_Type: "NC Sample", Total_Amount: 620, DC_Status: "Open", Status: "A", Vehicle_No: "", Driver_Name: "", Total_qty: 10, DC_Date: "2025-01-30", Created_Date: "2025-01-30", Created_by: "EMP003" },
];

// NCDCDetails cols: DC_No, NC_No, Part_Name, Qty, Status
const demoNCDCDetails = [
    { DC_No: "NCDC-2025-001", NC_No: "NC-2025-001", Part_No: "ITM001", Part_Name: "TMT Bar 8mm Fe500D", Qty: 10, Rate: 62, Amount: 620, UOM: "KG", Status: "A", EntryType: "NC Sample", DC_Date: "2025-01-30", Created_Date: "2025-01-30", Created_By: "EMP003" },
];

// ── SERVICE ───────────────────────────────────────────────────────

// BookingMaster uses Row_Id, Booking_No, Customer_Name, Vehicle_No, Booking_Status
const demoBookingMasters = [
    { Booking_No: "BM-2025-001", Customer_Code: "CUST001", Customer_Name: "Vijay Engineering", Vehicle_No: "TN09AB1111", Vehicle_Name: "Truck", Serial_No: "SNO-VM-001", Booking_Date: "2025-01-10", Status: "A", Booking_Status: "Open", Conformation_status: "", Created_Date: "2025-01-10", Created_By: "EMP003", Remarks: "Cutting service required" },
    { Booking_No: "BM-2025-002", Customer_Code: "CUST002", Customer_Name: "Ram Fabricators",  Vehicle_No: "TN22CD2222", Vehicle_Name: "Van",   Serial_No: "SNO-VM-002", Booking_Date: "2025-01-20", Status: "A", Booking_Status: "Open", Conformation_status: "", Created_Date: "2025-01-20", Created_By: "EMP003", Remarks: "Welding service" },
];

// BookingServiceDetails — Booking_No, Item_Name, Problem_Description, Service_Status
const demoBookingServiceDetails = [
    { Booking_No: "BM-2025-001", Customer_Name: "Vijay Engineering", Display_No: "1", Item_Name: "Cutting Blade 14inch", Problem_Description: "Custom plate cutting",  Status: "A", Service_Status: "Pending", Created_By: "EMP003", Created_Date: "2025-01-10" },
    { Booking_No: "BM-2025-002", Customer_Name: "Ram Fabricators",  Display_No: "1", Item_Name: "Welding Wire 1.2mm",  Problem_Description: "Frame welding service", Status: "A", Service_Status: "Pending", Created_By: "EMP003", Created_Date: "2025-01-20" },
];

// BookingServiceSpareList — Booking_No, Spare_Item_Name, Qty
const demoBookingServiceSpareLists = [
    { Booking_No: "BM-2025-001", Customer_Name: "Vijay Engineering", Display_No: "1", Spare_Item_Name: "Grinding Wheel 7inch", Spare_Item_Code: "ITM004", Spare_Item_Qty: 2, Spare_Uom: "NOS", Status: "A", Service_Status: "Pending", Created_By: "EMP003", Created_Date: "2025-01-10" },
    { Booking_No: "BM-2025-001", Customer_Name: "Vijay Engineering", Display_No: "2", Spare_Item_Name: "Hex Bolt M12x50",     Spare_Item_Code: "ITM005", Spare_Item_Qty: 10,Spare_Uom: "NOS", Status: "A", Service_Status: "Pending", Created_By: "EMP003", Created_Date: "2025-01-10" },
];

// ServiceOrder cols: PO_No, Supplier_Name, PO_Date, Net_Amt, PO_Status
const demoServiceOrders = [
    { PO_No: "SVO-2025-001", Supplier_Name: "Vijay Engineering", PO_Date: "2025-01-10", Net_Amt: 5000, PO_Status: "Open", Approval_Status: "Pending", Statsu: "A", Contact_No: "9876543220", Purchase_Req_No: "BM-2025-001", Taxable_Amount: 5000, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 450, SGST_Amt: 450, Net_Amt: 5900, Delivery_Date: "2025-01-12", Created_Date: "2025-01-10", Created_by: "EMP003" },
];

// ServiceOrderDetails cols: PO_NO, Item_Name, Qty, Net_Amt, Statsu
const demoServiceOrderDetails = [
    { PO_NO: "SVO-2025-001", Item_Code: "SVC-001", Item_Name: "Custom Cutting Service", HSN_Code: "998898", UOM: "NOS", Qty: 5, Unit_Price: 700, GST_Per: 18, CGST_Per: 9, SGST_Per: 9, CGST_Amt: 315, SGST_Amt: 315, Net_Amt: 4130, Statsu: "A", PO_Date: "2025-01-10", Created_Date: "2025-01-10", Created_by: "EMP003" },
];

// ServiceRequest cols: Req_No, Item_Name, Dept_Name, Qty, Approval_Status
const demoServiceRequests = [
    { Req_No: "SR-2025-001", Item_Code: "SVC-001", Item_Name: "Cutting Service",  Dept_Name: "Customer Service", UOM: "NOS", Qty: 5, Req_Date: "2025-01-09", Required_Date: "2025-01-10", Status: "A", Approval_Status: "Approved", Created_Date: "2025-01-09", Created_by: "EMP003", Purpose: "Customer request", Specification: "14-inch blade" },
    { Req_No: "SR-2025-002", Item_Code: "SVC-002", Item_Name: "Welding Repair",   Dept_Name: "Customer Service", UOM: "NOS", Qty: 3, Req_Date: "2025-02-01", Required_Date: "2025-02-05", Status: "A", Approval_Status: "Pending",  Created_Date: "2025-02-01", Created_by: "EMP003", Purpose: "Customer request" },
];

// ServiceTran cols: Service_No, Customer_Name, Vehicle_Type, Total_Amount, Status
const demoServiceTrans = [
    { Service_No: "SVT-2025-001", Customer_Name: "Vijay Engineering", Vehicle_No: "TN09AB1111", Vehicle_Type: "Truck", Work_Description: "Custom Cutting Service", Labour_Cost: 500, Material_Cost: 200, Total_Amount: 5000, Status: "A", OPerator_Name: "Team A", Supervisor_Name: "EMP005", Created_By: "EMP003", Created_Date: "2025-01-12" },
];

// PartSpareList cols: Part_Name, Part_No, Part_Spare_Name, Part_Qty, Status
const demoPartSpareLists = [
    { Part_No: "SPA001", Part_Name: "Cutting Assembly", Part_Spare_No: "ITM004", Part_Spare_Name: "Cutting Blade 14inch", Part_Qty: 1, Part_Spare_Qty: 2, PartUom: "NOS", Part_Spare_Uom: "NOS", Status: "A", Created_Date: "2025-01-01", Created_By: "EMP001" },
    { Part_No: "SPA002", Part_Name: "Welding Setup",    Part_Spare_No: "SPA002", Part_Spare_Name: "Welding Wire 1.2mm",  Part_Qty: 1, Part_Spare_Qty: 5, PartUom: "SET", Part_Spare_Uom: "KG",  Status: "A", Created_Date: "2025-01-01", Created_By: "EMP001" },
];

// ServiceBillMaster cols: BILLNO, CUST_NAME, BILLDATE, BILL_AMT, STATUS
const demoServiceBillMasters = [
    { BILLNO: "SBM-2025-001", CUST_NAME: "Vijay Engineering", BILLDATE: "2025-01-12", BILL_AMT: 5900, STATUS: "A", Booking_Cus_Code: "CUST001", service_Bill_NO: "SBM-2025-001", PHONE: "9876543220", STATE: "Tamil Nadu", STATECODE: "33", GSTNO: "33AABCV1111A1Z1", TAX_GROSSAMT: 5000, TAXABLE_AMT: 5000, CGST_AMT: 450, SGST_AMT: 450, TOTAL_TAX: 900, TAX_AMT: 900, DIS_AMT: 0, CARTAGE_AMT: 0, SERVICE_AMT: 0, UNLOAD_AMT: 0, ADD_AMT: 0, TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-12" },
];

// ServiceBillTrans cols: BILLNO, Item_name, Qty, NET_AMT, STATUS
const demoServiceBillTrans = [
    { BILLNO: "SBM-2025-001", Item_name: "Custom Cutting Service", UNIT: "NOS", Qty: 5, NET_RATE: 700, NET_AMT: 4130, TAXABLE_AMT: 3500, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 315, SGST_TAX_AMT: 315, TOTAL_TAX: 630, TOT_AMT: 3500, STATUS: "A", BILL_MODE: "Cash", BILLDATE: "2025-01-12", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-12" },
    { BILLNO: "SBM-2025-001", Item_name: "Consumables",           UNIT: "NOS", Qty: 1, NET_RATE: 500, NET_AMT: 590,  TAXABLE_AMT: 500,  CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 45,  SGST_TAX_AMT: 45,  TOTAL_TAX: 90,  TOT_AMT: 500,  STATUS: "A", BILL_MODE: "Cash", BILLDATE: "2025-01-12", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-12" },
];

// ServiceBillLabourCharges cols: BILLNO, Item_Name, Labour_Charge, Total_Amt, STATUS
const demoServiceBillLabourCharges = [
    { BILLNO: "SBM-2025-001", Item_Name: "Cutting Service Labour", Item_Code: "LAB-001", Labour_Charge: 500, Total_Amt: 500, BILL_AMT: 590, STATUS: "A", BILLDATE: "2025-01-12", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-12" },
];

// TempServiceBillMaster cols: BILLNO, CUST_NAME, BILLDATE, BILL_AMT, STATUS
const demoTempServiceBillMasters = [
    { BILLNO: "TSBM-2025-001", CUST_NAME: "Ram Fabricators", BILLDATE: "2025-01-20", BILL_AMT: 4720, STATUS: "A", Booking_Cus_Code: "CUST002", PHONE: "9876543221", STATE: "Tamil Nadu", STATECODE: "33", TAX_GROSSAMT: 4000, TAXABLE_AMT: 4000, CGST_AMT: 360, SGST_AMT: 360, TOTAL_TAX: 720, TAX_AMT: 720, DIS_AMT: 0, CARTAGE_AMT: 0, SERVICE_AMT: 0, UNLOAD_AMT: 0, ADD_AMT: 0, TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-20" },
];

const demoTempServiceBillTrans = [
    { BILLNO: "TSBM-2025-001", Item_name: "Welding Service - 3 joints", UNIT: "NOS", Qty: 3, NET_RATE: 900, NET_AMT: 3186, TAXABLE_AMT: 2700, CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 243, SGST_TAX_AMT: 243, TOTAL_TAX: 486, TOT_AMT: 2700, STATUS: "A", BILLDATE: "2025-01-20", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-20" },
    { BILLNO: "TSBM-2025-001", Item_name: "Grinding",                    UNIT: "NOS", Qty: 1, NET_RATE: 600, NET_AMT: 708,  TAXABLE_AMT: 600,  CGST_TAX: 9, SGST_TAX: 9, CGST_TAX_AMT: 54,  SGST_TAX_AMT: 54,  TOTAL_TAX: 108, TOT_AMT: 600,  STATUS: "A", BILLDATE: "2025-01-20", TAX_YESNO: "Yes", TAX_REVYES: "No", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-20" },
];

const demoTempServiceBillLabourCharges = [
    { BILLNO: "TSBM-2025-001", Item_Name: "Welding Labour", Item_Code: "LAB-002", Labour_Charge: 600, Total_Amt: 600, BILL_AMT: 708, STATUS: "A", BILLDATE: "2025-01-20", CREATED_BY: "EMP003", CREATED_DATE: "2025-01-20" },
];

// ── QUALITY ───────────────────────────────────────────────────────

// QCEntry cols: QC_NO, Supplier_Name, Item_Name, QC_Date, Status
const demoQCEntries = [
    { QC_NO: "QC-2025-001", Supplier_Name: "Tata Steel Dealers",    GRN_No: "GRN-2025-001", PO_No: "PO-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D",  QC_Date: "2025-01-16", GRN_Date: "2025-01-15", QC_Inspected_Qty: 1500, QC_OK_Qty: 1480, QC_Rejected_Qty: 20,  Status: "A", Grade: "B+", QC_By: "EMP001", QC_Remarks: "20 KG below spec", Created_Date: "2025-01-16", Created_by: "EMP001" },
    { QC_NO: "QC-2025-002", Supplier_Name: "VELSON Production",     GRN_No: "",             PO_No: "",             Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",   QC_Date: "2025-01-22", GRN_Date: "",           QC_Inspected_Qty: 200,  QC_OK_Qty: 200,  QC_Rejected_Qty: 0,   Status: "A", Grade: "A",  QC_By: "EMP001", QC_Remarks: "All passed",        Created_Date: "2025-01-22", Created_by: "EMP001" },
];

// QCEntryDetails cols: QC_NO, Item_Name, Inspection_Type, Actual_Value, Result_Status
const demoQCEntryDetails = [
    { QC_NO: "QC-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D", Inspection_Type: "Dimensional", Instrument_Name: "Vernier Caliper", Actual_Value: "12.1", Spec: "12±0.5mm", Min_Val: 11.5, Max_Val: 12.5, Tolerance_Type: "Range", Result_Status: "Pass",   Statsu: "A", QC_Date: "2025-01-16", Created_Date: "2025-01-16", Created_by: "EMP001" },
    { QC_NO: "QC-2025-001", Item_Code: "ITM002", Item_Name: "TMT Bar 12mm Fe500D", Inspection_Type: "Mechanical",  Instrument_Name: "UTM Machine",     Actual_Value: "498",  Spec: "≥500 N/mm2",Min_Val: 500,  Max_Val: 999, Tolerance_Type: "Min",   Result_Status: "Fail",   Statsu: "A", QC_Date: "2025-01-16", Created_Date: "2025-01-16", Created_by: "EMP001" },
    { QC_NO: "QC-2025-002", Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",  Inspection_Type: "Dimensional", Instrument_Name: "Vernier Caliper", Actual_Value: "8.0",  Spec: "8±0.3mm",   Min_Val: 7.7,  Max_Val: 8.3, Tolerance_Type: "Range", Result_Status: "Pass",   Statsu: "A", QC_Date: "2025-01-22", Created_Date: "2025-01-22", Created_by: "EMP001" },
];

// GRNQCDetails cols: GQ_Doc_No, GQ_Part_Name, GQ_Type, GQ_Result, GQ_Status
const demoGRNQCDetails = [
    { GQ_Doc_No: "GRN-2025-001", GQ_Part_Name: "TMT Bar 12mm Fe500D", GQ_Type: "Incoming", GQ_Result: "Conditional Accept", GQ_Status: "A", GQ_Part_No: "ITM002", GQ_Rec_No: "QC-2025-001", GQ_Description: "Yield strength marginal", GQ_Remark: "Some samples below 500 N/mm2", GQ_Specification: "Fe500D", GQ_Min: 500, GQ_Max: 600, GQ_CreatedDate: "2025-01-16", GQ_CreatedBy: "EMP001", Entry_Type: "GRN" },
];

// NCDetails cols: Part_Name, Part_No, QC_Qty, NC_Status, QC_Status
const demoNCDetails = [
    { Part_No: "ITM002", Part_Name: "TMT Bar 12mm Fe500D", GRN_NO: "GRN-2025-001", QC_Qty: 20, QC_Rejection_Qty: 20, QC_OK_Qty: 0, Re_work_Qty: 0, NC_Status: "Closed", QC_Status: "Rejected", Re_work_Type: "Return", Entry_Type: "GRN", QC_Remarks: "Below yield strength", NC_Date: "2025-01-16", Created_date: "2025-01-16", Created_by: "EMP001" },
];

// PRNFile cols: PF_Fille_Name, PF_Created_by, PF_Created_Date, PF_Status
const demoPRNFiles = [
    { PF_Fille_Name: "PRN-GRN-2025-001.pdf", PF_Status: "A", PF_Created_by: "EMP001", PF_Created_Date: "2025-01-16", PF_File: "" },
];

// FastenerListLink cols: Order_No, Assembly_Name, Assembly_Part_Name, Sub_Group_Name, Status
const demoFastenerListLinks = [
    { Order_No: "FLL-2025-001", Assembly_Name: "Steel Frame Assembly",  Assembly_Part_Name: "Hex Bolt M12x50",   Sub_Group_Name: "Standard Fasteners", Sub_Group_Part_Name: "Hex Nut M12",   Status: "A", Created_Date: "2025-01-01", Created_By: "EMP001", Update_Date: "" },
    { Order_No: "FLL-2025-002", Assembly_Name: "Fabrication Structure", Assembly_Part_Name: "Grinding Wheel 7in",Sub_Group_Name: "Consumables",         Sub_Group_Part_Name: "Safety Gloves", Status: "A", Created_Date: "2025-01-01", Created_By: "EMP001", Update_Date: "" },
];

// PartFileDrawing cols: Part_Name, Group_Name, File_Name, Created_By, Status
const demoPartFileDrawings = [
    { Part_Name: "TMT Bar 8mm Fe500D",  Group_Name: "TMT Bars",   File_Name: "TMT-8mm-DRW.pdf",  Status: "A", File_Location: "/drawings/TMT-8mm-DRW.pdf",  Created_By: "EMP001", Created_Date: "2025-01-01", Upload_Date: "2025-01-01" },
    { Part_Name: "TMT Bar 12mm Fe500D", Group_Name: "TMT Bars",   File_Name: "TMT-12mm-DRW.pdf", Status: "A", File_Location: "/drawings/TMT-12mm-DRW.pdf", Created_By: "EMP001", Created_Date: "2025-01-01", Upload_Date: "2025-01-01" },
];

// ── DRAWING ───────────────────────────────────────────────────────

// DrawingMaster cols: DM_Drawing_Name, DM_Status, DM_Created_by, DM_Created_Date
const demoDrawingMasters = [
    { DM_Drawing_Name: "Flanged Steel Bracket",  DM_Status: "A", DM_Created_by: "EMP001", DM_Created_Date: "2025-01-05" },
    { DM_Drawing_Name: "MS Pipe Support Frame",  DM_Status: "A", DM_Created_by: "EMP001", DM_Created_Date: "2025-01-05" },
    { DM_Drawing_Name: "Hex Bolt Detail Sheet",  DM_Status: "A", DM_Created_by: "EMP001", DM_Created_Date: "2025-01-05" },
];

// DrawingDetails cols: DD_Job_Number, DD_Drwaing_Number, DD_Drawing_Name, Dd_Item_Name, DD_Status
const demoDrawingDetails = [
    { DD_Job_Number: "JO-2025-001", DD_Drwaing_Number: "DRW-001", DD_Drawing_Name: "Flanged Steel Bracket - Front View",  Dd_Item_Name: "Steel Bracket",  DD_Status: "A", DD_Note: "As per IS:2062", DD_Revsion: 2, DD_Created_by: "EMP001", DD_Created_date: "2025-01-05", DD_Tecnical_Issue_Date: "2025-01-05" },
    { DD_Job_Number: "JO-2025-001", DD_Drwaing_Number: "DRW-001", DD_Drawing_Name: "Flanged Steel Bracket - Section View", Dd_Item_Name: "Steel Bracket",  DD_Status: "A", DD_Note: "",             DD_Revsion: 2, DD_Created_by: "EMP001", DD_Created_date: "2025-01-05" },
    { DD_Job_Number: "JO-2025-002", DD_Drwaing_Number: "DRW-002", DD_Drawing_Name: "MS Pipe Support Frame",                Dd_Item_Name: "Pipe Frame",     DD_Status: "A", DD_Note: "",             DD_Revsion: 0, DD_Created_by: "EMP001", DD_Created_date: "2025-01-05" },
];

// DrawingRevisionDetails cols: DRD_Job_Number, DRD_Drwaing_Number, DRD_Drawing_Name, DRD_Revsion, DRD_Status
const demoDrawingRevisionDetails = [
    { DRD_Job_Number: "JO-2025-001", DRD_Drwaing_Number: "DRW-001", DRD_Drawing_Name: "Flanged Steel Bracket v1", Dd_Item_Name: "Steel Bracket", DRD_Revsion: 0, DRD_Status: "A", DRD_Note: "Initial release",        DRD_Created_by: "EMP001", DRD_Created_date: "2024-06-01", DRD_Tecnical_Issue_Date: "2024-06-01" },
    { DRD_Job_Number: "JO-2025-001", DRD_Drwaing_Number: "DRW-001", DRD_Drawing_Name: "Flanged Steel Bracket v2", Dd_Item_Name: "Steel Bracket", DRD_Revsion: 1, DRD_Status: "A", DRD_Note: "Tolerance updated",     DRD_Created_by: "EMP001", DRD_Created_date: "2024-09-15" },
    { DRD_Job_Number: "JO-2025-001", DRD_Drwaing_Number: "DRW-001", DRD_Drawing_Name: "Flanged Steel Bracket v3", Dd_Item_Name: "Steel Bracket", DRD_Revsion: 2, DRD_Status: "A", DRD_Note: "Weld symbols added",    DRD_Created_by: "EMP001", DRD_Created_date: "2025-01-05" },
];

// ── AUTOMATION ────────────────────────────────────────────────────

// AutoPoDetails — uses Row_Id, Item_Code, Item_Name, Qty, Status
const demoAutoPoDetails = [
    { Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D",   Ledger_Name: "Tata Steel Dealers", Qty: 200, Closing_Qty: 305, Re_Order_Qty: 1000, Po_Qty: 0, Job_Qty: 0, GRN_Qty: 0, Rate: 55, Total_Amount: 55000, Net_Total: 55000, poqty: 0, Autoqty: 0, stockqty: 305, Order_Type: "Auto", Po_Status: "Pending", Status: "A", Source: "CCMS", Created_Date: "2025-01-18", Po_Created_Date: "" },
    { Item_Code: "ITM004", Item_Name: "Grinding Wheel 7inch", Ledger_Name: "Stanley Tools India",  Qty: 50,  Closing_Qty: 15,  Re_Order_Qty: 50,   Po_Qty: 0, Job_Qty: 0, GRN_Qty: 0, Rate: 45, Total_Amount: 2250,  Net_Total: 2250,  poqty: 0, Autoqty: 0, stockqty: 15,  Order_Type: "Auto", Po_Status: "Pending", Status: "A", Source: "CCMS", Created_Date: "2025-01-18", Po_Created_Date: "" },
];

const demoAutoPoDetailsTrack = [
    { Item_Code: "ITM001", Item_Name: "TMT Bar 8mm Fe500D", Ledger_Name: "Tata Steel Dealers", Qty: 200, Closing_Qty: 305, Re_Order_Qty: 1000, Po_Qty: 1000, Po_Status: "Converted", Status: "A", Source: "CCMS", Po_No: "PO-2025-AUTO-001", Created_Date: "2025-01-19", Po_Created_Date: "2025-01-19" },
];

// GeneralFileUpload cols: Job_No, File_Name, Item_Name, Customer_Name, Status
const demoGeneralFileUploads = [
    { Job_No: "JO-2025-001", Drawing_No: "DRW-001", File_Name: "Company Logo.png",       Item_Name: "Logo",               Customer_Name: "VELSON Industries",Status: "A", Industry_Type: "General",    Created_By: "EMP001", Created_Date: "2025-01-05" },
    { Job_No: "",            Drawing_No: "",         File_Name: "Quality Policy 2025.pdf", Item_Name: "Quality Policy",     Customer_Name: "Internal",         Status: "A", Industry_Type: "Quality",    Created_By: "EMP001", Created_Date: "2025-01-10" },
    { Job_No: "",            Drawing_No: "",         File_Name: "ISO Certificate.pdf",     Item_Name: "ISO 9001 Cert",      Customer_Name: "Internal",         Status: "A", Industry_Type: "Compliance", Created_By: "EMP001", Created_Date: "2025-01-15" },
];

// CurrentEditDetails cols: Part_No, Part_Name, Old_Qty, New_Qty, Created_By
const demoCurrentEditDetails = [
    { Part_No: "ITM001", Part_Name: "TMT Bar 8mm Fe500D", Old_Qty: 205, New_Qty: 200, Remark: "Data entry correction", Barcode: "BC-ITM001-001", Inward_Ref_Id: "GRN-2025-001", Created_By: "EMP001", Created_Date: "2025-01-23" },
];

// ErrorLogs cols: User_Name, System_Name, Execution_Time, Error_MSG
const demoErrorLogs = [
    { User_Name: "EMP004", System_Name: "SERVER01", Execution_Time: "2025-01-20 09:15:00", Error_MSG: "Supplier code not found: SUP999",     SQL_query: "SELECT * FROM suppliers WHERE supplierCode = 'SUP999'", Created_Date: "2025-01-20" },
    { User_Name: "EMP001", System_Name: "SERVER01", Execution_Time: "2025-01-22 14:30:00", Error_MSG: "Stock quantity cannot go negative",     SQL_query: "UPDATE stock SET qty = -5 WHERE item_code = 'ITM001'",  Created_Date: "2025-01-22" },
    { User_Name: "EMP003", System_Name: "SERVER02", Execution_Time: "2025-02-01 11:00:00", Error_MSG: "PDF generation timeout after 30000ms", SQL_query: "",                                                       Created_Date: "2025-02-01" },
];

// BackupEntry uses: Bk_ID, Bk_Datetime
const demoBackupEntries = [
    { Bk_ID: "BKP-2025-001", Bk_Datetime: "2025-01-01T00:00:00" },
    { Bk_ID: "BKP-2025-002", Bk_Datetime: "2025-01-15T00:00:00" },
    { Bk_ID: "BKP-2025-003", Bk_Datetime: "2025-02-01T00:00:00" },
];

// BackupTbl uses: Bk_Id, Bk_Datetime
const demoBackupTbl = [
    { Bk_Id: "BKPTBL-001", Bk_Datetime: "2025-01-01T00:00:00" },
    { Bk_Id: "BKPTBL-002", Bk_Datetime: "2025-01-15T00:00:00" },
    { Bk_Id: "BKPTBL-003", Bk_Datetime: "2025-02-01T00:00:00" },
];

// TempEntry cols: name, Department, CONTRACTOR
const demoTempEntries = [
    { name: "Test User 1", Department: "Production",  CONTRACTOR: "Kumar Fabrications",      department_Id: "DEPT005" },
    { name: "Test User 2", Department: "Maintenance", CONTRACTOR: "Siva Welding Works",       department_Id: "DEPT001" },
];

// TestEntry cols: id  (just id)
const demoTestEntries = [
    { id: "TEST-001" },
    { id: "TEST-002" },
    { id: "TEST-003" },
];

// Test66Entry cols: item_Id, S_Id, pno
const demoTest66Entries = [
    { item_Id: "T66-ITM001", S_Id: "S001", pno: "ITM001" },
    { item_Id: "T66-ITM002", S_Id: "S002", pno: "ITM002" },
];

// Table1Entry cols: PO_PO_NO, PO_Invoice_No, PO_Date, PO_Status, PO_CreatedBy
const demoTable1Entries = [
    { PO_PO_NO: "TBL1-PO-001", PO_Invoice_No: "TBL1-INV-001", PO_Date: "2025-01-20", PO_Invoice_Date: "2025-01-20", PO_Status: "A", PO_Created_Date: "2025-01-20", PO_TransID: "T001", PO_Supllier_Id: "SUP001", PO_CreatedBy: "EMP004" },
    { PO_PO_NO: "TBL1-PO-002", PO_Invoice_No: "TBL1-INV-002", PO_Date: "2025-01-21", PO_Invoice_Date: "2025-01-21", PO_Status: "A", PO_Created_Date: "2025-01-21", PO_TransID: "T002", PO_Supllier_Id: "SUP002", PO_CreatedBy: "EMP004" },
];

// ── FINANCE ───────────────────────────────────────────────────────

// VoucherMast1 cols: REFNO, VouType, Ac_Date, Amount, STATUS
const demoVoucherMast1 = [
    { REFNO: "VM-2025-001", BOOKNO: "BK001", VouType: "Journal", Ac_Date: "2025-01-15", Amount: 129800, STATUS: "A", Book: "Purchase", Details: "Purchase payment Tata Steel",  CREATED_BY: "EMP002", CREATED_DATE: "2025-01-15" },
    { REFNO: "VM-2025-002", BOOKNO: "BK001", VouType: "Sales",   Ac_Date: "2025-01-20", Amount: 147500, STATUS: "A", Book: "Sales",    Details: "Sales invoice ABC Engineering", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-20" },
    { REFNO: "VM-2025-003", BOOKNO: "BK001", VouType: "Expense", Ac_Date: "2025-01-31", Amount: 3500,   STATUS: "A", Book: "Expense",  Details: "Freight charges Jan batch",     CREATED_BY: "EMP002", CREATED_DATE: "2025-01-31" },
];

// VoucherEntry1 cols: BOOKNO, ACC_Type_Name, AC_DATE, AMT, STATUS
const demoVoucherEntry1 = [
    { BOOKNO: "BK001", REFNO: "VM-2025-001", ACC_Type_Name: "Tata Steel Dealers", NARRATION: "Purchase payment",      NARRATION1: "Jan batch", AC_DATE: "2025-01-15", AMT: 129800, VOUTYPE: "Credit", STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-15" },
    { BOOKNO: "BK001", REFNO: "VM-2025-001", ACC_Type_Name: "HDFC Bank Current",  NARRATION: "Bank payment to Tata",  NARRATION1: "",          AC_DATE: "2025-01-15", AMT: 129800, VOUTYPE: "Debit",  STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-15" },
    { BOOKNO: "BK001", REFNO: "VM-2025-002", ACC_Type_Name: "ABC Engineering",    NARRATION: "Sales receivable",      NARRATION1: "SI-2025-001",AC_DATE: "2025-01-20", AMT: 147500, VOUTYPE: "Debit",  STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-20" },
    { BOOKNO: "BK001", REFNO: "VM-2025-002", ACC_Type_Name: "VELSON Sales A/c",   NARRATION: "Revenue SI-2025-001",   NARRATION1: "",          AC_DATE: "2025-01-20", AMT: 147500, VOUTYPE: "Credit", STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-20" },
];

// Adjustment1 — uses ROWID, BOOKNO, REFNO, NARRATION, CRAMT, DBAMT, STATUS
const demoAdjustment1 = [
    { BOOKNO: "BK001", REFNO: "ADJ-2025-001", NARRATION: "Monthly bank charges Jan 2025",  NARRATION1: "Bank fees", CRAMT: 0,    DBAMT: 500,  TYPE: "Charge",   VOUTYPE: "Journal", STATUS: "A", AC_DATE: "2025-01-31", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-31" },
    { BOOKNO: "BK001", REFNO: "ADJ-2025-002", NARRATION: "Interest earned Jan 2025",        NARRATION1: "Interest",  CRAMT: 1250, DBAMT: 0,    TYPE: "Interest", VOUTYPE: "Journal", STATUS: "A", AC_DATE: "2025-01-31", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-31" },
];

// AccountTran1 cols (custom — mapped to table display): TRANS_ID, AC_DATE...
const demoAccountTran1 = [
    { AC_DATE: "2025-01-15", AC_CRAMT: 0,      AC_DBAMT: 129800, STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-15" },
    { AC_DATE: "2025-01-20", AC_CRAMT: 100000, AC_DBAMT: 0,      STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-20" },
    { AC_DATE: "2025-01-31", AC_CRAMT: 0,      AC_DBAMT: 500,    STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-31" },
];

// DayBook1 cols: BILLNO, Narration1, AC_Date, AC_CRAMT1, AC_DBAMT1, STATUS
const demoDayBook1 = [
    { BILLNO: "VM-2025-001", VOUR_REFNO: "ADJ-001", Narration1: "Purchase payment Tata Steel", Narration2: "", AC_Date: "2025-01-15", AC_CRAMT1: 129800, AC_DBAMT1: 129800, AC_CRAMT2: 0, AC_DBAMT2: 0, VOURTYPE: "Journal", STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-15", BILL_MODE: "Bank" },
    { BILLNO: "VM-2025-002", VOUR_REFNO: "ADJ-002", Narration1: "Sales invoice ABC Engineering",Narration2: "", AC_Date: "2025-01-20", AC_CRAMT1: 147500, AC_DBAMT1: 100000, AC_CRAMT2: 0, AC_DBAMT2: 0, VOURTYPE: "Sales",   STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-20", BILL_MODE: "Credit" },
    { BILLNO: "VM-2025-003", VOUR_REFNO: "ADJ-003", Narration1: "Freight charges",              Narration2: "", AC_Date: "2025-01-31", AC_CRAMT1: 0,      AC_DBAMT1: 3500,   AC_CRAMT2: 0, AC_DBAMT2: 0, VOURTYPE: "Expense", STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-31", BILL_MODE: "Cash" },
];

// DayTotal1 cols: AC_DATE, AC_CRAMT1, AC_DBAMT1, AC_CRAMT2, STATUS
const demoDayTotal1 = [
    { AC_DATE: "2025-01-15", AC_CRAMT1: 129800, AC_DBAMT1: 129800, AC_CRAMT2: 0, AC_DBAMT2: 0, STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-15" },
    { AC_DATE: "2025-01-31", AC_CRAMT1: 1250,   AC_DBAMT1: 500,    AC_CRAMT2: 0, AC_DBAMT2: 0, STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-31" },
];

// PaymentMaster1 cols: BOOK_NO, PRINT_NAME, VOUDATE, VOU_AMT, STATUS
const demoPaymentMaster1 = [
    { BOOK_NO: "BK001", PRINT_NAME: "Tata Steel Dealers",    VOUDATE: "2025-01-15", VOU_AMT: 129800, STATUS: "A", VOUTYPE: "Payment", CHQ_TYPE: "NEFT",  PAYMEN_TYPE: "Supplier", COLL_STATUS: "Cleared", MODE: "Bank", BANK: "HDFC Bank", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-15" },
    { BOOK_NO: "BK001", PRINT_NAME: "Ravi Transport Services",VOUDATE: "2025-01-22", VOU_AMT: 3500,   STATUS: "A", VOUTYPE: "Payment", CHQ_TYPE: "Cash",  PAYMEN_TYPE: "Transport", COLL_STATUS: "Cleared", MODE: "Cash",                    CREATED_BY: "EMP002", CREATED_DATE: "2025-01-22" },
];

// AutoVoucherPaymentAdj1 — BILLNO, VOUDATE, VOUCHER_TYPE
const demoAutoVoucherPaymentAdj1 = [
    { BILLNO: "VM-2025-001", VOUDATE: "2025-01-15", ENTRYDATE: "2025-01-15", SYSTEM_NAME: "SERVER01", VOUCHER_TYPE: "Payment", BOOK_TYPE: "Purchase", ENTRY_TYPE: "Auto", VOUNO: "AV-001", REF_VOUNO: "VM-2025-001" },
];

const demoAutoVoucherPaymentCash1 = [
    { BILLNO: "VM-2025-003", VOUDATE: "2025-01-22", ENTRYDATE: "2025-01-22", SYSTEM_NAME: "SERVER01", VOUCHER_TYPE: "Cash", BOOK_TYPE: "Expense", ENTRY_TYPE: "Auto", VOUNO: "AVC-001", REF_VOUNO: "VM-2025-003" },
];

// ReceiptMaster1 cols: BOOK_NO, PRINT_NAME, VOUDATE, VOU_AMT, STATUS
const demoReceiptMaster1 = [
    { BOOK_NO: "BK002", PRINT_NAME: "ABC Engineering",  VOUDATE: "2025-01-20", VOU_AMT: 100000, STATUS: "A", VOUTYPE: "Receipt", CHQ_TYPE: "NEFT", PAYMEN_TYPE: "Customer", COLL_STATUS: "Cleared", MODE: "Bank", BANK: "HDFC Bank", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-20" },
    { BOOK_NO: "BK002", PRINT_NAME: "XYZ Fabricators",  VOUDATE: "2025-02-25", VOU_AMT: 100300, STATUS: "A", VOUTYPE: "Receipt", CHQ_TYPE: "NEFT", PAYMEN_TYPE: "Customer", COLL_STATUS: "Cleared", MODE: "Bank", BANK: "HDFC Bank", CREATED_BY: "EMP002", CREATED_DATE: "2025-02-25" },
];

// ReceiptTrans1 cols: BILLNO, NARRATION, VOUDATE, VOU_AMT, STATUS
const demoReceiptTrans1 = [
    { BILLNO: "SI-2025-001", BOOK_NO: "BK002", NARRATION: "Partial payment ABC Engineering", VOUDATE: "2025-01-20", VOU_AMT: 100000, BILL_AMT: 147500, ADJ_AMT: 100000, REC_AMT: 100000, BAL_AMT: 47500, SET_AMT: 0, ADV_AMT: 0, ODINT_AMT: 0, VOUTYPE: "Receipt", STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-01-20" },
    { BILLNO: "SI-2025-002", BOOK_NO: "BK002", NARRATION: "Full payment XYZ Fabricators",    VOUDATE: "2025-02-25", VOU_AMT: 100300, BILL_AMT: 100300, ADJ_AMT: 100300, REC_AMT: 100300, BAL_AMT: 0,     SET_AMT: 0, ADV_AMT: 0, ODINT_AMT: 0, VOUTYPE: "Receipt", STATUS: "A", CREATED_BY: "EMP002", CREATED_DATE: "2025-02-25" },
];

const demoAutoVoucherReceiptAdj1 = [
    { BILLNO: "REC-2025-001", VOUDATE: "2025-01-20", ENTRYDATE: "2025-01-20", SYSTEM_NAME: "SERVER01", VOUCHER_TYPE: "Receipt", BOOK_TYPE: "Sales", ENTRY_TYPE: "Auto", VOUNO: "AVR-001", REF_VOUNO: "VM-2025-002" },
];

const demoAutoVoucherReceiptCash1 = [
    { BILLNO: "CASH-2025-001", VOUDATE: "2025-01-05", ENTRYDATE: "2025-01-05", SYSTEM_NAME: "SERVER01", VOUCHER_TYPE: "Cash", BOOK_TYPE: "Sales", ENTRY_TYPE: "Auto", VOUNO: "AVRC-001", REF_VOUNO: "" },
];

// ════════════════════════════════════════════════════════════════
//  SEED MAP  — table → data (all 137 entities)
// ════════════════════════════════════════════════════════════════
const seedMap = [
    // Core masters
    { table: "companies",                        data: demoCompanies,                    name: "Companies" },
    { table: "employees",                         data: demoEmployees,                    name: "Employees" },
    { table: "contractors",                        data: demoContractors,                  name: "Contractors" },
    { table: "suppliers",                          data: demoSuppliers,                    name: "Suppliers" },
    { table: "machines",                           data: demoMachines,                     name: "Machines" },
    { table: "processes",                          data: demoProcesses,                    name: "Processes" },
    { table: "group_master",                       data: demoGroupMasters,                 name: "GroupMasters" },
    { table: "accounts",                           data: demoAccounts,                     name: "Accounts" },
    { table: "item_groups",                        data: demoItemGroups,                   name: "ItemGroups" },
    { table: "items",                              data: demoItems,                        name: "Items" },
    { table: "characteristics",                    data: demoCharacteristics,              name: "Characteristics" },
    { table: "service_jobs",                       data: demoServiceJobs,                  name: "ServiceJobs" },
    { table: "reference_groups",                   data: demoReferenceGroups,              name: "ReferenceGroups" },
    { table: "references",                         data: demoReferences,                   name: "References" },
    { table: "taxes",                              data: demoTaxes,                        name: "Taxes" },
    // Frontend-specific masters
    { table: "customers",                          data: demoCustomers,                    name: "Customers" },
    { table: "vehicles",                           data: demoVehicles,                     name: "Vehicles" },
    { table: "reference_group_values",             data: demoReferenceGroupValues,         name: "ReferenceGroupValues" },
    { table: "ledger_masters",                     data: demoLedgerMasters,                name: "LedgerMasters" },
    { table: "tax_masters",                        data: demoTaxMasters,                   name: "TaxMasters" },
    { table: "users",                              data: demoUsers,                        name: "Users" },
    { table: "roles",                              data: demoRoles,                        name: "Roles" },
    { table: "menus",                              data: demoMenus,                        name: "Menus" },
    { table: "qc_check_methods",                   data: demoQCCheckMethods,               name: "QCCheckMethods" },
    { table: "qc_inspection_chars",                data: demoQCInspectionChars,            name: "QCInspectionChars" },
    { table: "system_info",                        data: demoSystemInfo,                   name: "SystemInfo" },
    // Sales
    { table: "quotations",                         data: demoQuotations,                   name: "Quotations" },
    { table: "quotation_details",                  data: demoQuotationDetails,             name: "QuotationDetails" },
    { table: "quotation_file_uploads",             data: demoQuotationFileUploads,         name: "QuotationFileUploads" },
    { table: "quotation_masters",                  data: demoQuotationMasters,             name: "QuotationMasters" },
    { table: "quotation_trans",                    data: demoQuotationTrans,               name: "QuotationTrans" },
    { table: "quotation_sales_masters",            data: demoQuotationSalesMasters,        name: "QuotationSalesMasters" },
    { table: "quotation_sales_trans",              data: demoQuotationSalesTrans,          name: "QuotationSalesTrans" },
    { table: "quote_requests",                     data: demoQuoteRequests,                name: "QuoteRequests" },
    { table: "quote_request_details",              data: demoQuoteRequestDetails,          name: "QuoteRequestDetails" },
    { table: "sales_masters",                      data: demoSalesMasters,                 name: "SalesMasters" },
    { table: "sales_trans",                        data: demoSalesTrans,                   name: "SalesTrans" },
    { table: "sales_plans",                        data: demoSalesPlans,                   name: "SalesPlans" },
    { table: "bills_out",                          data: demoBillsOut,                     name: "BillsOut" },
    { table: "dc_sales_masters",                   data: demoDCSalesMasters,               name: "DCSalesMasters" },
    { table: "dc_sales_trans",                     data: demoDCSalesTrans,                 name: "DCSalesTrans" },
    { table: "conformation_masters",               data: demoConformationMasters,          name: "ConformationMasters" },
    { table: "conformation_details",               data: demoConformationDetails,          name: "ConformationDetails" },
    { table: "conformation_final_masters",         data: demoConformationFinalMasters,     name: "ConformationFinalMasters" },
    { table: "conformation_final_details",         data: demoConformationFinalDetails,     name: "ConformationFinalDetails" },
    // Purchase
    { table: "purchase_requests",                  data: demoPurchaseRequests,             name: "PurchaseRequests" },
    { table: "purchase_orders",                    data: demoPurchaseOrders,               name: "PurchaseOrders" },
    { table: "purchase_orders2",                   data: demoPurchaseOrders2,              name: "PurchaseOrders2" },
    { table: "purchase_order_details",             data: demoPurchaseOrderDetails,         name: "PurchaseOrderDetails" },
    { table: "purchase_order_details2",            data: demoPurchaseOrderDetails2,        name: "PurchaseOrderDetails2" },
    { table: "purchase_freight",                   data: demoPurchaseFreight,              name: "PurchaseFreight" },
    { table: "purchase_price_link",                data: demoPurchasePriceLink,            name: "PurchasePriceLink" },
    { table: "po_masters",                         data: demoPOMasters,                    name: "POMasters" },
    { table: "po_orders",                          data: demoPOOrders,                     name: "POOrders" },
    { table: "po_order_details",                   data: demoPOOrderDetails,               name: "POOrderDetails" },
    { table: "gate_entries",                       data: demoGateEntries,                  name: "GateEntries" },
    { table: "gate_entry_details",                 data: demoGateEntryDetails,             name: "GateEntryDetails" },
    { table: "grn_entries",                        data: demoGRNEntries,                   name: "GRNEntries" },
    { table: "grn_entry_details",                  data: demoGRNEntryDetails,              name: "GRNEntryDetails" },
    { table: "grn_entry_details_track",            data: demoGRNEntryDetailsTrack,         name: "GRNEntryDetailsTrack" },
    { table: "grn_entry_track",                    data: demoGRNEntryTrack,                name: "GRNEntryTrack" },
    { table: "grn_freight_details",                data: demoGRNFreightDetails,            name: "GRNFreightDetails" },
    { table: "grn_return_details",                 data: demoGRNReturnDetails,             name: "GRNReturnDetails" },
    // Inventory
    { table: "material_requests",                  data: demoMaterialRequests,             name: "MaterialRequests" },
    { table: "material_requests1",                 data: demoMaterialRequests1,            name: "MaterialRequests1" },
    { table: "material_inward",                    data: demoMaterialInward,               name: "MaterialInward" },
    { table: "material_issue",                     data: demoMaterialIssue,                name: "MaterialIssue" },
    { table: "material_issue1",                    data: demoMaterialIssue1,               name: "MaterialIssue1" },
    { table: "stock_inward",                       data: demoStockInward,                  name: "StockInward" },
    { table: "stock_outward",                      data: demoStockOutward,                 name: "StockOutward" },
    { table: "stock_outward_correction",           data: demoStockOutwardCorrection,       name: "StockOutwardCorrection" },
    { table: "stock_outward_correction_del",       data: demoStockOutwardCorrectionDel,    name: "StockOutwardCorrectionDel" },
    { table: "stock_liability1",                   data: demoStockLiability1,              name: "StockLiability1" },
    { table: "stock_liability3",                   data: demoStockLiability3,              name: "StockLiability3" },
    { table: "stock_liability_track",              data: demoStockLiabilityTrack,          name: "StockLiabilityTrack" },
    { table: "index_masters",                      data: demoIndexMasters,                 name: "IndexMasters" },
    { table: "index_creation",                     data: demoIndexCreation,                name: "IndexCreation" },
    { table: "index_creation_track",               data: demoIndexCreationTrack,           name: "IndexCreationTrack" },
    { table: "main_index_masters",                 data: demoMainIndexMasters,             name: "MainIndexMasters" },
    { table: "main_index_details",                 data: demoMainIndexDetails,             name: "MainIndexDetails" },
    { table: "ccms_entries",                       data: demoCCMSEntries,                  name: "CCMSEntries" },
    // Production
    { table: "job_entries",                        data: demoJobEntries,                   name: "JobEntries" },
    { table: "job_entry_details",                  data: demoJobEntryDetails,              name: "JobEntryDetails" },
    { table: "job_entry_details_update",           data: demoJobEntryDetailsUpdate,        name: "JobEntryDetailsUpdate" },
    { table: "job_entry_details_audit",            data: demoJobEntryDetailsAudit,         name: "JobEntryDetailsAudit" },
    { table: "job_file_uploads",                   data: demoJobFileUploads,               name: "JobFileUploads" },
    { table: "job_spare_entries",                  data: demoJobSpareEntries,              name: "JobSpareEntries" },
    { table: "approved_details",                   data: demoApprovedDetails,              name: "ApprovedDetails" },
    { table: "process_card_main",                  data: demoProcessCardMain,              name: "ProcessCardMain" },
    { table: "process_card_details",               data: demoProcessCardDetails,           name: "ProcessCardDetails" },
    { table: "process_card_tracking",              data: demoProcessCardTracking,          name: "ProcessCardTracking" },
    { table: "jobcard_rm_issue_master",            data: demoJobcardRMIssueMaster,         name: "JobcardRMIssueMaster" },
    { table: "jobcard_rm_issue_details",           data: demoJobcardRMIssueDetails,        name: "JobcardRMIssueDetails" },
    { table: "breakdown_entries",                  data: demoBreakdownEntries,             name: "BreakdownEntries" },
    // Delivery
    { table: "delivery_challans",                  data: demoDeliveryChallans,             name: "DeliveryChallans" },
    { table: "delivery_challan_details",           data: demoDeliveryChallanDetails,       name: "DeliveryChallanDetails" },
    { table: "dc_mains",                           data: demoDCMains,                      name: "DCMains" },
    { table: "dc_details",                         data: demoDCDetails,                    name: "DCDetails" },
    { table: "nc_dc_mains",                        data: demoNCDCMains,                    name: "NCDCMains" },
    { table: "nc_dc_details",                      data: demoNCDCDetails,                  name: "NCDCDetails" },
    // Service
    { table: "booking_masters",                    data: demoBookingMasters,               name: "BookingMasters" },
    { table: "booking_service_details",            data: demoBookingServiceDetails,        name: "BookingServiceDetails" },
    { table: "booking_service_spare_lists",        data: demoBookingServiceSpareLists,     name: "BookingServiceSpareLists" },
    { table: "service_orders",                     data: demoServiceOrders,                name: "ServiceOrders" },
    { table: "service_order_details",              data: demoServiceOrderDetails,          name: "ServiceOrderDetails" },
    { table: "service_requests",                   data: demoServiceRequests,              name: "ServiceRequests" },
    { table: "service_trans",                      data: demoServiceTrans,                 name: "ServiceTrans" },
    { table: "part_spare_lists",                   data: demoPartSpareLists,               name: "PartSpareLists" },
    { table: "service_bill_masters",               data: demoServiceBillMasters,           name: "ServiceBillMasters" },
    { table: "service_bill_trans",                 data: demoServiceBillTrans,             name: "ServiceBillTrans" },
    { table: "service_bill_labour_charges",        data: demoServiceBillLabourCharges,     name: "ServiceBillLabourCharges" },
    { table: "temp_service_bill_masters",          data: demoTempServiceBillMasters,       name: "TempServiceBillMasters" },
    { table: "temp_service_bill_trans",            data: demoTempServiceBillTrans,         name: "TempServiceBillTrans" },
    { table: "temp_service_bill_labour_charges",   data: demoTempServiceBillLabourCharges, name: "TempServiceBillLabourCharges" },
    // Quality
    { table: "qc_entries",                         data: demoQCEntries,                    name: "QCEntries" },
    { table: "qc_entry_details",                   data: demoQCEntryDetails,               name: "QCEntryDetails" },
    { table: "grn_qc_details",                     data: demoGRNQCDetails,                 name: "GRNQCDetails" },
    { table: "nc_details",                         data: demoNCDetails,                    name: "NCDetails" },
    { table: "prn_files",                          data: demoPRNFiles,                     name: "PRNFiles" },
    { table: "fastener_list_links",                data: demoFastenerListLinks,            name: "FastenerListLinks" },
    { table: "part_file_drawings",                 data: demoPartFileDrawings,             name: "PartFileDrawings" },
    // Drawing
    { table: "drawing_masters",                    data: demoDrawingMasters,               name: "DrawingMasters" },
    { table: "drawing_details",                    data: demoDrawingDetails,               name: "DrawingDetails" },
    { table: "drawing_revision_details",           data: demoDrawingRevisionDetails,       name: "DrawingRevisionDetails" },
    // Automation
    { table: "auto_po_details",                    data: demoAutoPoDetails,                name: "AutoPoDetails" },
    { table: "auto_po_details_track",              data: demoAutoPoDetailsTrack,           name: "AutoPoDetailsTrack" },
    { table: "general_file_uploads",               data: demoGeneralFileUploads,           name: "GeneralFileUploads" },
    { table: "current_edit_details",               data: demoCurrentEditDetails,           name: "CurrentEditDetails" },
    { table: "error_logs",                         data: demoErrorLogs,                    name: "ErrorLogs" },
    { table: "backup_entries",                     data: demoBackupEntries,                name: "BackupEntries" },
    { table: "backup_tbl",                         data: demoBackupTbl,                    name: "BackupTbl" },
    { table: "temp_entries",                       data: demoTempEntries,                  name: "TempEntries" },
    { table: "test_entries",                       data: demoTestEntries,                  name: "TestEntries" },
    { table: "test66_entries",                     data: demoTest66Entries,                name: "Test66Entries" },
    { table: "table1_entries",                     data: demoTable1Entries,                name: "Table1Entries" },
    // Finance
    { table: "voucher_mast1",                      data: demoVoucherMast1,                 name: "VoucherMast1" },
    { table: "voucher_entry1",                     data: demoVoucherEntry1,                name: "VoucherEntry1" },
    { table: "adjustment1",                        data: demoAdjustment1,                  name: "Adjustment1" },
    { table: "account_tran1",                      data: demoAccountTran1,                 name: "AccountTran1" },
    { table: "day_book1",                          data: demoDayBook1,                     name: "DayBook1" },
    { table: "day_total1",                         data: demoDayTotal1,                    name: "DayTotal1" },
    { table: "payment_master1",                    data: demoPaymentMaster1,               name: "PaymentMaster1" },
    { table: "auto_voucher_payment_adj1",          data: demoAutoVoucherPaymentAdj1,       name: "AutoVoucherPaymentAdj1" },
    { table: "auto_voucher_payment_cash1",         data: demoAutoVoucherPaymentCash1,      name: "AutoVoucherPaymentCash1" },
    { table: "receipt_master1",                    data: demoReceiptMaster1,               name: "ReceiptMaster1" },
    { table: "receipt_trans1",                     data: demoReceiptTrans1,                name: "ReceiptTrans1" },
    { table: "auto_voucher_receipt_adj1",          data: demoAutoVoucherReceiptAdj1,       name: "AutoVoucherReceiptAdj1" },
    { table: "auto_voucher_receipt_cash1",         data: demoAutoVoucherReceiptCash1,      name: "AutoVoucherReceiptCash1" },
];

// ════════════════════════════════════════════════════════════════
//  seedDatabase — inserts only if table is empty
// ════════════════════════════════════════════════════════════════
const seedDatabase = async () => {
    console.log("\n🌱 Checking and seeding tables...");
    let seededCount = 0, skippedCount = 0;

    for (const { table, data, name } of seedMap) {
        try {
            const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM "${table}"`);
            if (rows[0].count === 0) {
                const values = data.map((_, i) => `($${i + 1})`).join(", ");
                const params = data.map((d) => JSON.stringify(d));
                await pool.query(`INSERT INTO "${table}" (data) VALUES ${values}`, params);
                console.log(`   ✅ ${name}: seeded ${data.length} records`);
                seededCount++;
            } else {
                console.log(`   📦 ${name}: already has ${rows[0].count} records — skipped`);
                skippedCount++;
            }
        } catch (error) {
            console.error(`   ❌ ${name}: seeding failed — ${error.message}`);
        }
    }
    console.log(`\n🌱 Seeding complete: ${seededCount} seeded, ${skippedCount} skipped.\n`);
};

// ════════════════════════════════════════════════════════════════
//  reseedAll — clears & reseeds every table (npm run seed:reset)
// ════════════════════════════════════════════════════════════════
const reseedAll = async () => {
    console.log("\n🔄 Clearing all tables and reseeding...");
    for (const { table, name } of seedMap) {
        try {
            await pool.query(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
            console.log(`   🗑️  ${name}: cleared`);
        } catch (err) {
            console.error(`   ❌ ${name}: clear failed — ${err.message}`);
        }
    }
    await seedDatabase();
    await pool.end();
};

// ════════════════════════════════════════════════════════════════
//  CLI entry — node seeds/seedData.js [--reset]
// ════════════════════════════════════════════════════════════════
if (require.main === module) {
    const { connectDB } = require("../config/db");
    const isReset = process.argv.includes("--reset");
    connectDB()
        .then(() => (isReset ? reseedAll() : seedDatabase().then(() => pool.end())))
        .catch((err) => { console.error(err); process.exit(1); });
}

module.exports = { seedDatabase, reseedAll };
