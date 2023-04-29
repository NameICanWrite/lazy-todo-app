import { IUser } from '../types/user.type';
import { User } from './../entities/User';

import { entityTypes } from '../consts';

export default class UserService {
  async findAll() {
    const users = await User.find()
    return users;
  }

  async create({name, password}: {name: string, password: string}) {
    const saved = await User.save({name, password} as DeepPartial<User>)
    return saved
  }

  async changePassword(id: string, password: string) {
    const user = await User.update(id, {password})
    return user
  }

  async findById(id: string) {
    const user = await User.findOne({where: {id}, relations: ['todos']})
    return user
  }

  async findByName(name: string) {
    const user = await User.findOne({where: {name}, relations: ['todos']})
    return user
  }

  async delete(id: string) {
    await User.delete(id)
  }

  async isUserExists(id: string) {
    return !!(await this.findById(id))
  }
}