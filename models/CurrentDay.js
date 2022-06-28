import mongoose from 'mongoose'

const CurrentDay = mongoose.Schema({
    currentDay: { type: Number, required: true },
    currentDate: { type: String, required: true },
})

export default mongoose.model('CurrentDay', CurrentDay)
