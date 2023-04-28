import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, getMetadataArgsStorage } from 'typeorm';

@Entity('todos')
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
}




