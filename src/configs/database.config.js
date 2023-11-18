import mysql from 'mysql2/promise';
import logger from '../helpers/winston.helper';

const USERS_TABLE_NAME = 'users';

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const createTable = async () => {
  try {
    const db = await connection.getConnection();

    await db.query(`
    CREATE TABLE ${USERS_TABLE_NAME} (
      id CHAR(36) PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

    db.release();

    logger.info(`Successfully created ${USERS_TABLE_NAME} table`);
  } catch (error) {
    logger.error(`Error creating ${USERS_TABLE_NAME} table:`, error);
  }
};

const checkTable = async () => {
  try {
    const db = await connection.getConnection();

    const [rows, fields] = await db.query(`SHOW TABLES LIKE '${USERS_TABLE_NAME}'`);

    db.release();

    if (rows.length === 0) {
      await createTable();
    }
  } catch (error) {
    logger.error(`Error checking for ${USERS_TABLE_NAME} table:`, error);
  }
};

(async () => {
  try {
    logger.info('The server is connected to the MySQL database');

    await checkTable();
  } catch (error) {
    logger.error('Error connecting to MySQL:', error);
  }
})();

export default connection;
