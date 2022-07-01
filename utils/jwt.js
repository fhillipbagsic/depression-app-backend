import jwt from 'jsonwebtoken'

const createToken = (user) => {
    return { email: user.email, role: user.role }
}

const createJWT = ({ payload }) => jwt.sign(payload, process.env.JWT_SECRET)

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user })

    const fourWeeks = 1000 * 60 * 60 * 24 * 7 * 4

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + fourWeeks),
        secure: process.env.NODE_ENV === 'production',
    })
}

export { createToken, createJWT, isTokenValid, attachCookiesToResponse }
