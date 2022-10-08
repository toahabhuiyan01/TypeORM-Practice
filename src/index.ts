import {AppDataSource} from "./data-source"
import userCreate from "./functions/userCreate"
import userFetch from './functions/getUser'
import createContact from './functions/createContact'
import fetchContacts from './functions/fetchContacts'

(async () => {
    if(!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    // const users = await userFetch({ db: AppDataSource }, { before: 0 })
    // const users = await userCreate(AppDataSource)
    const users = await userFetch({ db: AppDataSource }, {})
    console.log(JSON.stringify(users, null, 2))

    const contactCreate = {
        name: 'toaha',
        phoneNumber: '8801626711767',
        email: 'mmtanzel420@gmail.com'
    }
    // const contacts = await createContact( { db: AppDataSource }, { owner: 2, ...contactCreate })
    // const contacts = await fetchContacts({ db: AppDataSource }, { owner: 1 })
    // console.log(contacts)
})()