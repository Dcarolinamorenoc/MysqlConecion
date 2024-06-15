import { connection } from "../../helpers/conexion.js";


// 1.Obtener todos los productos en stock:

export const getAllProductInfo = async () => {
    const [result] = await connection.query(`SELECT productName, quantityInStock FROM products`);
    return result;
}


// 6.Cantidad total de productos en stock:

export const getTotalStockQuantity = async () => {
    const [result] = await connection.query(`
        SELECT SUM(quantityInStock) AS totalStockQuantity 
        FROM products
    `);
    return result[0].totalStockQuantity;
}


// 10.Productos con precio de compra mayor a 50:

export const getProductsAbovePrice = async () => {
    const [result] = await connection.query(`
        SELECT productCode, productName, quantityInStock, buyPrice 
        FROM products 
        WHERE buyPrice > 50
    `);
    return result;
}



// CONSULTAS MULTITABLA


// 4. Obtener el nombre y la cantidad total ordenada de cada producto:


export const getProductTotalOrdered = async () => {
    const [result] = await connection.query(`
        SELECT products.productName, SUM(orderdetails.quantityOrdered) AS total_ordered
        FROM products
        JOIN orderdetails ON products.productCode = orderdetails.productCode
        GROUP BY products.productName
    `);
    return result;
}



// 8.Obtener una lista de todos los productos, junto con sus líneas de productos y el total de cantidad ordenada:


export const getProductDetails = async () => {
    const [result] = await connection.query(`
        SELECT 
            p.productCode,
            p.productName,
            p.productLine,
            pl.textDescription AS productLineDescription,
            SUM(od.quantityOrdered) AS totalQuantityOrdered
        FROM 
            products p
        JOIN 
            productlines pl ON p.productLine = pl.productLine
        LEFT JOIN 
            orderdetails od ON p.productCode = od.productCode
        GROUP BY 
            p.productCode, p.productName, p.productLine, pl.textDescription
        ORDER BY 
            p.productCode;
    `);
    return result;
};