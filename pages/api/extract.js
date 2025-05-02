import pdfParse from 'pdf-parse';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pdfUrl } = req.body;

    if (!pdfUrl) {
      return res.status(400).json({ error: 'Missing pdfUrl' });
    }

    // Fetch the PDF from the provided URL
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      return res.status(400).json({ error: 'Failed to fetch PDF from URL' });
    }

    // Read PDF into a buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    const data = await pdfParse(buffer);

    res.status(200).json({ text: data.text });

  } catch (error) {
    console.error('PDF extraction error:', error);
    res.status(500).json({ error: 'Error extracting PDF' });
  }
}
