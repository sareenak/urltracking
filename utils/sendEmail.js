
import nodemailer from 'nodemailer'

const sendTransport=()=> nodemailer.createTransport({
    service:gmail,
    port: 2525,
    auth: {
      user: "ada7b5f8de86f6",
      pass: "0feab591ca385c"
    }
  });
  