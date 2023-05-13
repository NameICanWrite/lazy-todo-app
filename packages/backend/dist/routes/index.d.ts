import { Application } from 'express';
declare class AppRouter {
    private app;
    constructor(app: Application);
    init(): void;
}
export default AppRouter;
