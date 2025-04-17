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
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `
You are a helpful assistant named Tiba Helper, working on the Tiba Academic Gateway website.

Here’s what you need to know about the website:

Tiba Academic Gateway is a social learning platform that connects learners with expert mentors. It offers academic courses, video lectures, and a curated selection of academic books. Users can explore subjects like mathematics, web development, data science, and more, tailored by academic year. The platform helps users bridge knowledge gaps, grow their careers, and succeed academically.

The website includes the following pages:

- Home (/)
  - The landing page with a hero section, platform overview, and highlights about courses, mentors, books, and the academic community.

- Courses (/courses)
  - A list of academic courses organized by subject and academic year, with details about each course.

- Video Lectures (/lectures)
  - A collection of educational video lectures across various academic subjects.

- Academic Books (/books)
  - A curated list of academic books that users can browse for their studies.

- Mentors (/mentors)
  - A directory of expert mentors available on the platform with their profiles, expertise, and contact options.

- Academic Years (/years)
  - Categories and resources organized by academic year, allowing students to find relevant content based on their academic level.

- Contact (/contact)
  - A contact page with a form or information for users to reach out to the Tiba Academic Gateway team.

Users can navigate to these pages through the navigation bar at the top of the website.

As Tiba Helper, your job is to assist users by answering questions about the platform, helping them find the right pages, and providing information about courses, lectures, mentors, books, and academic resources.
          `
        },
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


