"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const joi_1 = __importDefault(require("joi"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
const router = new routes_1.default(app);
(0, database_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://lazy-todo-app.netlify.app", process.env.CLIENT_ROOT_URL],
    methods: ["GET", "POST", "OPTIONS", "PATCH", "PUT", 'DELETE'],
    credentials: true,
    exposedHeaders: ['Authorization']
}));
app.set('port', process.env.PORT || 5000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
router.init();
const port = app.get('port');
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof joi_1.default.ValidationError) {
        res.status(400).send(err.message);
    }
    if (!res.statusCode)
        res.status(500);
    res.send(err.message || 'Internal error');
});
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
exports.default = server;
//# sourceMappingURL=server.js.map