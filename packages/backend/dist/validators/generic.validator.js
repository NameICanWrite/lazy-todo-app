"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericValidator = void 0;
const try_catch_decorator_1 = __importDefault(require("../utils/try-catch.decorator"));
const typeorm_1 = require("typeorm");
const validation_schemas_1 = __importDefault(require("./validation.schemas"));
class EntityWithId extends typeorm_1.BaseEntity {
}
let GenericValidator = class GenericValidator {
    constructor() { }
    isBodyValidEntity(Entity) {
        let entityType;
        if (!(typeof Entity === 'string')) {
            entityType = findTableFromEntity(Entity);
        }
        else {
            entityType = Entity;
        }
        let joiSchema;
        if (entityType && validation_schemas_1.default.hasOwnProperty(entityType)) {
            const entityProp = entityType;
            joiSchema = validation_schemas_1.default[entityProp];
        }
        return (0, try_catch_decorator_1.default)(async function (req, res, next) {
            await joiSchema.validateAsync(req.body);
            next();
        });
    }
    isEntityExistsById(Entity) {
        return (0, try_catch_decorator_1.default)(async function (req, res, next) {
            if (await Entity.findOneBy({ id: req.params.id })) {
                return next();
            }
            res.status(404);
            const entityType = findTableFromEntity(Entity);
            return entityType + ' not found';
        });
    }
};
GenericValidator = __decorate([
    try_catch_decorator_1.default,
    __metadata("design:paramtypes", [])
], GenericValidator);
exports.GenericValidator = GenericValidator;
const validator = new GenericValidator();
exports.default = validator;
function findTableFromEntity(Entity) {
    const table = (0, typeorm_1.getMetadataArgsStorage)().tables.find(t => t.target === Entity);
    return (table === null || table === void 0 ? void 0 : table.name) || undefined;
}
//# sourceMappingURL=generic.validator.js.map