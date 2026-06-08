export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Validate required fields
    if (!data.Name || !data.Phone || !data.School || !data.City) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // For now, just return success
    // In production, you would send an email here using nodemailer or a service
    console.log('Lead received:', data);

    return res.status(200).json({
      success: true,
      message: 'Thank you for your interest! We will contact you soon.'
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}
