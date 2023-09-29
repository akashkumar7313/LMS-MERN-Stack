import jwt from "jsonwebtoken";

const isLoggedIn = async (req, _res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new Error('Unauthenticated, Please login again.', 404));
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    resizeBy.user = userDetails;

    next();
}

export {
    isLoggedIn
}