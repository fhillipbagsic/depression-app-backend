import fs from 'fs'
import cloudinary from 'cloudinary'
import { StatusCodes } from 'http-status-codes'
import xl from 'excel4node'
import PdfPrinter from 'pdfmake'
import DailyTracker from '../models/DailyTracker.js'
import HealthHabit from '../models/HealthHabit.js'
import Patient from '../models/Patient.js'
import Clinician from '../models/Clinician.js'
import { months, days } from '../utils/convertDate.js'

const patientExcel = async (req, res) => {
    const email = req.body.email

    const workbook = new xl.Workbook()

    // patient info
    const patient = await Patient.findOne({ email })

    // Worksheet for daily tracker
    const dailyTrackers = await DailyTracker.find({ email }).lean()

    const worksheet1 = workbook.addWorksheet('Daily Trackers')

    const worksheet1Headings = [
        'Date',
        'Email',
        'Sleep At',
        'Wokeup At',
        'Total Hours',
        'Mood or Feelings',
        'Triggers',
        'Physical Symptoms',
        'Others',
        'Concentration or Focus',
        'Social Engagement',
        'Preferred to be Alone Today',
    ]

    const columnStyle = workbook.createStyle({
        font: {
            bold: true,
        },
    })

    worksheet1.cell(1, 1).string('Patient').style(columnStyle)
    worksheet1.cell(1, 2).string(`${patient.firstName} ${patient.lastName}`)
    let heading1ColIdx = 1

    worksheet1Headings.forEach((heading) => {
        worksheet1
            .cell(2, heading1ColIdx++)
            .string(heading)
            .style(columnStyle)
    })

    let row1Idx = 3

    dailyTrackers.forEach((record) => {
        let colIdx = 1
        delete record['_id']
        delete record['__v']
        Object.keys(record).forEach((columnName) => {
            worksheet1
                .cell(row1Idx, colIdx++)
                .string(String(record[columnName]))
        })
        row1Idx++
    })

    // Worksheet for Health Habits
    const healthHabits = await HealthHabit.find({ email }).lean()

    const worksheet2 = workbook.addWorksheet('Health Habits')

    const worksheet2Headings = ['Date', 'Email', 'Question', 'Answer']

    let heading2ColIdx = 1

    worksheet2.cell(1, 1).string('Patient').style(columnStyle)
    worksheet2.cell(1, 2).string(`${patient.firstName} ${patient.lastName}`)

    worksheet2Headings.forEach((heading) => {
        worksheet2
            .cell(2, heading2ColIdx++)
            .string(heading)
            .style(columnStyle)
    })

    let row2Idx = 3

    healthHabits.forEach((record) => {
        let colIdx = 1
        delete record['_id']
        delete record['__v']
        Object.keys(record).forEach((columnName) => {
            worksheet2
                .cell(row2Idx, colIdx++)
                .string(String(record[columnName]))
        })
        row2Idx++
    })

    workbook.write('utils/excel/export_patient_data.xlsx')

    const url = await cloudinary.v2.uploader
        .upload('utils/excel/export_patient_data.xlsx', {
            upload_preset: 'xjutxivn',
            resource_type: 'auto',
            folder: 'Excel',
        })
        .then((response) => {
            return response.url
        })
        .catch((err) => {
            throw err
        })

    res.status(StatusCodes.OK).json({
        file: url,
    })
}

