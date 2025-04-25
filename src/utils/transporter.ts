import nodemailer from 'nodemailer';
import { NODEMAILER_USER, NODEMAILER_PASS } from '../config';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
