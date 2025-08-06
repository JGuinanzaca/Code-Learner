const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const config = require("../config.js"); // Contains object that is used to config Client
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

const sendResetEmail = (email, link) => {
    console.log(`Reset email being sent to: ${email}`);
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'learnercode771@gmail.com', 
      pass: process.env.GOOGLE_APP_PASSWORD, 
    },
  });
    const mailOptions = {
    from: 'learnercode771@gmail.com',
    to: `${email}`,
    subject: 'Password Reset',
    html: `
      <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process:</p>
      <a href="${link}">${link}</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Email sending error: ${error}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(`SELECT user_id FROM codelearner.users WHERE email = '${email}'`);
    if(result.rowCount == 0) {
        console.log('User was not found in database');
        return res.status(404).json({ message: "User is not found" });
    }
    const user_id =  result.rows.at(0).user_id;
    const resetLink = `http://localhost:3000/reset/${user_id}`;

    sendResetEmail(email, resetLink);
    res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error sending reset email to user" });
    }
});

router.put('/reset-password/:user_id', async (req, res) => {
    const { newPassword } = req.body;
    try {
        const client = new Client(config);
        await client.connect();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await client.query(`UPDATE codelearner.users
                            SET password = $1
                            WHERE user_id = ${req.params.user_id}`, [hashedPassword]);
        console.log(`Password has changed for user number ${req.params.user_id}`)
        res.status(200).json({message: "Password successfully updated!"});
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Error resetting password of the user" });
    }
});


module.exports = router;