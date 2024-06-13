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