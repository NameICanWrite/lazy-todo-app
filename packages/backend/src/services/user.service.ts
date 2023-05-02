import { IUser } from '../types/user.type';
import { User } from './../entities/User';

import { entityTypes } from '../consts';
import { DeepPartial } from 'typeorm';

export default class UserService {
  async findAll() {
    const users = await User.find()
    return users;
  }

  async create({email, password}: {email: string, password: string}) {
    const saved = await User.save({email, password} as DeepPartial<User>)
    return saved
  }

  async changePassword(id: string, password: string) {
    const user = await User.update(id, {password, passwordResetCode: '0', passwordResetCodeExpiresAt: '0'})
    return user
  }

  async findById(id: string) {
    const user = await User.findOne({where: {id}, relations: ['todos']})
    return user
  }

  async findByEmail(email: string) {
    const user = await User.findOne({where: {email}, relations: ['todos']})
    return user
  }
  async addPasswordResetCode(email: string, code: string) {
    await User.update({email}, {passwordResetCode: code, passwordResetCodeExpiresAt: (Date.now() + 60 * 1000 * 10).toString()})
  }

  async delete(id: string) {
    await User.delete(id)
  }

  async isUserExists(id: string) {
    return !!(await this.findById(id))
  }
}