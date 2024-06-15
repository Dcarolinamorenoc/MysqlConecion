1. **Obtener todos los productos en stock:**

   ```sql
   select productName, quantityInStock from products;
   ```

2. **Lista de empleados que trabajan en una oficina específica (por ejemplo, '1'):**

   ```sql
   SELECT employeeNumber, firstName, lastName, officeCode FROM employees WHERE officeCode = 1;
   ```

3. **Detalles de un cliente específico (por ejemplo, customerNumber = 101):**

   ```sql
   SELECT customerNumber, customerName, contactLastName, contactFirstName, phone, addressLine1, addressLine2,  city, state, postalCode, country, salesRepEmployeeNumber,creditLimit FROM customers WHERE customerNumber = 249;
   ```

4. **Listar todos los pagos realizados por un cliente específico (por ejemplo, customerNumber = 101):**

   ```sql
   SELECT customerNumber, checkNumber, paymentDate, amount FROM payments WHERE customerNumber = 249;
   ```

5. **Obtener todos los pedidos con estado 'Shipped':**

   ```sql
   SELECT orderNumber, orderDate, requiredDate, status FROM orders WHERE status = 'Shipped';
   ```

6. **Cantidad total de productos en stock:**

   ```sql
   SELECT SUM(quantityInStock) FROM products;
   ```

7. **Lista de todos los empleados con su jefe (si tienen):**

   ```sql
   (Esta consulta trae los nombres de los empleados y el codigo de su respectivo jefe)
   
   SELECT employeeNumber, firstName, lastName, reportsTo FROM employees WHERE reportsTo NOT IN ('NULL') ORDER BY firstName;
   
   -----------------------------------------------------------------------------------------------------------------------
   
   (Esta consulta trae todos los nombres de los empleados con sus jefes) 
   
   select concat(e.lastName, " ", e.firstName) as 'Empleado', concat(j.lastName," ", j.firstName) as 'Jefe'  from employees e
   join employees j on e.employeeNumber = j.reportsTo;
   ```

8. **Detalles de oficinas en un país específico (por ejemplo, 'USA'):**

   ```sql
   SELECT officeCode, city, phone, state, postalCode, country FROM offices WHERE country = 'JAPAN';
   ```

9. **Listar todos los clientes en una ciudad específica (por ejemplo, 'Madrid'):**

   ```sql
   SELECT customerNumber, customerName, contactFirstName, contactLastName, city FROM customers WHERE city = 'NYC';
   ```

10. **Productos con precio de compra mayor a 50:**

    ```sql
    SELECT productCode, productName, quantityInStock, buyPrice FROM products WHERE buyPrice > 50;
    ```

### Consultas Multitabla

1. **Obtener todos los pedidos realizados por un cliente específico (por ejemplo, customerNumber = 101) con detalles del producto:**

   ```sql
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
       o.customerNumber = 249;
   
   ```
   
2. **Listar todos los empleados junto con la oficina en la que trabajan:**

   ```sql
   (Esta consulta trae todo lo pedido pero no es multitabla) 
   
   SELECT employeeNumber, firstName, lastName, officeCode FROM employees;
   
   -----------------------------------------------------------------------------------------------------------
   
   (Esta consulta trae todo y es multitabla) 
   
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
       offices o ON e.officeCode = o.officeCode;
   
   ```

3. **Listar todos los clientes junto con su representante de ventas:**

   ```sql
   (Esta consulta trae todo lo pedido pero no es multitabla) 
   
   
   SELECT customerNumber, customerName, phone, city, salesRepEmployeeNumber FROM customers;
   
   
   ---------------------------------------------------
   
   
   (Esta consulta trae todo y es multitabla) 
   
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
       employees e ON c.salesRepEmployeeNumber = e.employeeNumber;
   
   ```

4. **Obtener el nombre y la cantidad total ordenada de cada producto:**

   ```sql
   SELECT products.productName, SUM(orderdetails.quantityOrdered) AS total_ordered
   FROM products
   JOIN orderdetails ON products.productCode = orderdetails.productCode
   GROUP BY products.productName;
   
   ```
   
5. **Listar todas las oficinas y el número de empleados en cada una:**

   ```sql
   SELECT offices.officeCode, offices.city, COUNT(employees.employeeNumber) AS numEmpleados
   FROM offices
   LEFT JOIN employees ON offices.officeCode = employees.officeCode
   GROUP BY offices.officeCode, offices.city;
   
   ```

-------------------------------------------------------------------------

**Consultas Extras** 



6. **Obtener detalles de los pedidos, incluyendo la información del cliente y los productos ordenados:**

   ```sql
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
   ```

7. **Listar todos los pagos realizados, junto con la información del cliente y su representante de ventas:**

   ```sql
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
   ```

8. **Obtener una lista de todos los productos, junto con sus líneas de productos y el total de cantidad ordenada:**

   ```sql
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
   ```

9. **Listar todos los pedidos con detalles del cliente y el nombre del representante de ventas:**

   ```sql
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
       JOIN customers c ON o.customerNumber = c.customerNumber
       LEFT JOIN employees e ON c.salesRepEmployeeNumber = e.employeeNumber;
   ```

10. **Obtener el total de pagos realizados por cada cliente y el nombre del representante de ventas asignado:**

   ```sql
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
   ```

