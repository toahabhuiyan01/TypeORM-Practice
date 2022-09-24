import { DataSource } from "typeorm";
import { User } from "../entity/User";

export default async (db: DataSource) => {
    const user = new User()
    user.apiKey = "adssfd"
    await db.manager.save(user)

    const users = await db.manager.find(User)
    console.log("Loaded users: ", users)
}