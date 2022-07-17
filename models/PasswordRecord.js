import mongoose from 'mongoose'

const PasswordRecordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provided email'],
    },
    canChangePassword: {
        type: Boolean,
        required: [true, 'Please provide if can change password'],
    },
})

export default mongoose.model('PasswordRecord', PasswordRecordSchema)
