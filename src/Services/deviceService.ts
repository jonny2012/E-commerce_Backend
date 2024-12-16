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
    const device = await db.insert(devicesTable).values({
      deviceName,
      price,
    });
    return device;
  }
}
export default new deviceService();
