import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({message: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({message: "Wrong password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role})
}

export const Me = async (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({message: "Mohon Login ke akun Anda!"});
    }
    const user = await Users.findOne({
        attributes: ['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({message: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logOut = async (req, res) => {
    req.session.destroy((error) => {
        if(error) return res.status(400).json({message: "Tidak dapat Log Out"});
        res.status(200).json({message: "Anda Telah Logout"});
    });
};