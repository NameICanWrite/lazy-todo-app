export declare class GenericValidator {
    constructor();
    isBodyValidEntity(Entity: any): Function | undefined;
    isEntityExistsById(Entity: any): Function | undefined;
}
declare const validator: GenericValidator;
export default validator;
