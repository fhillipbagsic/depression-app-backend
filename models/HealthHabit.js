import mongoose from 'mongoose'

const HealthHabitSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide patient'],
    },
    date: { type: String, required: [true, 'Please provide date'] },
    question: { type: String, required: [true, 'Please provide question'] },
    answer: { type: String, required: [true, 'Please provide answer'] },
})

export default mongoose.model('HealthHabit', HealthHabitSchema)
