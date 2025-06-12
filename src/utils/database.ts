import { Sequelize } from 'sequelize';

// ...
export const sequelize = new Sequelize('Backend-IMT', 'testuser', 'TestPassword123!', {
  host: 'localhost',
  port: 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    }
  }
});
export const sequelizeIMT = new Sequelize('teleinventario', 'sauinv', 'XgLp6cFQwE1wqMx!', {
  host: 'localhost',
  port: 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    }
  }
});