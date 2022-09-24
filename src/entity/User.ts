import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Contact } from "./Contact"

@Entity()
export class User {

    @PrimaryGeneratedColumn({})
    id!: number

    @Column()
    name!: string

    @Column({name: 'api_key', nullable: false, default: ''})
    apiKey!: string

    @Column({ nullable: false, default: ''})
    token!: string

    @OneToMany(() => Contact, ({ owner }) => owner )
    contacts!: Contact[]

}
