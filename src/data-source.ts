import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "mytest",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ["migration/*.ts"],
    subscribers: [],
})

