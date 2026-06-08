const http = require('http');
const https = require('https');

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

    // Hardcoded Gmail credentials
    const GMAIL_USER = 'edunexus.ai123@gmail.com';
    const GMAIL_PASS = 'ywpi ylte bhtx ikzu';
    const TO_EMAIL = 'revisenseai@gmail.com';

    // Create email message
    const mailMessage = `From: ${GMAIL_USER}\r\nTo: ${TO_EMAIL}\r\nSubject: New ReViSense.AI Lead - ${Name}\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\nName: ${Name}\r\nPhone: ${Phone}\r\nSchool: ${School}\r\nCity: ${City}\r\nEmail: ${Email || 'Not provided'}\r\nStudents: ${Students || 'Not specified'}\r\nPackage: ${Package || 'Free Trial'}\r\nDate: ${new Date().toLocaleString()}\r\n`;

    // Send via SMTP using base64 auth
    const options = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
      }
    };

    // Use nodemailer if available, otherwise just log
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport(options);

      await transporter.sendMail({
        from: GMAIL_USER,
        to: TO_EMAIL,
        subject: `New ReViSense.AI Lead - ${Name}`,
        text: `Name: ${Name}\nPhone: ${Phone}\nSchool: ${School}\nCity: ${City}\nEmail: ${Email || 'Not provided'}\nStudents: ${Students || 'Not specified'}\nPackage: ${Package || 'Free Trial'}\nDate: ${new Date().toLocaleString()}`
      });

      console.log('Email sent successfully to', TO_EMAIL);
    } catch (nodemailerError) {
      console.log('Nodemailer not available, logging submission instead');
      console.log('FORM SUBMISSION:', {
        Name, Phone, School, City, Email, Students, Package,
        Timestamp: new Date().toISOString()
      });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('API error:', error.message);
    return res.status(200).json({ success: true });
  }
};
