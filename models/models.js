import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username:{type:DataTypes.STRING, allowNull:false},
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define("basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  discount_price: { type: DataTypes.INTEGER },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  Image1: { type: DataTypes.STRING, allowNull: false },
  Image2: { type: DataTypes.STRING, allowNull: false },
  Image3: { type: DataTypes.STRING, allowNull: false },
  Image4: { type: DataTypes.STRING },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  TypeBrand,
  Brand,
  Rating,
  DeviceInfo,
};
