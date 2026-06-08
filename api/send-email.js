const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ success: true, message: 'API is working' });
  }

  try {
    const { Name, Phone, School, City, Email, Package, Students } = req.body;

    console.log('Form submission received:', { Name, Phone, School, City });

    // Validate required fields
    if (!Name || !Phone || !School || !City) {
      console.error('Missing required fields');
      return res.status(200).json({ success: true });
    }

    // Get credentials from environment
    const gmailUser = process.env.GMAIL_USER || 'edunexus.ai123@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD || 'ywpi ylte bhtx ikzu';
    const toEmail = process.env.TO_EMAIL || 'revisenseai@gmail.com';

    console.log('Creating transporter with:', gmailUser);

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    // Verify transporter
    await transporter.verify();
    console.log('Transporter verified successfully');

    // Send email to admin
    const adminMailResult = await transporter.sendMail({
      from: gmailUser,
      to: toEmail,
      subject: `New ReViSense.AI Lead - ${Name} from ${School}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
          <h2 style="color: #333;">New Lead Submission</h2>
          <table style="background: white; width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold; color: #666; width: 30%;">Name:</td>
              <td style="padding: 10px;">${Name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold; color: #666;">Phone:</td>
              <td style="padding: 10px;">${Phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold; color: #666;">School:</td>
              <td style="padding: 10px;">${School}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold; color: #666;">City:</td>
              <td style="padding: 10px;">${City}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 10px;">${Email || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold; color: #666;">Students:</td>
              <td style="padding: 10px;">${Students || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #666;">Package:</td>
              <td style="padding: 10px;">${Package || 'Free Trial'}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">Contact them within 24 hours.</p>
        </div>
      `
    });

    console.log('Admin email sent:', adminMailResult.messageId);

    // Send confirmation email to user if email provided
    if (Email) {
      try {
        await transporter.sendMail({
          from: gmailUser,
          to: Email,
          subject: 'ReViSense.AI - We Received Your Request',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
              <h2 style="color: #333;">Thank You, ${Name}!</h2>
              <p>We've received your request for ReViSense.AI.</p>
              <p>Our team will contact you within 24 hours at <strong>${Phone}</strong></p>
              <hr style="margin: 20px 0;">
              <p><strong>Contact Us:</strong></p>
              <p>📞 Phone: +91 96324 82151</p>
              <p>📧 Email: revisenseai@gmail.com</p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              <p style="color: #888; font-size: 12px;">ReViSense.AI - AI-powered school management platform</p>
            </div>
          `
        });
        console.log('User confirmation email sent');
      } catch (confirmError) {
        console.log('User email not sent (not critical):', confirmError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: adminMailResult.messageId
    });

  } catch (error) {
    console.error('Email API error:', error.message, error.code);
    return res.status(200).json({
      success: true,
      message: 'Form processed'
    });
  }
}
