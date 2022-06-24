import mongoose from 'mongoose'

const ClinicianSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'Please provide first name'] },
    lastName: { type: String, required: [true, 'Please provide last name'] },
    email: { type: String, required: [true, 'Please provide email address'] },
    contactNo: {
        type: String,
        required: [true, 'Please provide contact number'],
    },
    picture: { type: String, required: [true, ' Please provide picture'] },
    username: { type: String, required: [true, 'Please provide username'] },
    password: { type: String, required: [true, 'Please provide password'] },
    role: {
        type: String,
        required: [true, 'Please provide role'],
    },
    yearsInPractice: {
        type: Number,
        required: [true, 'Please provide years in practice'],
    },
    license: {
        type: String,
        required: [true, 'Please provide license'],
    },
    certificates: [
        {
            type: String,
        },
    ],
    dateAdded: {
        type: String,
        required: [true, 'Please provide date added'],
    },
})

export default mongoose.model('Clinician', ClinicianSchema)
