const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const validator = (req,res,next) => {
    try {
        let { name, phone, message } = req.body;
        if(!name.trim() || !message || !phone) {
            return res.status(400).send({ success: false,message: 'All fields are required' });
        }
        if(phone) {
            const phonePattern = /^\d{1,12}$/;
            if (!phonePattern.test(phone)) {
              return res.status(400).send({ success: false, message: 'Invalid phone number (max 12 digits allowed).' });
            }
        }
        name = name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Internal server error.' });
    }
};

const sendMail = async (req,res) => {
    try {
        const { name, message, phone } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const tempPath = path.join(__dirname,"emailTemplate.html");
        let html = fs.readFileSync(tempPath,"utf8");

        html = html
        .replace('{LOGO}', 'https://i.postimg.cc/LszsGzqP/logo-2.jpg')
        .replace('{NAME}', name)
        .replace('{PHONE}', phone)
        .replace('{MESSAGE}', message);

        const mailOptions = {
            from: '<noreply@rigenvalves.com>',
            to: "shalikshaikh121@gmail.com",
            subject: 'Rigen - Customer Enquiry',
            html
        };
        await transporter.sendMail(mailOptions);
        return res.status(200).send({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Internal server error.' });
    }
};

app.post('/contact',validator,sendMail);

const port = process.env.PORT || 1000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});