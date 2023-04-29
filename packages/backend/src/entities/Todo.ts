import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, getMetadataArgsStorage } from 'typeorm';
import { User } from './User';
import { entityTypes } from '../consts';

@Entity(entityTypes.TODOS)
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  isPrivate: boolean

  @Column()
  isCompleted: boolean

  @ManyToOne(() => User, (user: User) => user.todos)
  user: User
}




