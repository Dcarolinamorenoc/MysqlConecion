import { 
    getAllLastNameASC, 
    getAllLastNameDESC,
    getCustomerInfoById,
    getCustomersInNYC,
    getCustomerSalesReps
} from "./js/module/customers.js";



import { getAll, 
    getAllLastName, 
    getAllFullNameJob, 
    getAllJobTitle,
    getEmployeesByOfficeCode,
    getEmployeeBossPairs,
    getEmployeeOfficeInfo
} from "./js/module/employees.js";

import {
    getAllProductInfo,
    getTotalStockQuantity,
    getProductsAbovePrice,
    getProductTotalOrdered
} from "./js/module/products.js";



import{
    getPaymentsByCustomerNumber
} from "./js/module/payments.js";


import{
    getShippedOrders,
    getOrderAndCustomerInfo
} from "./js/module/orders.js";


import {
    getOfficesInJapan,
    getOfficeEmployeeCount
} from "./js/module/offices.js";


console.log(await getAllLastNameDESC());

// -----------------------------------------------------------------------

// Consultas de la actividad en clase

// console.log(await getAllProductInfo());
// console.log(await getEmployeesByOfficeCode());
// console.log(await getCustomerInfoById());
// console.log(await getPaymentsByCustomerNumber());
// console.log(await getShippedOrders());
// console.log(await getTotalStockQuantity());
// console.log(await getEmployeeBossPairs());
// console.log(await getOfficesInJapan());
// console.log(await getCustomersInNYC());
// console.log(await getProductsAbovePrice());
// console.log(await getOrderAndCustomerInfo());
// console.log(await getEmployeeOfficeInfo());
// console.log(await getCustomerSalesReps());
// console.log(await getProductTotalOrdered());
// console.log(await getOfficeEmployeeCount());