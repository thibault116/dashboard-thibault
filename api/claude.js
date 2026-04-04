export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    // Extract _apiKey from body if provided (members use their own key)
    // Otherwise fall back to env variable (Thibault's key)
    const body = { ...req.body };
    const apiKey = body._apiKey || process.env.ANTHROPIC_API_KEY;
    delete body._apiKey; // don't send _apiKey to Anthropic
    
    if (!apiKey) {
      return res.status(400).json({ error: 'No API key provided' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
