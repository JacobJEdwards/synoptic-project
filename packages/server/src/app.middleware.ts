import type {INestApplication} from "@nestjs/common";
import * as compression from "compression";

/**
 * Middleware
 * @param {INestApplication} app
 * @returns {INestApplication} app
 * @description Middleware for the application
 */
export function middleware(app: INestApplication): INestApplication {
    // app.use(helmet());
    app.enableCors();
    app.use(compression());
    return app;
}
