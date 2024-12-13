import { Device } from "../models/models.ts";

class deviceService {
  async createDevice(
    name: string,
    price: number,
    brandId: number,
    typeId: number,
    filename: string
  ) {
    const device = await Device.create({
      name,
      price,
      brandId,
      typeId,
      img: filename,
    });
    return device;
  }
}
export default new deviceService();
