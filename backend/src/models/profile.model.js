import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define(
    "Profile",
    {
        display_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        avatar_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "Users",
                key: "id",
            },
        },
    },
    {
        timestamps: false,
    },
);

ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "usuario"});
UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile"});

