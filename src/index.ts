import {AppDataSource} from "./data-source"
import userCreate from "./functions/userCreate"
import userFetch from './functions/getUser'

(async () => {
    if(!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    // await userCreate(AppDataSource)
    const users = await userFetch({ db: AppDataSource }, {})
    console.log(users)
})()