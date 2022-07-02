import nodemailer from 'nodemailer'

const sendMail = async (toEmail, question) => {
    const subject = 'Emovault Reminder for Daily Journal'
    const message = `The question for today is ${question}`

    // const email = `To: ${toEmail}, Subject: ${subject}, Text: ${message}`

    // console.log(email)
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
        } else {
            console.log(res)
        }
    })
}

export default sendMail
