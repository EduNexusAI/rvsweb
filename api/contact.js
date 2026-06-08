export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({
      success: true,
      message: 'API is working'
    });
  }

  try {
    const data = req.body;
    console.log('Received request:', {
      method: req.method,
      headers: req.headers,
      body: data
    });

    // Validate required fields
    if (!data || !data.Name || !data.Phone || !data.School || !data.City) {
      console.log('Validation failed:', { data });
      return res.status(200).json({
        success: true,
        message: 'Form received'
      });
    }

    // Log the lead
    console.log('Lead received:', data);

    return res.status(200).json({
      success: true,
      message: 'Thank you for your interest! We will contact you soon.'
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(200).json({
      success: true,
      message: 'Form processed'
    });
  }
}
