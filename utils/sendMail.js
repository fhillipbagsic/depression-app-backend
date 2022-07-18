import nodemailer from 'nodemailer'

const sendMail = async (toEmail, firstName, lastName) => {
    const subject = 'Emovault by Dr.Procter Daily Journal Reminder'
    const message = `<p>Good morning, ${firstName} ${lastName}.</p>
<br/>
<p>Please answer your Emovault by Dr. Procter Journal.</p>
<p>Have a great day ahead!</p>
<br>
<p>Sincerely, <br>Emovault by Dr. Procter</p>`

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

export default sendMail