const clinicianExcel = async (req, res) => {
    const clinician = req.body?.email || req.user.email

    const workbook = new xl.Workbook()

    const patients = await Patient.find({ assignedClinician: clinician }).lean()

    const worksheet = workbook.addWorksheet('Patients')

    const worksheetHeadings = [
        'First Name',
        'Last Name',
        'Email',
        'Contact Number',
        'Username',
        'Assigned Clinician',
        'Date Added',
    ]

    const columnStyle = workbook.createStyle({
        font: {
            bold: true,
        },
    })

    let headingColIdx = 1

    worksheetHeadings.forEach((heading) => {
        worksheet
            .cell(1, headingColIdx++)
            .string(heading)
            .style(columnStyle)
    })

    let rowIdx = 2

    patients.forEach((record) => {
        let colIdx = 1
        delete record['_id']
        delete record['__v']
        delete record['picture']
        delete record['password']
        delete record['role']
        Object.keys(record).forEach((columnName) => {
            worksheet.cell(rowIdx, colIdx++).string(String(record[columnName]))
        })
        rowIdx++
    })

    workbook.write('utils/excel/export_clinician_patients_data.xlsx')

    const url = await cloudinary.v2.uploader
        .upload('utils/excel/export_clinician_patients_data.xlsx', {
            upload_preset: 'xjutxivn',
            resource_type: 'auto',
            folder: 'Excel',
        })
        .then((response) => {
            return response.url
        })
        .catch((err) => {
            throw err
        })

    res.status(StatusCodes.OK).json({
        file: url,
    })
}

const adminExcel = async (req, res) => {
    const email = req.body?.email

    const workbook = new xl.Workbook()

    const clinician = [await Clinician.findOne({ email }).lean()]

    if (clinician.length === 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Clinician not found',
        })
    }
    const worksheet = workbook.addWorksheet('Clinician')

    const worksheetHeadings = [
        'First Name',
        'Last Name',
        'Email',
        'Contact Number',
        'Username',
        'Years in Practice',
        'License',
        'Date Added',
    ]

    const columnStyle = workbook.createStyle({
        font: {
            bold: true,
        },
    })

    let headingColIdx = 1

    worksheetHeadings.forEach((heading) => {
        worksheet
            .cell(1, headingColIdx++)
            .string(heading)
            .style(columnStyle)
    })

    let rowIdx = 2

    clinician.forEach((record) => {
        let colIdx = 1
        delete record['_id']
        delete record['__v']
        delete record['picture']
        delete record['password']
        delete record['role']
        delete record['certificates']
        Object.keys(record).forEach((columnName) => {
            worksheet.cell(rowIdx, colIdx++).string(String(record[columnName]))
        })
        rowIdx++
    })

    workbook.write('utils/excel/export_clinician_data.xlsx')

    const url = await cloudinary.v2.uploader
        .upload('utils/excel/export_clinician_data.xlsx', {
            upload_preset: 'xjutxivn',
            resource_type: 'auto',
            folder: 'Excel',
        })
        .then((response) => {
            return response.url
        })
        .catch((err) => {
            throw err
        })

    res.status(StatusCodes.OK).json({
        file: url,
    })
}

const fonts = {
    Roboto: {
        normal: 'utils/fonts/Roboto-Regular.ttf',
        bold: 'utils/fonts/Roboto-Medium.ttf',
    },
}

