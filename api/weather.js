export default async function handler(req, res) {
    const apiKey = process.env.WEATHERSTACK_KEY;
    const { city } = req.query;
  
    if (!city) {
      return res.status(400).json({ error: "City is required." });
    }
  
    try {
      const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather." });
    }
  }  