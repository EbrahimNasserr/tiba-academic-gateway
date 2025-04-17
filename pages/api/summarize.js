import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    // Send the extracted text to OpenAI for summarization
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that summarizes academic content. Provide a brief summary of the following text:`
        },
        { role: 'user', content: text },
      ],
    });

    // Extract the summary from the OpenAI response
    const summary = response.choices[0].message.content;

    res.status(200).json({ summary });

  } catch (error) {
    console.error(error);

    // Handle errors
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
    }

    res.status(500).json({ error: 'Failed to summarize text' });
  }
}
