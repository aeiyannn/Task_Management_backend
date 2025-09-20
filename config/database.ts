const Config = {
    development: {
        username: process.env.DB_USER || 'bcappa_dev_admin',
        password: process.env.DB_PASSWORD || 'e9MlIfbyYeoHnNDiXnzA',
        database: process.env.DB_NAME || 'taska-aeiyan',
        host: process.env.DB_HOST || 'mysql-39de5be2-aeiyankhan2-d42e.c.aivencloud.com',
        dialect: process.env.DB_DIALECT || 'mysql',
        port: Number(process.env.DB_PORT) || 26768,
    },
};

export default Config