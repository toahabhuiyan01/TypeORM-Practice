import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from "typeorm"
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

    @Column({ name: 'user_meta', type: 'json', nullable: true })
    userMeta!: { [k: string]: string | number }

    @OneToMany(() => Contact, ({ owner }) => owner )
    contacts!: Contact[]

}