const patientPDF = async (req, res) => {
    const email = req.body?.email

    const user = await Patient.findOne({ email })

    let dailyTrackers = (await DailyTracker.find({ email }).lean()) || []
    let healthHabits = (await HealthHabit.find({ email }).lean()) || []

    let entries = {}

    dailyTrackers.forEach((val) => {
        const objectDate = new Date(val.date)
        const stringDate = `${days[objectDate.getDay()]} - ${
            months[objectDate.getMonth()]
        } ${String(objectDate.getDate())}, ${String(objectDate.getFullYear())}`

        if (entries[stringDate]) {
            entries[stringDate].push(val)
        } else {
            entries[stringDate] = [val]
        }
    })

    healthHabits.forEach((val) => {
        const objectDate = new Date(val.date)

        const stringDate = `${days[objectDate.getDay()]} - ${
            months[objectDate.getMonth()]
        } ${String(objectDate.getDate())}, ${String(objectDate.getFullYear())}`

        if (entries[stringDate]) {
            entries[stringDate].push(val)
        } else {
            entries[stringDate] = [val]
        }
    })

    const printer = new PdfPrinter(fonts)

    const text = [
        {
            text: "Patient's Daily Tracker and Health Habits",
            style: 'header',
            alignment: 'center',
        },
        '\n',
        '\n',
        {
            text: `Patient: ${user.firstName} ${user.lastName}`,
            style: 'subheader',
        },
        {
            text: '\n',
        },
    ]

    Object.keys(entries).forEach((val) => {
        text.push({
            text: `\n${val}\n`,
            style: 'date',
        })
        entries[val].forEach((item) => {
            delete item['__v']
            delete item['_id']
            delete item['email']
            delete item['date']
            const keys = Object.entries(item)

            if (keys.length === 2) {
                for (const [key, val] of keys) {
                    text.push({
                        text: [
                            {
                                text: key[0].toUpperCase() + key.slice(1),
                                style: 'question',
                            },
                            {
                                text: ': ',
                            },
                            {
                                text: val,
                                style: 'answer',
                            },
                            {
                                text: '\n',
                            },
                        ],
                    })
                }
            } else {
                const {
                    sleepAt,
                    wokeUpAt,
                    totalHours,
                    moodOrFeelings,
                    triggers,
                    physicalSymptoms,
                    others,
                    concentrationOrFocus,
                    socialEngagement,
                    preferredToBeAloneToday,
                } = item

                let table = [
                    [
                        { text: 'Sleep at', style: 'tableHeader' },
                        sleepAt,
                        { text: 'Woke Up At', style: 'tableHeader' },

                        wokeUpAt,
                    ],
                    [
                        { text: 'Total Hours', style: 'tableHeader' },
                        totalHours,
                        { text: 'Mood Or Feelings', style: 'tableHeader' },
                        moodOrFeelings,
                    ],
                    [
                        { text: 'Triggers', style: 'tableHeader' },
                        triggers,

                        { text: 'Physical Symptoms', style: 'tableHeader' },
                        physicalSymptoms,
                    ],
                    [
                        { text: 'Others', style: 'tableHeader' },
                        others,

                        {
                            text: 'Concentration or Focus',
                            style: 'tableHeader',
                        },
                        concentrationOrFocus,
                    ],
                    [
                        {
                            text: 'Social Engagement',
                            style: 'tableHeader',
                        },
                        socialEngagement,

                        {
                            text: 'Preferred To Be Alone Today',
                            style: 'tableHeader',
                        },
                        preferredToBeAloneToday ? 'Yes' : 'No',
                    ],
                ]

                text.push({
                    table: {
                        body: table,
                    },
                })
                text.push({
                    text: '\n',
                })
            }
        })
    })

    const docDefinition = {
        content: text,

        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
            subheader: {
                fontSize: 16,
                bold: true,
            },
            date: {
                fontSize: 13,
                bold: true,
                lineHeight: 1.5,
            },
            question: {
                fontSize: 11,
                bold: true,
                lineHeight: 1.5,
            },
            answer: {
                fontSize: 11,
                lineHeight: 1.5,
            },
            tableHeader: {
                bold: true,
            },
        },
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    pdfDoc.pipe(fs.createWriteStream('utils/pdf/export_patient_data.pdf'))
    pdfDoc.end()

    const url = await cloudinary.v2.uploader
        .upload('utils/pdf/export_patient_data.pdf', {
            upload_preset: 'xjutxivn',
            resource_type: 'auto',
            folder: 'Pdf',
        })
        .then((response) => {
            return response.url
        })
        .catch((err) => {
            console.log(err)
            throw err
        })

    res.status(StatusCodes.OK).json({
        file: url,
    })
}

