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
        .andWhere("meta_data->>'address' IS NOT null")
        .andWhere("id > :uId", { uId: 1})

    if(id) {
        qb = qb.andWhere('id = :id', { id })
    }

    const arr = [
        {ph: '8801626711768', id: '2'},
        {ph: '8801626711770', id: '5'}
    ]

    const bal = arr.reduce((fArr: string[], curr) => {
        fArr.push(`('${curr.ph}', '${curr.id}')`)
        return fArr
    }, [])

    qb = qb.andWhere(`(phone_number, owner_id) IN (${bal.join(', ')})`)

    // for(let idx = 0; idx < arr.length; idx++) {
    //     const value = arr[idx]
    //     if(idx === 0) {
    //         qb = qb.andWhere(`phone_number='${value.ph}' AND owner_id=${value.id}`)
    //     } else {
    //         qb = qb.orWhere(`phone_number='${value.ph}' AND owner_id=${value.id}`)
    //     }
    // }

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

    const result = await qb.getRawMany()

	const cursor = result[result.length - 1]?.id
	return { contacts: result, cursor }
}

export default handler