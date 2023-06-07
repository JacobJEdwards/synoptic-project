declare module "express-session" {
    interface SessionData {
        user: {
            [key: string]: any;
        };
        jwt: string;
    }
}
declare const middleware: Array<any>;
export default middleware;
//# sourceMappingURL=app.middleware.d.ts.map