import { Brackets, DataSource } from "typeorm"
import { User } from "../entity/User"

type GetUser = (
	conn: { db: DataSource },
	ev: any,
) => any

const handler: GetUser = async (
    { db }, 
    { searchString, id, before, count, startTime, endTime, status, tag }
) => {
    let qb = db
        .getRepository(User)
        .createQueryBuilder('user')
        .orderBy('id', 'DESC')
        // .orderBy(`user_meta->>'date'`, 'DESC')
        // .orderBy('name', 'ASC')
        

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

    if(startTime && endTime) {
        qb = qb
        .andWhere(`user_meta->>'date' > :startTime`, { startTime })
        .andWhere(`user_meta->>'date' < :endTime`, { endTime })
    }

    if(Array.isArray(status)) {
        // search on a json data column
        qb = qb.andWhere(`user_meta->>'status' IN (:...status)`, { status })
    }

    if(Array.isArray(tag)) {
        // search on a array by comparing those array.
        qb = qb.andWhere('tags @> :tags', { tags: tag })
    } else if(typeof tag !== 'undefined') {
        qb = qb.andWhere(`:tag = ANY(tag)`, { tag })
    }

    // qb.skip(2).take(2)
    // qb.offset(0).limit(5)

    const result = await qb.getMany()

	const cursor = result[result.length - 1]?.id
	return { users: result, cursor }
}

export default handler