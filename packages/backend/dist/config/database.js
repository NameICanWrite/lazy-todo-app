"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = require("../entities/Todo");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
function getSSLConfig(env) {
    const configs = {
        production: { rejectUnauthorized: true },
        local: false,
        deploy: { rejectUnauthorized: false }
    };
    if (!configs[env] === undefined) {
        throw new Error('Set network in your .env file');
    }
    return configs[env];
}
const connectDB = async () => {
    try {
        const options = {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            logging: ['query', 'error'],
            type: 'postgres',
            entities: [Todo_1.Todo, User_1.User],
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            ssl: true,
            synchronize: true
        };
        await (0, typeorm_1.createConnection)(options);
        console.log('PostgreSQL Connected.');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map