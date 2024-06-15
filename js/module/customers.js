import { connection } from "../../helpers/conexion.js";



// Desarrolla una función asíncrona llamada getAllLastNameASC que recupere los apellidos (contactLastname) y nombres (contactFirstname) de todos los clientes de una tabla llamada customers en una base de datos MySQL, ordenados en orden ascendente por apellido.

export const getAllLastNameASC = async()=>{
    const [result] = await connection.query(`SELECT contactLastname, contactFirstname FROM customers ORDER BY contactLastname`);
    return result;
}



// Desarrolla una función asíncrona llamada getAllLastNameDESC que recupere los apellidos (contactLastname) y nombres (contactFirstname) de todos los clientes de una tabla llamada customers en una base de datos MySQL, ordenados en orden descendente por apellido.

export const getAllLastNameDESC = async()=>{
    const [result] = await connection.query(`SELECT contactLastname, contactFirstname FROM customers ORDER BY contactLastname DESC`);
    return result;
}



// -----------------------------------------------------------------------------------------------


// CONSULTAS DE LA ACTIVIDAD EN CLASE 


// 3.Detalles de un cliente específico (por ejemplo, customerNumber = 101):

export const getCustomerInfoById = async () => {
    const [result] = await connection.query(`
        SELECT 
            customerNumber, customerName, contactLastName, contactFirstName,
            phone, addressLine1, addressLine2, city, state, postalCode,
            country, salesRepEmployeeNumber, creditLimit 
        FROM customers 
        WHERE customerNumber = 249
    `);
    return result;
}


// 9.Listar todos los clientes en una ciudad específica (por ejemplo, 'Madrid'):

export const getCustomersInNYC = async () => {
    const [result] = await connection.query(`
        SELECT customerNumber, customerName, contactFirstName, contactLastName, city 
        FROM customers 
        WHERE city = 'NYC'
    `);
    return result;
}



// CONSULTAS MULTITABLA


// 3. Listar todos los clientes junto con su representante de ventas:


export const getCustomerSalesReps = async () => {
    const [result] = await connection.query(`
        SELECT 
            c.customerNumber,
            c.customerName,
            e.firstName AS salesRepFirstName,
            e.lastName AS salesRepLastName,
            e.employeeNumber,
            e.officeCode
        FROM 
            customers c
        JOIN 
            employees e ON c.salesRepEmployeeNumber = e.employeeNumber
    `);
    return result;
}


// 10.Obtener el total de pagos realizados por cada cliente y el nombre del representante de ventas asignado:

export const getCustomerPayments = async () => {
    const [result] = await connection.query(`
        SELECT 
            c.customerNumber,
            c.customerName,
            CONCAT(e.firstName, ' ', e.lastName) AS salesRepName,
            SUM(p.amount) AS totalPayments
        FROM 
            customers c
        LEFT JOIN 
            payments p ON c.customerNumber = p.customerNumber
        LEFT JOIN 
            employees e ON c.salesRepEmployeeNumber = e.employeeNumber
        GROUP BY 
            c.customerNumber, c.customerName, salesRepName
        ORDER BY 
            c.customerNumber;
    `);
    return result;
};