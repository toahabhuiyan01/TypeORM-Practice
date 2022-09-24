import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    database: 'mytest',
    entities: ['src/entity/*.ts'],
    migrations: ['src/migration/*.ts'],
    synchronize: false,
    logging: false,
})

