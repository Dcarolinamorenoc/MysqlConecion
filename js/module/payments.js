import { connection } from "../../helpers/conexion.js";


// 4. Listar todos los pagos realizados por un cliente específico (por ejemplo, customerNumber = 101):

export const getPaymentsByCustomerNumber = async () => {
    const [result] = await connection.query(`
        SELECT customerNumber, checkNumber, paymentDate, amount 
        FROM payments 
        WHERE customerNumber = 249
    `);
    return result;
}


// CONSULTAS MULTITABLAS

export const getPaymentDetails = async () => {
    const [result] = await connection.query(`
        SELECT 
            p.customerNumber,
            c.customerName,
            c.contactLastName,
            c.contactFirstName,
            p.checkNumber,
            e.employeeNumber AS salesRepEmployeeNumber,
            e.lastName AS salesRepLastName,
            e.firstName AS salesRepFirstName
        FROM 
            payments p
        JOIN 
            customers c ON p.customerNumber = c.customerNumber
        LEFT JOIN 
            employees e ON c.salesRepEmployeeNumber = e.employeeNumber
        ORDER BY 
            p.paymentDate DESC;
    `);
    return result;
};