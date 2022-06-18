import bcrypt from 'bcryptjs'
const hashPassword = async (password) => await bcrypt.hash(password, 10)

const comparePassword = async (candidatePassword, userPassword) =>
    await bcrypt.compare(candidatePassword, userPassword)

export { hashPassword, comparePassword }
