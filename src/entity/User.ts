import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn({})
    id!: number

    @Column({name: 'api_key', nullable: false, default: ''})
    apiKey!: string

    @Column({ nullable: false, default: ''})
    token!: string

}
