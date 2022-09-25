import { DataSource } from "typeorm";
import { User } from "../entity/User";

export default async (db: DataSource) => {
    const userRepo = db.getRepository(User)
    const user = new User()
    user.apiKey = "f73d694e-e8f9-48d2-88c6-598dfb1709bc"
    user.name = 'Tanzel Bhuiyan'

    const createdUser = await userRepo.save(user)

    console.log("Loaded users: ", createdUser)
}