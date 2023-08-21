import { config as envConfig } from 'dotenv'

envConfig()

export const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_COUNT: +process.env.SALT_COUNT || 1,
}
