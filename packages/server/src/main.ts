import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import { middleware } from "./app.middleware";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { patchNestjsSwagger } from "@anatine/zod-nestjs";

/**
 * Bootstrap the application
 * @returns {Promise<string>} The URL the application is running on
 * @throws {Error} If the application fails to start
 * @async
 * @function bootstrap
 */
async function bootstrap(): Promise<string> {
    // create Nest application instance
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Express Middleware
    middleware(app);

    const config = new DocumentBuilder()
        .setTitle("Govan Recipe App API")
        .setDescription("The Govan Recipe App API description")
        .build();

    patchNestjsSwagger();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT || 3000);

    return app.getUrl();
}

/**
 * Anonymous function to bootstrap the application and log the URL it is running on
 * @async
 */
(async (): Promise<void> => {
    try {
        const url = await bootstrap();
        Logger.log(`Application is running on: ${url}`);
    } catch (error) {
        Logger.error(`Application failed to start due to an error: ${error}`);
    }
})();
