const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ success: true });
  }

  try {
    const { Name, Phone, School, City, Email, Package, Students } = req.body;

    if (!Name || !Phone || !School || !City) {
      return res.status(200).json({ success: true });
    }

    const gmailUser = process.env.GMAIL_USER || 'edunexus.ai123@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD || 'ywpi ylte bhtx ikzu';
    const toEmail = process.env.TO_EMAIL || 'revisenseai@gmail.com';

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    const mailContent = `
Name: ${Name}
Phone: ${Phone}
School: ${School}
City: ${City}
Email: ${Email || 'Not provided'}
Students: ${Students || 'Not specified'}
Package: ${Package || 'Free Trial'}
Date: ${new Date().toLocaleString()}
    `;

    await transporter.sendMail({
      from: gmailUser,
      to: toEmail,
      subject: `New ReViSense.AI Lead - ${Name}`,
      text: mailContent,
      html: `<pre>${mailContent}</pre>`
    });

    console.log(`Email sent to ${toEmail} for ${Name}`);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Email API error:', error.message);
    return res.status(200).json({ success: true });
  }
};
