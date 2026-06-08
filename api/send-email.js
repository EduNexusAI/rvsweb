const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { Name, Phone, School, City, Email, Package, Students } = req.body;

    // Validate required fields
    if (!Name || !Phone || !School || !City) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'edunexus.ai123@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'ywpi ylte bhtx ikzu'
      }
    });

    // Email content
    const emailContent = `
New Lead from ReViSense.AI Website

Name: ${Name}
Phone: ${Phone}
School: ${School}
City: ${City}
Email: ${Email || 'Not provided'}
No. of Students: ${Students || 'Not specified'}
Package Interest: ${Package || 'Free Trial'}

This lead was submitted from the ReViSense.AI website.
Contact them within 24 hours.
    `;

    // Send email to yourself
    await transporter.sendMail({
      from: 'edunexus.ai123@gmail.com',
      to: 'revisenseai@gmail.com',
      subject: `New ReViSense.AI Lead - ${Name} from ${School}`,
      text: emailContent,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${Name}</p>
        <p><strong>Phone:</strong> ${Phone}</p>
        <p><strong>School:</strong> ${School}</p>
        <p><strong>City:</strong> ${City}</p>
        <p><strong>Email:</strong> ${Email || 'Not provided'}</p>
        <p><strong>No. of Students:</strong> ${Students || 'Not specified'}</p>
        <p><strong>Package Interest:</strong> ${Package || 'Free Trial'}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This lead was submitted from the ReViSense.AI website. Contact them within 24 hours.</p>
      `
    });

    // Optional: Send confirmation email to user
    await transporter.sendMail({
      from: 'edunexus.ai123@gmail.com',
      to: Email,
      subject: 'ReViSense.AI - We Received Your Request',
      html: `
        <h2>Thank You!</h2>
        <p>Hi ${Name},</p>
        <p>We've received your request for ReViSense.AI. Our team will contact you within 24 hours.</p>
        <p><strong>Phone:</strong> +91 96324 82151</p>
        <p><strong>Email:</strong> revisenseai@gmail.com</p>
        <hr>
        <p style="color: #666; font-size: 12px;">ReViSense.AI - AI-powered school management platform</p>
      `
    }).catch(() => {
      // Silently fail if user email is invalid
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
