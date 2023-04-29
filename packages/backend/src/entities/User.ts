
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './Todo';

import { entityTypes } from '../consts';

@Entity(entityTypes.USER)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo: Todo) => todo.user)
  todos: Array<Todo>;
}
