import { connection } from "../../helpers/conexion.js";


// 8.Detalles de oficinas en un país específico (por ejemplo, 'USA'):

export const getOfficesInJapan = async () => {
    const [result] = await connection.query(`
        SELECT officeCode, city, phone, state, postalCode, country 
        FROM offices 
        WHERE country = 'JAPAN'
    `);
    return result;
}


// CONSULTAS MULTITABLA;


// 5.Listar todas las oficinas y el número de empleados en cada una:

export const getOfficeEmployeeCount = async () => {
    const [result] = await connection.query(`
        SELECT offices.officeCode, offices.city, COUNT(employees.employeeNumber) AS numEmpleados
        FROM offices
        LEFT JOIN employees ON offices.officeCode = employees.officeCode
        GROUP BY offices.officeCode, offices.city
    `);
    return result;
}
