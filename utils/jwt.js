import jwt from 'jsonwebtoken'

const createToken = (user) => {
    const token = { email: user.email, role: user.role }
    const jwt = createJWT({ payload: token })
    return { ...token, token: jwt }
}

const createJWT = ({ payload }) => jwt.sign(payload, process.env.JWT_SECRET)

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

export { createToken, createJWT, isTokenValid }
