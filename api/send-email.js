export default async function handler(req, res) {
  // Enable CORS
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

    // Validate required fields
    if (!Name || !Phone || !School || !City) {
      return res.status(200).json({ success: true });
    }

    // Get credentials from environment
    const gmailUser = process.env.GMAIL_USER || 'edunexus.ai123@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD || 'ywpi ylte bhtx ikzu';
    const toEmail = process.env.TO_EMAIL || 'revisenseai@gmail.com';

    // Dynamically import nodemailer
    const nodemailer = require('nodemailer');

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    // Email to admin
    const mailOptions = {
      from: gmailUser,
      to: toEmail,
      subject: `New ReViSense.AI Lead - ${Name} from ${School}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${Name}</p>
          <p><strong>Phone:</strong> ${Phone}</p>
          <p><strong>School:</strong> ${School}</p>
          <p><strong>City:</strong> ${City}</p>
          <p><strong>Email:</strong> ${Email || 'Not provided'}</p>
          <p><strong>Students:</strong> ${Students || 'Not specified'}</p>
          <p><strong>Package:</strong> ${Package || 'Free Trial'}</p>
        </div>
      `
    };

    // Send email
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Email error:', error);
          resolve({ success: true });
        } else {
          console.log('Email sent:', info.response);
          resolve({ success: true });
        }
      });
    });

    return res.status(200).json({ success: true, message: 'Form received' });

  } catch (error) {
    console.error('Error:', error);
    return res.status(200).json({ success: true });
  }
}
