import {Module} from "@nestjs/common";
import {PrismaModule} from "./prisma/prisma.module";
import {RecipesModule} from "./recipes/recipes.module";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
import {ConfigModule} from "@nestjs/config";
import {CharitiesModule} from './charities/charities.module';
import {CommentsModule} from './comments/comments.module';
import config from "./config/configuration";

/**
 * @Module() decorator provides metadata that Nest makes use of to organize the application structure.
 * Main application module that imports all other modules.
 */
@Module({
    imports: [
        // access environment variables
        ConfigModule.forRoot({isGlobal: true, load: [config]}),

        // database module
        PrismaModule,

        // feature modules
        AuthModule,
        RecipesModule,
        UsersModule,
        CharitiesModule,
        CommentsModule,
    ],
})
export class AppModule {
}
