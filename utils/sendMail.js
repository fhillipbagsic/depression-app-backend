import nodemailer from 'nodemailer'

const sendMail = async (toEmail) => {
    const subject = 'Emovault Reminder for Daily Journal'
    const message = `Please answer your emovault journal today. `

    const fromEmail = process.env.GMAIL_EMAIL
    const password = process.env.GMAIL_PASSWORD

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fromEmail,
            pass: password,
        },
    })

    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject,
        text: message,
    }

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err)
        }
    })
}

export default sendMail
