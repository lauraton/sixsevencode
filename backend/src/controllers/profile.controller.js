import { matchedData } from "express-validator";
import { ProfileModel } from "../models/profile.model.js";

export const createProfile = async (req, res) => {
    try {
        const idUser = req.userData.user_id;
        const datosValidos = matchedData(req, { locations: ["body"]});

        const yaExiste = await ProfileModel.findOne({ where: { user_id: idUser }});
        if (yaExiste) {
            return res.status(400).json({ message: "El usuario ya tiene un perfil"})
        }
        const profile = await ProfileModel.create({ ...datosValidos, user_id: idUser});
        return res.status(201).json(profile);
    }   catch(error) {
        console.log(error);
        return res.status(500).json({ message: "error interno del servidor"});
    }
};

export const getProfile = async (req, res) => {
    try {
        const idUser = req.userData.user_id;
        const profile = await ProfileModel.findOne({ where: { user_id: idUser }});

        if (!profile) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        }

        return res.status(200).json(profile);
    }   catch(error) {
        console.log(error);
        return res.status(500).json({ message: "error interno del servidor "});
    }
};

export const updateProfile = async (req, res) => {
    try {
        const idUser = req.userData.user_id;
        const datosValidos = matchedData(req, { locations: ["body"]});
        
        const profile = await ProfileModel.findOne({ where: { user_id: idUser }});

        if (!profile) {
            return res.status(404).json({ message: "perfil no encontrado"});
        }

        await profile.update(datosValidos);
        return res.status(200).json({ message: "Perfil actualizado correctamente"});
    }   catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor"});
    }
};