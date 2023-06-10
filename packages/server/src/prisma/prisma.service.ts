import {INestApplication, Injectable} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";

/**
 * A custom provider to ensure that there is only ever one instance of Prisma
 * instantiated in the application.
 * Allows the application to be shut down gracefully.
 * Allows the application to access the PrismaClient instance via dependency injection.
 */
@Injectable()
export class PrismaService extends PrismaClient {
    async enableShutdownHooks(app: INestApplication) {
        this.$on("beforeExit", async () => {
            await app.close();
        });
    }
}
