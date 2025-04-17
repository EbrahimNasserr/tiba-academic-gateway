import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    uploadDir: './public/uploads',
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ error: 'Error parsing form' });
    }

    try {
      const pdfPath = files.pdf[0].filepath; // important — files.pdf is an array now
      const pdfBuffer = fs.readFileSync(pdfPath);
      const data = await pdfParse(pdfBuffer);

      const text = data.text;

      res.status(200).json({ text });

    } catch (error) {
      console.error('PDF extraction error:', error);
      res.status(500).json({ error: 'Error extracting PDF' });
    }
  });
}
