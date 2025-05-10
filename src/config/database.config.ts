
/**
 * Database Configuration
 * 
 * This file contains all database connection settings.
 * Replace the placeholder values with your actual MySQL database credentials.
 */

export const databaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'portfolio_db',
  
  // Connection pool settings
  pool: {
    min: 0,
    max: 10,
    idle: 10000
  }
};

/**
 * How to use:
 * 
 * 1. Create a MySQL database with the name specified above
 * 2. Set the following environment variables in your hosting environment:
 *    - DB_HOST: Your database host address
 *    - DB_PORT: Your database port (usually 3306 for MySQL)
 *    - DB_USERNAME: Database username
 *    - DB_PASSWORD: Database password
 *    - DB_DATABASE: Database name
 * 
 * For local development, you can create a .env file in the project root
 * with these variables or adjust the default values in this file.
 */
