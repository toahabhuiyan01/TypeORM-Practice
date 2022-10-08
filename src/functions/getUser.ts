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
        .createQueryBuilder('user')
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

    // qb = qb.where('user_meta ::json @> :user_user_meta', {
    //     user_user_meta: {
    //         status: 'confirmed'
    //     }
    // })

    qb = qb.where(`user_meta->>'status' IN (:...state)`, {state: ["confirmed", 'pending']})

    const result = await qb.getRawMany()

	const cursor = result[result.length - 1]?.id
	return { users: result, cursor }
}

export default handler