import { 
    getAllLastNameASC, 
    getAllLastNameDESC,
    getCustomerInfoById,
    getCustomersInNYC,
    getCustomerSalesReps,
    getCustomerPayments
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
    getProductTotalOrdered,
    getProductDetails
} from "./js/module/products.js";



import{
    getPaymentsByCustomerNumber,
    getPaymentDetails
} from "./js/module/payments.js";


import{
    getShippedOrders,
    getOrderAndCustomerInfo,
    getAllOrderDetails,
    getOrderDetails
} from "./js/module/orders.js";


import {
    getOfficesInJapan,
    getOfficeEmployeeCount
} from "./js/module/offices.js";


console.log(await getAllLastNameDESC());

// -----------------------------------------------------------------------

// Consultas de la actividad en clase


// CONSULTAS NORMALES


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


// CONSULTAS MULTITABLA


// console.log(await getOrderAndCustomerInfo());
// console.log(await getEmployeeOfficeInfo());
// console.log(await getCustomerSalesReps());
// console.log(await getProductTotalOrdered());
// console.log(await getOfficeEmployeeCount());
// console.log(await getAllOrderDetails());
// console.log(await getPaymentDetails());
// console.log(await getProductDetails());
// console.log(await getOrderDetails());
console.log(await getCustomerSalesReps());