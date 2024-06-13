import mysql from 'mysql2/promise';
export const connection = await mysql.createConnection({
  host: '172.16.101.146',
  user: 'camper',
  database: 'trainer',
  port: 3306,
  password: 'campus2023'
});