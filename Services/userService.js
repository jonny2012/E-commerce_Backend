import { User } from "../models/models.js";

class Service {
  async getOneUser(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
  async createUser(username,email, cryptedPassword, role) {
    const user = await User.create({username, email, password: cryptedPassword, role });
    return user;
  }

  async deleteUser(userId) {
    const user = await User.destroy({ where: { id: userId } });
    return user;
  }

  async updateUserInfo(userData, userId) {
    const updatedData = await User.update(
      { name: userData.name, 
        email: userData.email },
      { where: { id: userId } }
    );
    return updatedData;
  }
}

export default new Service();
