import nodemailer from 'nodemailer'

const sendMailUserAccount = async (toEmail, username, userpassword) => {
    const subject = 'Emovault New Account'
    const message = `You can now login using the username ${username} and password ${userpassword}`

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

export default sendMailUserAccount
