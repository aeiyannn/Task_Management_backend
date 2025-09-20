// sequelize.js
import { Sequelize } from 'sequelize';
import config from '../../config/database'

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port ,
    dialect:'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
      connectTimeout: 10000,  
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,  
      idle: 10000,
    },
    logging: console.log, 
  }
);
// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


export default sequelize;
