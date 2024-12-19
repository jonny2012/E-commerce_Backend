import { eq } from "drizzle-orm";
import { db } from "../db";
import { devicesTable } from "../db/schema";

class deviceService {
  async createDevice(
    deviceName: string,
    price: number,
    brandId: number,
    typeId: number,
    rating: number
  ) {
    const device = await db
      .insert(devicesTable)
      .values({ deviceName, price, brandId, typeId });
    return device;
  }

  async getAllDevices() {
    const allDevices = await db.query.devicesTable.findMany();
    return allDevices;
  }

  async getDeviceById(reqDeviceId: number) {
    const device = await db
      .select()
      .from(devicesTable)
      .where(eq(devicesTable.id, reqDeviceId));
  }
}
export default new deviceService();
