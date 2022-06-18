import { UnauthenticatedError } from '../errors/index.js'
import { isTokenValid } from '../utils/jwt.js'

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
    try {
        const { email, role } = isTokenValid({ token })
        console.log(email, role)
        next()
    } catch (err) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

export { authenticateUser }
