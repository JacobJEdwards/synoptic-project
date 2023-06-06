/**
 * Configuration file
 * For use with {ConfigModule} from '@nestjs/config'
 * Defines environment variables and their default values
 */
export default () => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
            ? parseInt(process.env.DATABASE_PORT, 10)
            : 3306,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        url: process.env.DATABASE_URL,
    },
    JWT: {
        SECRET: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    bcrypt: {
        salt: process.env.BCRYPT_SALT,
    },
});
