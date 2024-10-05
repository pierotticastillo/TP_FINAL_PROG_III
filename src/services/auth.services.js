import * as authDataBase from '../dataBase/auth.db.js';

export const findUser = async (email,password) => {
    try {
        const user = await authDataBase.findUser(email,password);
        return user;
    } catch (error) {
        console.error("Error ", error.message);
        throw new Error("Error");
    }
};

export const findById = async (idUsuario) => {
    try {
        const findById = await authDataBase.findById(idUsuario);
        return findById;
    } catch (error) {
        console.error("Error", error.message);
        throw new Error("Error");
    }
};