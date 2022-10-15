import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, In } from 'typeorm'; 
import { User } from './User';
@Entity() 
export class Contact { 

     @PrimaryGeneratedColumn() 
     id!: number

     @Column()
     @Index()
     name!: string
     
     @Column({ name: 'phone_number', nullable: false })
     @Index()
     phoneNumber!: string

     @Column({ name: 'meta_data', type: 'json', nullable: true })
     metaData!: { [k: string]: string | number }

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