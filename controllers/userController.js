import AppError from "../utils/errorUtil.js";
import User from "../models/userModel.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    httpOnly: true,
    secure: true,
}

const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return next(new AppError('All fields must be required', 404));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError('email already exists.', 404));
    }

    const user = User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"
        }
    });

    if (!user) {
        return next(new AppError('User registration failed, please try again', 400))
    }

    // file uplode
    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken();

    res.cookir('token', token, cookieOptions)

    res.status(201).json({
        sucess: true,
        massage: 'User registered successfully',
        user,
    });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new Error('All fields are required', 400))
        }

        const user = await User.findOne({
            email
        }).select("+password")

        if (!user || !user.comparePassword(password)) {
            return next(new Error('email or password does not match', 400))
        }

        const token = await user.generateJWTToken();
        user.password = undefined;

        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            sucess: true,
            massaged: 'Iser loggedin successfully',
            user,
        })
    } catch (e) {
        return next(new AppError(e.massage, 500));
    }

};

const logout = (req, res) => {
    res.cookie('token', null, {
        sucure: true,
        maxage: 0,
        httpOnly: true,
    });

    res.status(200).json({
        sucess: true,
        massage: "User logged out successfully"
    })

};

const profile = (req, res) => {

};


export {
    register,
    login,
    logout,
    profile,
}