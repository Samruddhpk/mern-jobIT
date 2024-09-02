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

    // jwt
    const token = createJWT({ userId: user._id, role: user.role });
    console.log(token);


    const user = await User.create(req.body);

    // httpOnly-cookie
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
    });

    res.status(StatusCodes.CREATED).json({ user, msg: 'user created' });
};

const login = async (req, res) => {

    // check if user exists
    // check if pwd is correct

    const user = await User.findOne({ email: req.body.email });
    // if (!user) throw new UnauthenticatedError('invalid credentials');

    // // compare pwd
    // const isPasswordCorrect = await comparePassword(req.body.password, user.password);

    // if (!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');

    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) throw new UnauthenticatedError(
        'invalid credentials'
    );

    // jwt
    const token = createJWT({ userId: user._id, role: user.role });
    console.log(token);


    // httpOnly-cookie
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
    });


    res.status(StatusCodes.OK).json({ msg: "logged in" });

};

export { login, register };