import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js'
import { isTokenValid } from '../utils/jwt.js'

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
    try {
        const { email, role } = isTokenValid({ token })
        req.user = { email, role }
        next()
    } catch (err) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

const authorizePermission = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorize to access this route')
        }
        next()
    }
}
export { authenticateUser, authorizePermission }
