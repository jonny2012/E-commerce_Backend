import { userTable } from "./../db/schema";
import { db } from "../db";

import { eq } from "drizzle-orm";
import { users } from "../../drizzle/schema";
export interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

class Service {
  async getOneUser(email: string) {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    return user[0] ?? null;
  }

  async getAllUsers() {
    const users = await db.select().from(userTable);
    return users;
  }
  async createUser(username: string, email: string, cryptedPassword: string) {
    const user = await db
      .insert(userTable)
      .values({
        username,
        email,
        password: cryptedPassword,
      })
      .returning();

    return user;
  }

  async deleteUser(userId: number) {
    const user = await db.delete(userTable).where(eq(users.id, userId));
    return user;
  }

  async updateUserInfo(userData: UserData, userId: number) {
    const updatedData = await db
      .update(users)
      .set({
        username: userData.username,
        email: userData.email,
      })
      .where(eq(users.id, userId));
    return updatedData;
  }
}

export default new Service();
