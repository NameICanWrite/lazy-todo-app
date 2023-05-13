"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./../entities/User");
class UserService {
    async findAll() {
        const users = await User_1.User.find();
        return users;
    }
    async create({ email, password }) {
        const saved = await User_1.User.save({ email, password });
        return saved;
    }
    async changePassword(id, password) {
        const user = await User_1.User.update(id, { password, passwordResetCode: '0', passwordResetCodeExpiresAt: '0' });
        return user;
    }
    async findById(id) {
        const user = await User_1.User.findOne({ where: { id }, relations: ['todos'] });
        return user;
    }
    async findByEmail(email) {
        const user = await User_1.User.findOne({ where: { email }, relations: ['todos'] });
        return user;
    }
    async addPasswordResetCode(email, code) {
        await User_1.User.update({ email }, { passwordResetCode: code, passwordResetCodeExpiresAt: (Date.now() + 60 * 1000 * 10).toString() });
    }
    async delete(id) {
        await User_1.User.delete(id);
    }
    async isUserExists(id) {
        return !!(await this.findById(id));
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map