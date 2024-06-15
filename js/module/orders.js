import { connection } from "../../helpers/conexion.js";


// 5. Obtener todos los pedidos con estado 'Shipped':

export const getShippedOrders = async () => {
    const [result] = await connection.query(`
        SELECT orderNumber, orderDate, requiredDate, status 
        FROM orders 
        WHERE status = 'Shipped'
    `);
    return result;
}


// CONSULTAS MULTITABLAS

// 1. Obtener todos los pedidos realizados por un cliente específico (por ejemplo, customerNumber = 101) con detalles del producto:


export const getOrderAndCustomerInfo = async () => {
    const [result] = await connection.query(`
        SELECT 
            o.orderNumber,
            o.orderDate,
            o.requiredDate,
            o.shippedDate,
            o.status,
            c.customerNumber,
            c.customerName,
            c.contactLastName,
            c.contactFirstName
        FROM 
            orders o
        JOIN 
            customers c ON o.customerNumber = c.customerNumber
        WHERE 
            o.customerNumber = 398
    `);
    return result;
}


// 6.Obtener detalles de los pedidos, incluyendo la información del cliente y los productos ordenados:


export const getAllOrderDetails = async () => {
    const [result] = await connection.query(`
        SELECT
            orders.orderNumber,
            orders.orderDate,
            orders.status,
            customers.customerNumber,
            customers.customerName,
            customers.contactLastName,
            orderdetails.productCode,
            products.productName,
            orderdetails.quantityOrdered
        FROM
            orders
        JOIN
            customers ON orders.customerNumber = customers.customerNumber
        JOIN
            orderdetails ON orders.orderNumber = orderdetails.orderNumber
        JOIN
            products ON orderdetails.productCode = products.productCode
        ORDER BY
            orders.orderNumber;
    `);
    return result;
};


// 9.Listar todos los pedidos con detalles del cliente y el nombre del representante de ventas:

export const getOrderDetails = async () => {
    const [result] = await connection.query(`
        SELECT 
            o.orderNumber,
            o.orderDate,
            c.customerNumber,
            c.customerName,
            c.contactLastName AS customerLastName,
            e.employeeNumber AS salesRepEmployeeNumber,
            CONCAT(e.firstName, ' ', e.lastName) AS salesRepName
        FROM 
            orders o
        JOIN 
            customers c ON o.customerNumber = c.customerNumber
        LEFT JOIN 
            employees e ON c.salesRepEmployeeNumber = e.employeeNumber;
    `);
    return result;
};