import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ryan.fandy@gmail.com', // Email Sender
        pass: 'mwlpqhioeiqqkslg' // Key Generate
    },
    tls: {
        rejectUnauthorized: false
    }
})