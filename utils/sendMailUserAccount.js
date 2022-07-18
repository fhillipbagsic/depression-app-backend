import nodemailer from 'nodemailer'

const sendMailUserAccount = async (
    toEmail,
    firstname,
    lastname,
    username,
    userpassword,
    role
) => {
    const subject = 'Emovault by Dr. Procter new account'
    const message = `<p>Good morning, ${firstname} ${lastname}.</p>
<br/>
<p>Your <b>Emovault by Dr. Procter</b> account has been created. Use this website as your Daily Emotion Journal and Health Habit Tracker.<br/> You may log-in at <a href="https://www.emovault.com">https://www.emovault.com</a> using the following credentials:</p>
<p><b>Username: ${username}</b></p>
<p><b>Password: ${userpassword}</b></p>
<br/>
<p>Sincerely, <br>Emovault by Dr. Procter</p>`

    const message2 = `<p>Good morning, ${firstname} ${lastname}.</p>
<br/>
<p>Your <b>Emovault by Dr. Procter</b> Clinician account has been created. Use this website to view your client's daily emotion journal and habit tracker.<br/> You may log-in at <a href="https://www.emovault.com">https://www.emovault.com</a> using the following credentials:</p>
<p><b>Username: ${username}</b></p>
<p><b>Password: ${userpassword}</b></p>
<br/>
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
        html: role === 'Patient' ? message : message2,
    }

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err)
        }
    })
}

export default sendMailUserAccount
