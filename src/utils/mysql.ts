// MySQL connection utility (Node.js backend)
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'ahjbu_ah_user',
  password: 'BASem1462015%',
  database: 'ahjbu_ah_db',
};

export async function createMySQLConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('MySQL connection error:', error);
    throw error;
  }
}
