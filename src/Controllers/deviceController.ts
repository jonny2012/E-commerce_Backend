import ApiError from "../errors/ApiError";
import * as uuid from "uuid";
import * as path from "path";
import deviceService from "../Services/deviceService";
import { NextFunction, Request, Response } from "express";

class DeviceController {
  async getDevices(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { brandId, typeId, limit } = req.query as Record<
        string,
        string | undefined
      >;
      const devices = await deviceService.getAllDevices();

      res.json(devices);
    } catch (err: any) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getDeviceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { reqDeviceId } = req.params;
    try {
      const device = await deviceService.getDeviceById(Number(reqDeviceId));
      res.json(device);
    } catch (err: any) {
      next(ApiError.badRequest(err.message));
    }
  }

  async createDevice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { deviceName, price, brandId, typeId, rating } = req.body;
      const { img } = req.files as { img: any };
      const filename = uuid.v4();

      const device = deviceService.createDevice(
        deviceName,
        price,
        brandId,
        typeId,
        rating
      );
      if (!device) {
        res.status(404).json({ message: "Device not found" });
        return;
      }
      img.mv(path.resolve(__dirname, "..", "static", filename));
      res.json(device);
    } catch (err: any) {
      next(ApiError.badRequest(err.message));
    }
  }
}

export default new DeviceController();
