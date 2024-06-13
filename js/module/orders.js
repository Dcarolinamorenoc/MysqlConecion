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
