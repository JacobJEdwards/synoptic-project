import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import { middleware } from "./app.middleware";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap(): Promise<string> {
    // create Nest application instance
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Express Middleware
    middleware(app);

    const config = new DocumentBuilder()
        .setTitle("Govan API")
        .setDescription("The Govan API description")
        .setVersion("1.0")
        .addTag("govan")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT || 3000);

    return app.getUrl();
}

(async (): Promise<void> => {
    try {
        const url = await bootstrap();
        Logger.log(`Application is running on: ${url}`);
    } catch (error) {
        Logger.error(`Application failed to start due to an error: ${error}`);
    }
})();
