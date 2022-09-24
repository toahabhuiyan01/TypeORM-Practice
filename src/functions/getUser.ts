import { DataSource } from "typeorm"
import { User } from "../entity/User"

type GetUser = (
	conn: { db: DataSource },
	ev: any,
) => any

const handler: GetUser = async (
    { db }, 
    { searchString, id, before, count }
) => {
    let qb = db
        .getRepository(User)
        .createQueryBuilder('users')
        .orderBy('id', 'DESC')
    if(id) {
        qb = qb.andWhere('id = :id', { id })
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

    const result = await qb.getRawMany()

	const cursor = result[result.length - 1]?.id
	return { users: result, cursor }
}

export default handler