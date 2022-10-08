import { DataSource } from "typeorm";
import { User } from "../entity/User";

export default async (db: DataSource) => {
    const userRepo = db.getRepository(User)
    const user = new User()
    user.apiKey = "f73d694e-e8f9-48d2-88c6-598dfb1790cd"
    user.name = 'Mr. Nirob'
    user.userMeta = {
        address: 'Adra, Bholain Bazar, Nangalkot, Cumilla',
        subject: 'IT',
        date: new Date().toJSON(),
        status: 'start'
    }

    const createdUser = await userRepo.save(user)

    return createdUser
}