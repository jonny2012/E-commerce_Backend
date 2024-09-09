import ApiError from "../errors/ApiError.js"
import * as uuid from "uuid"
import * as path from "path"
import deviceService from "../Services/deviceService.js"
import { fileURLToPath } from "url"
import { Device, DeviceInfo } from "../models/models.js"



const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

class deviceController {

    async getDevices(req, res, next) {
        try {
            let { brandId, typeId, limit, page } = req.query
            page = page || 1
            limit = limit || 8
            let offset = page * limit -limit
            let devices
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({ limit, offset })
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
            }
            res.json(devices)

        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async getDevicebyId(req, res,) {
        const { id } = await req.params
        try {
            const device = await Device.findOne({
                where: { id },
                include: [{ model: DeviceInfo, as: "info" }]
            })
            res.json(device)
        }
        catch (err) {
            ApiError.badRequest(err.message)
        }

    }

    async createDevice(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let filename = uuid.v4() + ".jpg"

            const device = await deviceService.createDevice(name, price, brandId, typeId, filename)
            if (info) {
                info = JSON.parse(info)
                info.forEach(element => DeviceInfo.create({
                                                             title: element.title,
                                                             description: element.description,
                                                             deviceId: device.id
                                                          })
                            );
            }
            img.mv(path.resolve(__dirname, "..", "static", filename))
            res.json(device)

        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

}
export default new deviceController()