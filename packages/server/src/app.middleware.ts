import type { INestApplication } from "@nestjs/common";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

/**
 * Middleware
 * @param {INestApplication} app
 * @returns {INestApplication} app
 * @description Middleware for the application
 */
export function middleware(app: INestApplication): INestApplication {
  // app.use(helmet());
  // app.use(cors());
  // app.use(compression());
  app.enableCors();
  return app;
}
