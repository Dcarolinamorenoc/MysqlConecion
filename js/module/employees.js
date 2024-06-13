import { connection } from "../../helpers/conexion.js";



// Escribe una función asíncrona que recupere todos los apellidos (lastName) de una tabla llamada employees en una base de datos MySQL.

export const getAllLastName = async()=>{
    const [result] = await connection.query(`SELECT lastName FROM employees`);
    return result;
}



// Escribe una función asíncrona que recupere los nombres completos (fullName) y los títulos de trabajo (jobTitle) de una tabla llamada employees en una base de datos MySQL.

export const getAllFullNameJob = async()=>{
    const [result] = await connection.query(`SELECT CONCAT(firstName," ", lastName) as 'fullName', jobTitle FROM employees`);
    return result;
}



// Escribe una función asíncrona que recupere los apellidos (lastName), nombres (firstName), extensiones (extension), correos electrónicos (email), códigos de oficina (officeCode), supervisores (reportsTo) y títulos de trabajo (jobTitle) de una tabla llamada employees en una base de datos MySQL.

export const getAll = async()=>{
    const [result] = await connection.query(`SELECT lastName, firstName, extension, email, officeCode, reportsTo, jobTitle FROM employees`);
    return result;
}




// Escribe una función asíncrona que recupere los nombres completos (fullName) de los empleados con un título de trabajo específico (jobTitle) de una tabla llamada employees en una base de datos MySQL. La función debe aceptar un parámetro para el título de trabajo (jobTitle) y devolver el resultado con un conteo de registros.

export const getAllJobTitle = async({cargo} = {cargo: "Sales Rep"})=>{
    const [result] = await connection.execute(`SELECT CONCAT(firstName," ", lastName) as 'fullName' FROM employees where jobTitle = ?`, [cargo] );
    result["count"] = result.length;
    return result;
}


// -----------------------------------------------------------------------------------------------


// CONSULTAS DE LA ACTIVIDAD EN CLASE 


// 2.Lista de empleados que trabajan en una oficina específica (por ejemplo, '1'):

export const getEmployeesByOfficeCode = async () => {
    const [result] = await connection.query(`SELECT employeeNumber, firstName, lastName, officeCode FROM employees WHERE officeCode = 1`);
    return result;
}



// 7. Lista de todos los empleados con su jefe (si tienen):

export const getEmployeeBossPairs = async () => {
    const [result] = await connection.query(`
        SELECT CONCAT(e.lastName, " ", e.firstName) AS 'Empleado', 
               CONCAT(j.lastName, " ", j.firstName) AS 'Jefe' 
        FROM employees e
        JOIN employees j ON e.employeeNumber = j.reportsTo
    `);
    return result;
}



// CONSULTAS MULTITABLA:

// 2. Listar todos los empleados junto con la oficina en la que trabajan:

export const getEmployeeOfficeInfo = async () => {
    const [result] = await connection.query(`
        SELECT 
            e.employeeNumber,
            e.firstName,
            e.lastName,
            e.officeCode,
            o.city,
            o.addressLine1,
            o.country
        FROM 
            employees e
        JOIN 
            offices o ON e.officeCode = o.officeCode
    `);
    return result;
}
