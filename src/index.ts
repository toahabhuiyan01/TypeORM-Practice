import {AppDataSource} from "./data-source"
import userCreate from "./functions/userCreate"

(async () => {
    if(!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    await userCreate(AppDataSource)
})()
