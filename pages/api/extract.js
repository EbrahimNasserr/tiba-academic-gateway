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
    uploadDir: '/tmp', // ✅ must use /tmp on Vercel
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ error: 'Error parsing form' });
    }

    if (!files.pdf) {
      return res.status(400).json({ error: 'No PDF uploaded' });
    }

    try {
      const pdfFile = files.pdf;
      const pdfPath = Array.isArray(pdfFile) ? pdfFile[0].filepath : pdfFile.filepath;
      const pdfBuffer = fs.readFileSync(pdfPath);
      const data = await pdfParse(pdfBuffer);

      res.status(200).json({ text: data.text });

    } catch (error) {
      console.error('PDF extraction error:', error);
      res.status(500).json({ error: 'Error extracting PDF' });
    }
  });
}
