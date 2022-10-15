import { DataSource } from "typeorm"
import { Contact } from "../entity/Contact"
import { User } from "../entity/User"

type GetContact = (
	conn: { db: DataSource },
	ev: any,
) => any

const handler: GetContact = async (
    { db }, 
    { searchString, id, before, count, owner, isAdmin }
) => {
    // if(!owner && !isAdmin) {
    //     throw new Error('No Owner!!')
    // }
    let qb = db
        .getRepository(Contact)
        .createQueryBuilder('contact')
        .orderBy(`id`, 'ASC')
        .andWhere("meta_data->>'date' IS null")
        .andWhere("id > :uId", { uId: 1})

    if(id) {
        qb = qb.andWhere('id = :id', { id })
    }

    if(owner) {
        qb = qb.andWhere('owner_id = :owner', { owner })
    }

    if(before) {
		qb = qb.andWhere('id < :before', { before })
	}

    if(searchString) {
		qb = qb.andWhere(
			'LOWER(name) LIKE :searchString',
			{ searchString: `%${searchString.toLocaleLowerCase()}%` })
	}

    if(count) {
		qb = qb.limit(count)
	}

    const result = await qb.getMany()

	const cursor = result[result.length - 1]?.id
	return { contacts: result, cursor }
}

export default handler