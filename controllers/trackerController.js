import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import CurrentDay from '../models/CurrentDay.js'
import DailyTracker from '../models/DailyTracker.js'
import HealthHabit from '../models/HealthHabit.js'
import questions from '../utils/questions.js'

const dailyTracker = async (req, res) => {
    const email = req.user.email

    // check first if user has already logged for today
    const date = new Date(Date.now())
    const adjustedDate = date.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
    })

    const searchDate = new Date(adjustedDate)
        .toDateString()
        .split(' ')
        .slice(0, 5)
        .join(' ')

    const dailyTracker = await DailyTracker.find({
        date: new RegExp(searchDate),
        email,
    })

    if (dailyTracker.length !== 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Patient has already logged today's daily tracker",
        })
    }

    req.body.date = new Date(adjustedDate)

    const response = await DailyTracker.create({ ...req.body, email })

    res.status(StatusCodes.OK).json({ message: 'Daily tracker added' })
}

const getDailyTracker = async (req, res) => {
    const email = req.query.email

    const dailyTrackers = await DailyTracker.find({ email })

    res.status(StatusCodes.OK).json({ dailyTrackers })
}

const healthHabit = async (req, res) => {
    const email = req.user.email

    const { question, answer } = req.body
    if (!question || !answer) {
        throw new BadRequestError('Please provide question and answer')
    }

    // check first if user has already logged for today
    const date = new Date(Date.now())
    const adjustedDate = date.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
    })

    const searchDate = new Date(adjustedDate)
        .toDateString()
        .split(' ')
        .slice(0, 5)
        .join(' ')

    const healthHabit = await HealthHabit.find({
        email,
        date: new RegExp(searchDate),
    })

    if (healthHabit.length !== 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Patient has already logged today's health habit",
        })
    }

    const response = await HealthHabit.create({
        email,
        question,
        answer,
        date: new Date(adjustedDate),
    })

    res.status(StatusCodes.OK).json({ message: 'Health habit created' })
}

const getHealthHabit = async (req, res) => {
    const email = req.query.email

    const healthHabits = await HealthHabit.find({
        email,
    })

    res.status(StatusCodes.OK).json({ healthHabits })
}

const questionOfTheDay = async (req, res) => {
    const day = await getDay()
    const question = questions[day]

    console.log(question)
    res.status(StatusCodes.OK).json({ question })
}

const getDay = async () => {
    const currentDate = new Date(Date.now())
    const adjustedDate = currentDate.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
    })

    const response = await CurrentDay.findOne()

    let day = await response.currentDay
    const date = new Date(await response.currentDate)

    // if date is not the same as current date, update the currentDay
    if (date.getDate() < new Date(adjustedDate).getDate()) {
        day = day === 74 ? 0 : day + 1

        const response = await CurrentDay.findOneAndUpdate(
            {},
            { currentDay: day, currentDate: currentDate }
        )
    }

    return day
}

export {
    dailyTracker,
    getDailyTracker,
    healthHabit,
    getHealthHabit,
    questionOfTheDay,
    getDay,
}
