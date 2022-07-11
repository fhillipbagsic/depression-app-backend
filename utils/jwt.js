import jwt from 'jsonwebtoken'

const createToken = (user) => {
    const token = { email: user.email, role: user.role }
    const jwt = createJWT({ payload: token })
    console.log(jwt)
    return { ...token, token: jwt }
}

const createJWT = ({ payload }) => jwt.sign(payload, process.env.JWT_SECRET)

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

// const attachCookiesToResponse = ({ res, user }) => {
//     const token = createJWT({ payload: user })

//     const fourWeeks = 1000 * 60 * 60 * 24 * 7 * 4

//     res.cookie('token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + fourWeeks),
//         secure: process.env.NODE_ENV === 'production',
//     })
// }

export { createToken, createJWT, isTokenValid }
