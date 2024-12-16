// import ApiError from "../errors/ApiError";
// import * as uuid from "uuid";
// import * as path from "path";
// import deviceService from "../Services/deviceService";
// import { Device, DeviceInfo } from "../models/models";
// import { NextFunction, Request, Response } from "express";

// class DeviceController {
//   async getDevices(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> {
//     try {
//       const { brandId, typeId, limit, page } = req.query as Record<
//         string,
//         string | undefined
//       >;

//       let devices;

//       res.json(devices);
//     } catch (err: any) {
//       next(ApiError.badRequest(err.message));
//     }
//   }

//   async getDeviceById(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> {
//     const { id } = req.params;
//     try {
//       const device = await Device.findOne({
//         where: { id },
//         include: [{ model: DeviceInfo, as: "info" }],
//       });
//       res.json(device);
//     } catch (err: any) {
//       next(ApiError.badRequest(err.message));
//     }
//   }

// async createDevice(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const { name, price, brandId, typeId, info } = req.body;
//     const { img } = req.files as { img: any };
//     const filename = uuid.v4() + ".jpg";

//     const device = await deviceService.createDevice(
//       name,
//       price,
//       brandId,
//       typeId,
//       filename
//     );
//     if (!device) {
//       res.status(404).json({ message: "Device not found" });
//       return;
//     }
//     if (info) {
//       (info as Array<{ title: string; description: string }>).forEach(
//         (element) =>
//           DeviceInfo.create({
//             title: element.title,
//             description: element.description,
//             deviceId: device.id,
//           })
//       );
//     }
//     img.mv(path.resolve(__dirname, "..", "static", filename));
//     res.json(device);
//   } catch (err: any) {
//     next(ApiError.badRequest(err.message));
//   }
// }
// }

// export default new DeviceController();
