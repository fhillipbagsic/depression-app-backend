import { StatusCodes } from "http-status-codes";
import CustomError from "./customError";

class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

export default UnauthorizedError