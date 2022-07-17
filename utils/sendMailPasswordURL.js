import nodemailer from 'nodemailer'

const sendMailPasswordURL = async (toEmail, url) => {
    const subject = 'Emovault - Change Password'
    const message = `<p>You have requested to change your forgotten password. Access this link to set your new password <a href=\"${url}\">${url}</a> . Please note that the link will expire in 1 hour after this email has been sent.`

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
        html: message,
    }

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err)
        }
    })
}

export default sendMailPasswordURL
