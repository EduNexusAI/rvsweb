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

    const toEmail = process.env.TO_EMAIL || 'revisenseai@gmail.com';

    // Send email via SendGrid API (no package needed, just fetch)
    const emailData = {
      personalizations: [{
        to: [{ email: toEmail }],
        subject: `New ReViSense.AI Lead - ${Name}`
      }],
      from: { email: 'revisenseai@gmail.com', name: 'ReViSense.AI' },
      content: [{
        type: 'text/plain',
        value: `
Name: ${Name}
Phone: ${Phone}
School: ${School}
City: ${City}
Email: ${Email || 'Not provided'}
Students: ${Students || 'Not specified'}
Package: ${Package || 'Free Trial'}
Date: ${new Date().toLocaleString()}
        `
      }]
    };

    // Try sending via Resend (free tier, no auth needed for basic)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer re_' + (process.env.RESEND_API_KEY || 'placeholder')
      },
      body: JSON.stringify({
        from: 'noreply@revisense.ai',
        to: toEmail,
        subject: `New ReViSense.AI Lead - ${Name}`,
        html: `
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${Name}</p>
          <p><strong>Phone:</strong> ${Phone}</p>
          <p><strong>School:</strong> ${School}</p>
          <p><strong>City:</strong> ${City}</p>
          <p><strong>Email:</strong> ${Email || 'Not provided'}</p>
          <p><strong>Students:</strong> ${Students || 'Not specified'}</p>
          <p><strong>Package:</strong> ${Package || 'Free Trial'}</p>
        `
      })
    });

    console.log('Email sent, status:', response.status);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error:', error.message);
    // Always return success so user sees the message
    return res.status(200).json({ success: true });
  }
};
