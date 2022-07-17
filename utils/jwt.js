import jwt from 'jsonwebtoken'

const createToken = (user) => {
    const token = { email: user.email, role: user.role }
    const jwt = createJWT({ payload: token })
    return { ...token, token: jwt }
}

const createPasswordToken = (user) => {
    const token = { email: user.email, role: user.role }
    const jwt = createPasswordJWT({ payload: token })
    return { token: jwt }
}

const createJWT = ({ payload }) => jwt.sign(payload, process.env.JWT_SECRET)

const createPasswordJWT = ({ payload }) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

const isTokenValid = ({ token }) =>
    jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: false,
    })

export {
    createToken,
    createPasswordJWT,
    createJWT,
    createPasswordToken,
    isTokenValid,
}