const clinicianPDF = async (req, res) => {
    const clinician = req.body?.email || req.user.email

    const patients = await Patient.find({ assignedClinician: clinician }).lean()

    let text = [
        {
            text: "List of Clinician's Patients",
            style: 'header',
            alignment: 'center',
        },
        '\n',
        '\n',
        {
            text: [
                {
                    text: 'Clinician: ',
                    style: 'column',
                },
                {
                    text: clinician,
                    style: 'data',
                },
            ],
        },
        {
            text: [
                {
                    text: 'Number of patients: ',
                    style: 'column',
                },
                {
                    text: String(patients.length),
                    style: 'data',
                },
            ],
        },
    ]

    patients.forEach((val) => {
        const { firstName, lastName, email, contactNo, username, dateAdded } =
            val

        text.push({
            table: {
                body: [
                    [{ text: 'First Name', style: 'column' }, firstName],
                    [{ text: 'Last Name', style: 'column' }, lastName],
                    [{ text: 'Email', style: 'column' }, email],
                    [{ text: 'Contact Number', style: 'column' }, contactNo],
                    [{ text: 'Username', style: 'column' }, username],
                    [{ text: 'Date Added', style: 'column' }, dateAdded],
                ],
            },
        })
        text.push({
            text: '\n',
        })
    })
    const printer = new PdfPrinter(fonts)

    const docDefinition = {
        content: text,
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
            column: {
                fontSize: 13,
                bold: true,
                lineHeight: 1.5,
            },
            data: {
                fontSize: 13,
                lineHeight: 1.5,
            },
        },
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    pdfDoc.pipe(
        fs.createWriteStream('utils/pdf/export_clinician_patients_data.pdf')
    )
    pdfDoc.end()

    const url = await cloudinary.v2.uploader
        .upload('utils/pdf/export_clinician_patients_data.pdf', {
            upload_preset: 'xjutxivn',
            resource_type: 'auto',
            folder: 'Pdf',
        })
        .then((response) => {
            return response.url
        })
        .catch((err) => {
            throw err
        })

    res.status(StatusCodes.OK).json({
        file: url,
    })
}

const adminPDF = async (req, res) => {
    const email = req.body?.email

    const clinician = await Clinician.findOne({ email }).lean()

    if (!clinician) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Clinician not found',
        })
    }
    // console.log(clinician.picture)
    // fetch(clinician.picture).then(
    //     (response) =>
    //         new Promise((res, rej) => {
    //             console.log(res.data)
    //         })
    // )

    const printer = new PdfPrinter(fonts)
    const docDefinition = {
        content: [
            {
                text: 'Clinician Information',
                style: 'header',
                alignment: 'center',
            },
            '\n',
            '\n',
            {
                text: [
                    {
                        text: 'Name: ',
                        style: 'column',
                    },
                    {
                        text: `${clinician.firstName} ${clinician.lastName}\n`,
                        style: 'data',
                    },
                    {
                        text: 'Email Address: ',
                        style: 'column',
                    },
                    {
                        text: `${clinician.email}\n`,
                        style: 'data',
                    },
                    {
                        text: 'Contact Number: ',
                        style: 'column',
                    },
                    {
                        text: `${clinician.contactNo}\n`,
                        style: 'data',
                    },
                    {
                        text: 'Years in Practice: ',
                        style: 'column',
                    },
                    {
                        text: `${clinician.yearsInPractice}\n`,
                        style: 'data',
                    },
                    {
                        text: 'License: ',
                        style: 'column',
                    },
                    {
                        text: `${clinician.license}\n`,
                        style: 'data',
                    },
                    { text: 'Username: ', style: 'column' },
                    {
                        text: `${clinician.username}\n`,
                        style: 'data',
                    },
                    {
                        text: 'Date Added: ',
                        style: 'column',
                    },
                    {
                        text: `${clinician.dateAdded}\n`,
                        style: 'data',
                    },
                ],
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
            column: {
                fontSize: 13,
                bold: true,
                lineHeight: 1.5,
            },
            data: {
                fontSize: 13,
                lineHeight: 1.5,
            },
        },
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    pdfDoc.pipe(fs.createWriteStream('utils/pdf/export_clinician_data.pdf'))
    pdfDoc.end()

    const url = await cloudinary.v2.uploader
        .upload('utils/pdf/export_clinician_data.pdf', {
            upload_preset: 'xjutxivn',
            resource_type: 'auto',
            folder: 'Pdf',
        })
        .then((response) => {
            return response.url
        })
        .catch((err) => {
            throw err
        })

    res.status(StatusCodes.OK).json({
        file: url,
    })
}

export {
    patientExcel,
    clinicianExcel,
    adminExcel,
    patientPDF,
    clinicianPDF,
    adminPDF,
}
