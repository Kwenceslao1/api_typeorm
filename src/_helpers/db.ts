import { Sequelize, Options, Model, ModelStatic } from 'sequelize';
import mysql from 'mysql2/promise';
import config from '../config/config';
import userModel, { UserAttributes, UserCreationAttributes } from '../users/user.model';

interface DatabaseConfig {
  database: string;
  user: string;
  password: string;
  host: string;
  port: number;
}

interface Config {
  database: DatabaseConfig;
}

// Create Sequelize instance with proper configuration
const sequelize = new Sequelize(
  config.database.database,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'mysql',
    logging: false
  } as Options
);

async function initialize(): Promise<void> {
  try {
    // Create database if not exists
    const adminConnection = await mysql.createConnection({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password
    });

    await adminConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database.database}\`;`
    );
    await adminConnection.end();

    // Authenticate and sync
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database connected and synchronized');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

// Define the structure of the db object
interface Db {
  sequelize: Sequelize;
  initialize: () => Promise<void>;
  User: ModelStatic<Model<UserAttributes, UserCreationAttributes>>;
}

const db: Db = {
  sequelize,
  initialize,
  User: userModel(sequelize)
};

export default db;