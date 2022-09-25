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
    const userRepo = db.getRepository(User)

    const contactOwner = await userRepo.findOneBy({id: owner})
    
    const contact = new Contact()
    contact.name = name
    contact.phoneNumber = phoneNumber
    contact.email = email

    if(contactOwner) {
        contact.owner = contactOwner
    } else {
        throw new Error('No user Found')
    }

    return await contactRepo.save(contact)
}

export default handler