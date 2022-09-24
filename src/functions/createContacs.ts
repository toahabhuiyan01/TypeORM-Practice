import { DataSource } from "typeorm";
import { Contact } from "../entity/Contact";
import { User } from "../entity/User";
import getUser from './getUser'

type CreateContact = (
	conn: { db: DataSource },
	ev: any,
) => any

const handler: CreateContact = async ({ db }, { name, phoneNumber, email, owner }) => {
    const contactRepo = db.getRepository(Contact)
    const contactOwner = await getUser({ db }, { id: owner}).users[0] as User
    
    const contact = new Contact()
    contact.name = name
    contact.phoneNumber = phoneNumber
    contact.email = email

    contact.owner = contactOwner

    await contactRepo.save(contact)
}

export default handler