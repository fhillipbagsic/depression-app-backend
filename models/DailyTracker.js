import mongoose from 'mongoose'

const DailyTrackerSchema = new mongoose.Schema({
    date: { type: String, required: [true, 'Please assign date'] },
    email: {
        type: String,
        required: [true, 'Please assign patient'],
    },
    sleepAt: {
        type: String,
        required: [true, 'Please assign sleep at'],
    },
    wokeUpAt: {
        type: String,
        required: [true, 'Please assign woke up at'],
    },
    totalHours: {
        type: String,
        required: [true, 'Please assign total hours'],
    },
    moodOrFeelings: {
        type: String,
        required: [true, 'Please assign mood or feelings'],
    },
    triggers: {
        type: String,
        required: [true, 'Please assign triggers'],
    },
    physicalSymptoms: {
        type: String,
        required: [true, 'Please assign physical symptoms'],
    },
    others: {
        type: String,
    },
    concentrationOrFocus: {
        type: String,
        required: [true, 'Please assign concentration or focus'],
    },
    socialEngagement: {
        type: String,
    },
    preferredToBeAloneToday: {
        type: Boolean,
    },
})

export default mongoose.model('DailyTracker', DailyTrackerSchema)
