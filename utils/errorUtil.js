class AppError extends Error {
    constructor(massege, statusCode){
        super(massege);

        this.statusCode = statusCode;

        error.captureStackTrack(this, this.constructor);
    }
}

export default AppError;