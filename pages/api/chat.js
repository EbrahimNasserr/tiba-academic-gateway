import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        { role: 'user', content: message },
      ],
    });

    res.status(200).json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error(error);

    // Check if the error is related to insufficient quota
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
    }

    // Generic error handler
    res.status(500).json({ error: 'Failed to connect to OpenAI API' });
  }
}
