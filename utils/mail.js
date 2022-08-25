import nodemailer from 'nodemailer'
   const generateOtp= ()=>{
        let otp=''
        for(let i=0; i<=3;i++){
            const randVal=Math.round(Math.random() * 9)
            otp=otp +randVal;
        }
        return otp;
    }

    const mailTransport=()=> nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "ada7b5f8de86f6",
              pass: "0feab591ca385c"
            }
          });
          
    

    export {generateOtp, mailTransport}