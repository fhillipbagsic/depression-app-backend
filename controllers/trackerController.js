import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import CurrentDay from '../models/CurrentDay.js'
import DailyTracker from '../models/DailyTracker.js'
import HealthHabit from '../models/HealthHabit.js'
import questions from '../utils/questions.js'

const dailyTracker = async (req, res) => {
    const email = req.user.email

    console.log(req.body)

    const response = await DailyTracker.create({ ...req.body, email })

    res.status(StatusCodes.OK).json({ message: 'ok' })
}

const getDailyTracker = async (req, res) => {
    const email = req.body.email

    const dailyTrackers = await DailyTracker.find({ email })

    res.status(StatusCodes.OK).json({ dailyTrackers })
}

const healthHabit = async (req, res) => {
    const email = req.user.email
    const { question, answer } = req.body
    if (!question || !answer) {
        throw new BadRequestError('Please provide question and answer')
    }

    const date = new Date(Date.now())

    const response = await HealthHabit.create({
        email,
        question,
        answer,
        date,
    })

    res.status(StatusCodes.OK).json({ message: 'Health habit created' })
}

const getHealthHabit = async (req, res) => {}

const questionOfTheDay = async (req, res) => {
    const day = await getDay()
    const question = questions[day]

    res.status(StatusCodes.OK).json({ question })
}

const getDay = async () => {
    const currentDate = new Date(Date.now())

    const response = await CurrentDay.findOne()

    let day = await response.currentDay
    const date = new Date(await response.currentDate)

    // if date is not the same as current date, update the currentDay
    if (date.getDate() !== currentDate.getDate()) {
        day = day === 74 ? 0 : day + 1

        const response = await CurrentDay.findOneAndUpdate(
            { currentDate: date },
            { currentDay: day, currentDate: currentDate }
        )
    }

    return day
}

export { dailyTracker, getDailyTracker, healthHabit, questionOfTheDay, getDay }
