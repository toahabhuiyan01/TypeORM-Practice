import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'; 
import { User } from './User';
@Entity() 
export class Contact { 

   @PrimaryGeneratedColumn() 
   id!: number

   @Column()
   name!: string
   
   @Column({ name: 'phone_number', nullable: false }) 
   phoneNumber!: string

   @Column({nullable: false, default: ''})
   email!: string

   @ManyToOne(
        () => User,
        ({ id }) => id,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false },
   )
   @JoinColumn({ name: 'owner_id'})
    owner: User | undefined
}