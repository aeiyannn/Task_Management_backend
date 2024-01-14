// sequelize.js
import { Sequelize } from 'sequelize';
import Config from '../../config/database'

const sequelize = new Sequelize(
  Config.development.database,
  Config.development.username,
  Config.development.password,
  {
    host: Config.development.host,
    dialect: "mysql",
    // Additional options if required
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
