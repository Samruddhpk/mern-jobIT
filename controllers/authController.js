import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtils.js";


const register = async (req, res) => {
    // first registered user as admin
    const isFirstAccount = (await User.countDocuments() === 0);
    req.body.role = isFirstAccount ? 'admin' : 'user';

    // hash password
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

const login = async (req, res) => {

    const user = await User.findOne({ email: req.body.email });


    const isValidUser = user && (await comparePassword(req.body.password, user.password));

    if (!isValidUser) throw new UnauthenticatedError(
        'invalid credentials'
    );

    // jwt
    const token = createJWT({ userId: user._id, role: user.role });

    // httpOnly-cookie
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
    });


    res.status(StatusCodes.OK).json({ msg: "user logged in" });

};


const logout = (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out" });
};


export { login, register, logout };