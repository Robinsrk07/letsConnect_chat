
    const IEmailService = require("../../application/interface/IEmailService");
    const nodemailer = require('nodemailer');
    
    class emailService extends IEmailService {
        constructor() {
            super();
            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "robinsyriak07@gmail.com",  // Use environment variables
                    pass:  "lmqf gnjw gvlp daew",
                },
            });
        }
    
        async sendEmail(to, subject, html) {
            const mailOptions = {
                from:'robinsyriak07@gmail.com' ,
                to,
                subject,
                html,
            };
    
            try {
                await this.transporter.sendMail(mailOptions);
                console.log(`Email sent successfully to ${to}`);
            } catch (err) {
                console.error(`Error sending email: ${err.message}`);
                throw new Error("Failed to send email.");
            }
        }
    }
    
    module.exports = emailService;
    