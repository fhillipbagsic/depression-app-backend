import mongoose from 'mongoose'

const HealthHabitSchema = new mongoose.Schema({
    date: { type: String, required: [true, 'Please provide date'] },
    email: {
        type: String,
        required: [true, 'Please provide patient'],
    },
    question: { type: String, required: [true, 'Please provide question'] },
    answer: { type: String, required: [true, 'Please provide answer'] },
})

export default mongoose.model('HealthHabit', HealthHabitSchema)
