import {AppDataSource} from "./data-source"
import userCreate from "./functions/userCreate"
import userFetch from './functions/getUser'
import createContact from './functions/createContact'
import fetchContacts from './functions/fetchContacts'
import { Contact } from "./entity/Contact"

(async () => {
    if(!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    // const users = await userFetch({ db: AppDataSource }, {})
    // const users = await userCreate(AppDataSource)
    // const users = await userFetch({ db: AppDataSource }, { startTime: '2022-10-08T07:00:28.841Z', endTime: '2022-10-08T08:03:36.685Z' })
    // console.log(JSON.stringify(users, null, 2))

    const contactCreate = {
        name: 'tahmid',
        phoneNumber: '8801626711770',
        email: 'lol332@gmail.com',
        metaData: {
            address: 'Ashrafpur, Cumilla',
            date: new Date().toJSON(),
            serial: 7
        }
    }
    // const contacts = await createContact( { db: AppDataSource }, { owner: 2, ...contactCreate })
    const contacts: {contacts: Contact[], cursor: string } = await fetchContacts({ db: AppDataSource }, { })
    // contacts.contacts.map(contact => {
    //     console.log(contact.metaData?.date)
    // })
    console.log(contacts)
})()